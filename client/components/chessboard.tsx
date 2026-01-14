"use client";
import { GameState } from "@/lib/types";
import { PromotionOption } from "@/schema/clientMessageSchema";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { Chessboard, ChessboardOptions } from "react-chessboard";

function GameBoard({
  state,
  sendMove,
  currentMove,
}: {
  state: GameState;
  sendMove: (from: string, to: string, promotion: PromotionOption) => void;
  currentMove: number | null;
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

      const promotion = isPawn && isPromotion ? "n" : "";
      console.log(sourceSquare, targetSquare, promotion);
      sendMove(sourceSquare, targetSquare, promotion);
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

  return <Chessboard options={chessboardOptions} />;
}

export default GameBoard;
