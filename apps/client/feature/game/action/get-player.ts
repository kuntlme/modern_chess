"use server";

import prisma from "@repo/prisma/client";

import { auth } from "@/lib/auth";

export const getPlayerById = async (id: string) => {
  const session = await auth();
  if (!session) return;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
