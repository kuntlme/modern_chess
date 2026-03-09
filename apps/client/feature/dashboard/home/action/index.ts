"use server";
import { formatDistanceToNow } from "date-fns";
import { color } from "motion/react";

import prisma from "@repo/prisma/client";

import { auth } from "@/lib/auth";

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
        white: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
            rating: true,
          },
        },
        black: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
            rating: true,
          },
        },
      },
      orderBy: { startedAt: "desc" },
      take: 5,
    });

    // Format data according to the table
    const mappedGames = recentGames.map((game) => {
      const isWhite = game.whiteId === userId;
      const color: "white" | "black" = isWhite ? "white" : "black";

      const opponentUser = isWhite ? game.black : game.white;

      const opponent = {
        id: opponentUser.id,
        name: opponentUser.username || opponentUser.name || "Unknown",
        image: opponentUser.image,
        rating: opponentUser.rating,
      };

      let result: "win" | "lose" | "draw" | "abandoned" = "draw";

      if ((game as any).status === "ABANDONED" && !game.winner) {
        result = "abandoned";
      } else if (game.winner === "DRAW" || !game.winner) {
        result = "draw";
      } else if (
        (game.winner === "WHITE" && isWhite) ||
        (game.winner === "BLACK" && !isWhite)
      ) {
        result = "win";
      } else {
        result = "lose";
      }

      const gameDate = new Date(game.startedAt);
      return {
        id: game.id,
        opponent,
        result,
        color,
        duration: "10m",
        date: gameDate.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: gameDate.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
        }),
        gameResultReason: (game as any).gameResult
          ?.toLowerCase()
          .replace(/_/g, " "),
        ratingChange: 5,
      };
    });

    const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
    console.log(recentGames);
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

export async function getSidebarData() {
  const session = await auth();
  if (!session) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, username: true, rating: true },
    });

    if (!user) return null;

    return {
      name: user.username || user.name || "Player",
      rating: user.rating,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
