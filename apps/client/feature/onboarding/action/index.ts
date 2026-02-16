"use server";

import { email, success } from "zod";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

import { OnboardingInput, onboardingSchema } from "../schema";

export async function checkUsername(username: string) {
  if (username.length < 3) return false;

  const existing = await prisma.user.findUnique({
    where: { username: username },
  });
  return !existing;
}

export async function completeOnboarding(formData: OnboardingInput) {
  const session = await auth();
  if (!session?.user.email) {
    throw new Error("Unauthorized");
  }

  const parsed = onboardingSchema.safeParse(formData);

  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  const { username, country } = formData;

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        username,
        country,
        profileComplete: true,
      },
    });

    session.user.profileComplete = true;

    return { success: true };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "Username already taken" };
    }
    throw error;
  }
}
