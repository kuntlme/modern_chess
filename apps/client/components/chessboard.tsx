"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Chessboard, ChessboardOptions } from "react-chessboard";

import { Chess, Move, Square } from "chess.js";

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
  onPromotionRequired: (from: string, to: string) => void;
}) {
  if (state.status === "IDLE") return null;

  const [currentFen, setCurrentFen] = useState<string>(new Chess().fen());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [moveSquares, setMoveSquares] = useState<
    Record<string, React.CSSProperties>
  >({});
  const [optionSquares, setOptionSquares] = useState<
    Record<string, React.CSSProperties>
  >({});
  const [lastMoveSquares, setLastMoveSquares] = useState<
    Record<string, React.CSSProperties>
  >({});

  // Create chess instance from current FEN
  const game = useMemo(() => new Chess(currentFen), [currentFen]);

  // Check if player can interact with board
  const canInteract = useMemo(() => {
    return (
      state.status === "PLAYING" &&
      state.yourTurn &&
      currentMove === state.moves.length - 1
    );
  }, [state.status, state.yourTurn, currentMove, state.moves.length]);

  // Clear all highlights
  const clearHighlights = () => {
    setSelectedSquare(null);
    setMoveSquares({});
  };

  // Get legal moves and style them (capture vs normal)
  const getLegalMoves = (square: Square) => {
    const moves = game.moves({ square, verbose: true });

    if (moves.length === 0) {
      setMoveSquares({});
      return;
    }

    const newMoveSquares: Record<string, React.CSSProperties> = {};

    moves.forEach((move: Move) => {
      if (move.captured) {
        // 🔴 Red ring for capture moves
        newMoveSquares[move.to] = {
          boxShadow: "inset 0 0 0 3px rgba(255, 80, 80, 0.7)",
          background:
            "radial-gradient(circle, transparent 30%, transparent 35%)",
          backgroundSize: "10% 10%",
          backgroundPosition: "center",
          borderRadius: "50%",
        };
      } else {
        // ⚫ Small subtle dot for normal moves
        newMoveSquares[move.to] = {
          background:
            "radial-gradient(circle, rgba(0,0,0,0.35) 20%, transparent 25%)",
          backgroundSize: "60% 60%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "50%",
        };
      }
    });

    // 🟡 Highlight selected piece square
    newMoveSquares[square] = {
      backgroundColor: "rgba(255, 255, 0, 0.45)",
    };

    setMoveSquares(newMoveSquares);
  };

  // 🔴 Highlight king when in check (with red background)
  useEffect(() => {
    const tempGame = new Chess(currentFen);

    if (tempGame.inCheck()) {
      const kingColor = tempGame.turn();
      const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
      const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];

      for (const file of files) {
        for (const rank of ranks) {
          const sq = `${file}${rank}` as Square;
          const p = tempGame.get(sq);
          if (p?.type === "k" && p.color === kingColor) {
            setOptionSquares((prev) => ({
              ...prev,
              [sq]: {
                backgroundColor: "rgba(255, 80, 80, 0.5)",
              },
            }));
            return;
          }
        }
      }
    } else {
      setOptionSquares((prev) => {
        const newPrev = { ...prev };
        // Remove check highlight if no longer in check
        for (const key of Object.keys(newPrev)) {
          if (newPrev[key]?.backgroundColor?.includes("255, 80, 80")) {
            delete newPrev[key];
          }
        }
        return newPrev;
      });
    }
  }, [currentFen]);

  // 🎯 Highlight last move (source and destination squares)
  useEffect(() => {
    if (state.moves.length > 0 && currentMove !== null && currentMove >= 0) {
      const lastMoveStr = state.moves[currentMove];
      const tempGame = new Chess();

      // Replay all moves up to current to get the last move details
      for (let i = 0; i < currentMove; i++) {
        tempGame.move(state.moves[i]);
      }

      // Get the last move in verbose format to extract from/to
      const lastMove = tempGame.move(lastMoveStr);

      if (lastMove) {
        setLastMoveSquares({
          [lastMove.from]: {
            backgroundColor: "rgba(255, 255, 0, 0.25)",
          },
          [lastMove.to]: {
            backgroundColor: "rgba(255, 255, 0, 0.25)",
          },
        });
      }
    } else {
      setLastMoveSquares({});
    }
  }, [currentMove, state.moves]);

  // Clear last move highlights when game ends or resets
  useEffect(() => {
    if (state.status === "ENDED" || state.status === "IDLE") {
      setLastMoveSquares({});
    }
  }, [state.status]);

  // Update board when navigating move history
  useEffect(() => {
    if (currentMove != null) {
      const tempGame = new Chess();
      if (currentMove >= 0) {
        for (let i = 0; i <= currentMove; i++) {
          tempGame.move(state.moves[i]);
        }
      }
      setCurrentFen(tempGame.fen());
      clearHighlights();
    }
  }, [currentMove, state.moves]);

  // Update board when new state arrives from server
  useEffect(() => {
    if (state.fen) {
      setCurrentFen(state.fen);
      clearHighlights();
    }
  }, [state.fen]);

  const chessboardOptions: ChessboardOptions = {
    position: currentFen,
    onSquareClick: ({ square, piece }) => {
      // CLICK-TO-MOVE: If a piece is selected AND we click a highlighted legal move
      if (selectedSquare && moveSquares[square]) {
        const moves = game.moves({ square: selectedSquare, verbose: true });
        const move = moves.find((m: Move) => m.to === square);

        if (move) {
          const selectedPiece = game.get(selectedSquare);
          const isPawn = selectedPiece?.type === "p";
          const targetRank = square[1];
          const isPromotion =
            (selectedPiece?.color === "w" && targetRank === "8") ||
            (selectedPiece?.color === "b" && targetRank === "1");

          if (isPawn && isPromotion) {
            onPromotionRequired(selectedSquare, square);
          } else {
            sendMove(selectedSquare, square, "");
          }

          clearHighlights();
          return;
        }
      }

      // No piece clicked - clear selection
      if (!piece) {
        clearHighlights();
        return;
      }

      // Check if can interact
      if (!canInteract) {
        clearHighlights();
        return;
      }

      // ✅ Only allow selecting your own pieces (pieceType[0] = "w" or "b")
      if (piece.pieceType[0] !== state.color) {
        clearHighlights();
        return;
      }

      // Toggle: click same square to deselect
      if (selectedSquare === square) {
        clearHighlights();
      } else {
        setSelectedSquare(square as Square);
        getLegalMoves(square as Square);
      }
    },
    boardOrientation: state.color === "b" ? "black" : "white",
    canDragPiece: ({ piece }) => {
      if (!canInteract) return false;
      return piece.pieceType[0] === state.color;
    },
    onPieceDrop: ({ sourceSquare, targetSquare, piece }) => {
      if (!canInteract || !targetSquare) return false;

      const isPawn = piece.pieceType.endsWith("P");
      const targetRank = targetSquare[1];
      const isPromotion =
        (piece.pieceType.startsWith("w") && targetRank === "8") ||
        (piece.pieceType.startsWith("b") && targetRank === "1");

      if (isPawn && isPromotion) {
        onPromotionRequired(sourceSquare, targetSquare);
        return true;
      }

      sendMove(sourceSquare, targetSquare, "");
      clearHighlights();
      return true;
    },
    squareStyles: { ...lastMoveSquares, ...moveSquares, ...optionSquares },
  };

  return (
    <div className="aspect-square h-full max-h-[calc(100vh-80px)] w-full max-w-[60vw]">
      <Chessboard options={chessboardOptions} />
    </div>
  );
}

export default GameBoard;
