import prisma from "@repo/prisma/client";

export type ResultVAlue = 0 | 0.5 | 1;

function calculateElo(
  playerRating: number,
  opponentRating: number,
  result: ResultVAlue,
  kFactor = 32
): number {
  const expectedScore =
    1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));

  const newRating = playerRating + kFactor * (result - expectedScore);

  return Math.round(newRating);
}

export function updateRating(
  playerWRating: number,
  playerBRating: number,
  resultW: ResultVAlue
) {
  const newW = calculateElo(playerWRating, playerBRating, resultW);
  const newB = calculateElo(
    playerBRating,
    playerWRating,
    (1 - resultW) as ResultVAlue
  );
  const ratingCount = Math.abs(playerWRating - newW);

  return {
    newW,
    newB,
    ratingCount,
  };
}

export async function updateRatingToDB(
  playerW: { id: string; rating: number },
  playerB: { id: string; rating: number },
  game: { id: string; ratingCount: number }
): Promise<{
  updatedW: { id: string; rating: number };
  updatedB: { id: string; rating: number };
}> {
  const updatedW = await prisma.user.update({
    where: {
      id: playerW.id,
    },
    data: {
      rating: playerW.rating,
    },
  });

  const updatedB = await prisma.user.update({
    where: {
      id: playerB.id,
    },
    data: {
      rating: playerB.rating,
    },
  });

  await prisma.game.update({
    where: {
      id: game.id,
    },
    data: {
      RatingCount: game.ratingCount,
    },
  });

  return { updatedW, updatedB };
}
