"use server";

import { success } from "zod";

import prisma from "@repo/prisma/client";

import { auth } from "@/lib/auth";

export const getUserData = async () => {
  const session = await auth();
  if (!session) return;
  try {
    const userId = session.user.id;
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        name: true,
        bio: true,
        email: true,

        // Appearance
        theme: true,
        language: true,

        // Game
        autoQueen: true,
        showLegalMoves: true,
        inGameAudio: true,
        soundVolume: true,

        // External Privacy
        showOnlineStatus: true,
        allowFriendRequests: true,
        showRating: true,
        publicGameHistory: true,
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
        name: data.name,
        bio: data.bio,
        email: data.email,
        theme: data.theme,
        autoQueen: data.autoQueen,
        showLegalMoves: data.showLegalMoves,
        inGameAudio: data.inGameAudio,
        soundVolume: data.soundVolume,
        showOnlineStatus: data.showOnlineStatus,
        allowFriendRequests: data.allowFriendRequests,
        showRating: data.showRating,
        publicGameHistory: data.publicGameHistory,
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
