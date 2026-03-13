import prisma from "@repo/prisma/client";

const PAGE_SIZE = 5;

export async function getUserProfile(userId: string, page: number) {
  const skip = (page - 1) * PAGE_SIZE;

  const [user, games, totalGames, wins, losses, draws] =
    await prisma.$transaction([
      prisma.user.findUnique({
        where: { id: userId },
      }),

      prisma.game.findMany({
        where: {
          OR: [{ whiteId: userId }, { blackId: userId }],
        },
        include: {
          white: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
              rating: true,
              country: true,
            },
          },
          black: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
              rating: true,
              country: true,
            },
          },
        },
        orderBy: {
          startedAt: "desc",
        },
        take: PAGE_SIZE,
        skip,
      }),

      prisma.game.count({
        where: {
          OR: [{ whiteId: userId }, { blackId: userId }],
        },
      }),

      prisma.game.count({
        where: {
          OR: [
            { whiteId: userId, winner: "WHITE" },
            { blackId: userId, winner: "BLACK" },
          ],
        },
      }),

      prisma.game.count({
        where: {
          OR: [
            { whiteId: userId, winner: "BLACK" },
            { blackId: userId, winner: "WHITE" },
          ],
        },
      }),

      prisma.game.count({
        where: {
          OR: [{ whiteId: userId }, { blackId: userId }],
          winner: null,
        },
      }),
    ]);

  if (!user) return null;

  const totalPages = Math.ceil(totalGames / PAGE_SIZE);

  return {
    user,
    games,
    totalPages,
    stats: {
      totalGames,
      wins,
      losses,
      draws,
    },
  };
}
