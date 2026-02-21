"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";

export const changeName = async (name: string) => {
  const session = await auth();
  if (!session) return;
  try {
    const userId = session.user.id;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name,
      },
    });
    if (updatedUser) return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while updating name");
  }
};

export const changeBio = async (bio: string) => {
  const session = await auth();
  if (!session) return;
  try {
    const userId = session.user.id;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        bio: bio,
      },
    });
    if (updatedUser) return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while updating name");
  }
};

export const changeUsername = async (username: string) => {
  const session = await auth();
  if (!session) return;
  try {
    const userId = session.user.id;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: username,
      },
    });
    if (updatedUser) return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while updating name");
  }
};
