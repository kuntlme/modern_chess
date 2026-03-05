"use server";

import prisma from "@repo/prisma/client";

import { auth } from "@/lib/auth";

export const getGameFromDB = async (gameId: string) => {
  const session = await auth();
  if (!session) return;
  const userId = session.user.id;
  const game = await prisma.game.findFirst({
    where: { id: gameId },
  });
  if (game) return game;
};
