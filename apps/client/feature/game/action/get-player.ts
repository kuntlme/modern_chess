"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

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
