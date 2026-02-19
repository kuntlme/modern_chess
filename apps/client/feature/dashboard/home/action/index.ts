"use server";
import { formatDistanceToNow } from "date-fns";
import { color } from "motion/react";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function getDashboardData() {
  const session = await auth();
  if (!session) return null;

  const userId = session.user.id;

  try {
    // 1Get user rating only
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { rating: true },
    });

    if (!user) throw new Error("User not found");

    // Count total games
    const totalGames = await prisma.game.count({
      where: {
        OR: [{ whiteId: userId }, { blackId: userId }],
      },
    });

    // Count wins
    const wins = await prisma.game.count({
      where: {
        OR: [
          { winner: "WHITE", whiteId: userId },
          { winner: "BLACK", blackId: userId },
        ],
      },
    });

    // Fetch only last 10 games
    const recentGames = await prisma.game.findMany({
      where: {
        OR: [{ whiteId: userId }, { blackId: userId }],
      },
      include: {
        white: { select: { username: true } },
        black: { select: { username: true } },
      },
      orderBy: { startedAt: "desc" },
      take: 10,
    });

    // Format data according to the table
    const mappedGames = recentGames.map((game) => {
      const isWhite = game.whiteId;
      const color: "white" | "black" = isWhite ? "white" : "black";

      const opponent: string = isWhite
        ? game.black.username || game.blackId
        : game.white.username || game.whiteId;

      let result: "win" | "lose" | "draw";

      if (!game.winner) {
        result = "draw";
      } else if (
        (game.winner === "WHITE" && isWhite) ||
        (game.winner === "BLACK" && !isWhite)
      ) {
        result = "win";
      } else {
        result = "lose";
      }

      return {
        id: game.id,
        opponent,
        result,
        color,
        date: formatDistanceToNow(game.startedAt, { addSuffix: true }),
      };
    });

    const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

    return {
      rating: user.rating,
      totalGames,
      winRate,
      recentGames: mappedGames,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Dashboard data fetch failed");
  }
}
