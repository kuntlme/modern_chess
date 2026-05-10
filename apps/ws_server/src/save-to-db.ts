import prisma from "@repo/prisma/client";

interface SaveGameToDBInput {
  gameId: string;
  whiteId: string;
  blackId: string;
  winner: "WHITE" | "BLACK" | "DRAW";
  status: "ONGOING" | "ENDED" | "ABANDONED";
  fen: string;
  moves: string[];
  capturedPieces: string[];
  gameResult: string;
  pgn: string;
}

export const saveGameToDB = async ({
  gameId,
  whiteId,
  blackId,
  winner,
  status,
  fen,
  moves,
  capturedPieces,
  gameResult,
  pgn,
}: SaveGameToDBInput): Promise<any> => {
  try {
    console.log("white:", whiteId);
    console.log("black:", blackId);

    const createdGame = await prisma.game.create({
      data: {
        id: gameId,
        whiteId,
        blackId,
        status,
        winner,
        fen,
        moves,
        capturedPieces,
        gameResult,
        RatingCount: 0,
        pgn,
        endedAt: new Date(),
      },
      include: {
        white: true,
        black: true,
      },
    });
    return createdGame;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to save game to database");
  }
};
