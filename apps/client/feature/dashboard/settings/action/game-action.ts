"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export const changeVoice = async ({
  isVoice,
  voiceLevel,
}: {
  isVoice: boolean;
  voiceLevel?: number;
}) => {
  const session = await auth();
  if (!session) return;
  try {
    const userId = session.user.id;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        voice: isVoice,
        voiceLevel: voiceLevel,
      },
    });
    if (updatedUser) return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while updating name");
  }
};
