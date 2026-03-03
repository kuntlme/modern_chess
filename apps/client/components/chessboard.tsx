"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Chessboard, ChessboardOptions } from "react-chessboard";

import { Chess, Square } from "chess.js";

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

  const [currentFen, setCurrentFen] = useState<string>(new Chess().fen());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [moveSquares, setMoveSquares] = useState<
    Record<string, React.CSSProperties>
  >({});

  const getLegalMoves = (square: Square) => {
    const game = new Chess(currentFen);

    const moves = game.moves({
      square,
      verbose: true,
    });

    if (moves.length === 0) {
      setMoveSquares({});
      return;
    }

    const newSquares: { [square: string]: React.CSSProperties } = {};

    moves.forEach((move) => {
      newSquares[move.to] = {
        background:
          "radial-gradient(circle, rgba(0,0,0,0.3) 36%, transparent 40%)",
        backgroundSize: "60% 60%", // ✅ Controls the dot size
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "50%",
      };
    });

    // Highlight selected square too
    newSquares[square] = {
      backgroundColor: "rgba(255, 255, 0, 0.4)",
    };
    console.log(newSquares);
    setMoveSquares(newSquares);
  };

  const chessboardOptions = {
    position: currentFen,
    onSquareClick: ({ square, piece }) => {
      if (!piece) {
        setSelectedSquare(null);
        setMoveSquares({});
        return;
      }

      const clickable =
        (state.status === "PLAYING" &&
          state.yourTurn &&
          currentMove === state.moves.length - 1 &&
          piece.pieceType[0] === state.color) ??
        false;
      if (!clickable) {
        setSelectedSquare(null);
        setMoveSquares({});
        return;
      }
      console.log("clicked");

      setSelectedSquare(square);
      getLegalMoves(square as Square);

      if (selectedSquare === square) {
        setSelectedSquare(null);
        setMoveSquares({});
      } else {
        setSelectedSquare(square);
        getLegalMoves(square as Square);
      }
    },
    boardOrientation: state.color == "b" ? "black" : "white",
    canDragPiece: ({ piece, square }) => {
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
    squareStyles: moveSquares,
  } satisfies ChessboardOptions;

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
