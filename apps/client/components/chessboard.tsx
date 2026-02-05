"use client";
import React, { useEffect, useState } from "react";
import { Chessboard, ChessboardOptions } from "react-chessboard";

import { Chess } from "chess.js";

import { GameState } from "@/lib/types";
import { PromotionOption } from "@/schema/clientMessageSchema";

function GameBoard({
  state,
  sendMove,
  currentMove,
  onPromotionRequired,
}: {
  state: GameState;
  sendMove: (from: string, to: string, promotion: PromotionOption) => void;
  currentMove: number | null;
  onPromotionRequired: (sourcePiece: string, targetPiece: string) => void;
}) {
  if (state.status == "IDLE") return null;

  const [currentFen, setCurrentFen] = useState<string>();

  const chessboardOptions: ChessboardOptions = {
    position: currentFen,
    boardOrientation: state.color == "b" ? "black" : "white",
    canDragPiece: ({ piece, square }) => {
      console.log(piece.pieceType);
      return (
        (state.status === "PLAYING" &&
          state.yourTurn &&
          currentMove === state.moves.length - 1 &&
          piece.pieceType[0] === state.color) ??
        false
      );
    },
    onPieceDrop: ({ piece, sourceSquare, targetSquare }) => {
      if (!state.yourTurn || currentMove != state.moves.length - 1)
        return false;

      if (!piece || !sourceSquare || !targetSquare) return false;

      const isPawn = piece.pieceType.endsWith("P");
      const rank = targetSquare[1];

      const isPromotion =
        (piece.pieceType.startsWith("w") && rank === "8") ||
        (piece.pieceType.startsWith("b") && rank === "1");

      // pawn promotion
      if (isPawn && isPromotion) {
        onPromotionRequired(sourceSquare, targetSquare);
        return true;
      }
      sendMove(sourceSquare, targetSquare, "");
      return true;
    },
  };

  // update ui to show previous position
  useEffect(() => {
    if (currentMove != null) {
      const currentGame = new Chess();
      if (currentMove != -1) {
        for (let i = 0; i <= currentMove; i++) {
          currentGame.move(state.moves[i]);
        }
      }
      setCurrentFen(currentGame.fen());
    }
  }, [currentMove]);

  useEffect(() => {
    if (state.fen) {
      setCurrentFen(state.fen);
    }
  }, [state]);

  return (
    <div className="aspect-square h-full max-h-[calc(100vh-80px)] w-full max-w-[60vw]">
      <Chessboard options={chessboardOptions} />
    </div>
  );
}

export default GameBoard;
