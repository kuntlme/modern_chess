"use server";

import { success } from "zod";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export const getUserData = async () => {
  const session = await auth();
  if (!session) return;
  try {
    const userId = session.user.id;
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        email: true,

        // Appearance
        theme: true,
        language: true,

        // Game
        autoQueen: true,
        showLegalMoves: true,
      },
    });
    if (!userId) {
      return new Error("No userdata found");
    }
    return userData;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while fetching userdata");
  }
};

export async function updateSettings(data: any) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  try {
    const updatedSettings = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        username: data.username,
        email: data.email,
        theme: data.theme,
        autoQueen: data.autoQueen,
        showLegalMoves: data.showLegalMoves,
      },
    });
    if (updatedSettings) {
      return { success: true };
    }
  } catch (error) {
    return { success: false };
    console.log(error);
    throw new Error("Something went wrong while updating settings");
  }
}
