"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";

import { asyncWrapProviders } from "async_hooks";
import { Chess, Move, Square } from "chess.js";

import { getGameFromDB } from "@/feature/game/action/game-from-db";
import { gameReducer } from "@/lib/gameReducer";
import { PromotionOption } from "@/schema/clientMessageSchema";
import { ServerMessage } from "@/schema/serverMessageSchema";

import { useGameSocket } from "./useGameSocket";

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, {
    status: "IDLE",
    moves: [],
    yourTurn: false,
  });

  // Local chess instance for client-side validation
  const chessRef = useRef<Chess>(new Chess());

  const { send, connected, connectionState, onMessage, reconnect } =
    useGameSocket();

  // Keep local chess state in sync with game state
  useEffect(() => {
    if (state.fen) {
      try {
        chessRef.current.load(state.fen);
      } catch (error) {
        console.log("Failed to load FEN:", error);
      }
    }
  }, [state.fen]);

  useEffect(() => {
    if (!connected) return;

    onMessage(async (event: MessageEvent) => {
      try {
        const message: ServerMessage = JSON.parse(event.data);
        if (
          message.type === "ERROR" &&
          "type" in message.payload &&
          message.payload.type === "WATCH_GAME" &&
          message.payload.gameId
        ) {
          // Fallback to DB
          const game = await getGameFromDB(message.payload.gameId);

          if (game) {
            dispatch({
              type: "DB_GAME_LOADED",
              payload: {
                fen: game.fen,
                moves: game.moves,
                winner:
                  game.winner === "BLACK"
                    ? "b"
                    : game.winner === "WHITE"
                      ? "w"
                      : null,
                status: "ENDED",
                yourTurn: false,
              },
            });
          }
          return;
        }
        dispatch(message);
      } catch (error) {
        console.error("Failed to parse server message:", error);
      }
    });
  }, [connected, onMessage]);

  const initGame = useCallback(() => {
    if (!connected) {
      console.warn("Cannot init game - not connected");
      return false;
    }
    send({ type: "INIT_GAME" });
  }, [connected, send]);

  const watchGame = useCallback(
    (gameId: string) => {
      if (!connected || !gameId) {
        console.warn("Cannot watch game - not connected or missing gameId");
        return false;
      }
      send({
        type: "WATCH_GAME",
        payload: {
          gameId: gameId,
        },
      });
    },
    [connected, send]
  );

  /**
   * Validate move client-side before sending to server
   * Returns error message if invalid, null if valid
   */
  const validateMove = useCallback(
    (from: string, to: string, promotion?: PromotionOption) => {
      if (!state.yourTurn) {
        return "Not your turn";
      }

      if (state.status !== "PLAYING") {
        return "Game is not in progress";
      }

      try {
        // Create a copy to test the move without mutating state
        const testChess = new Chess(chessRef.current.fen());

        const moveOption: { from: string; to: string; promotion?: string } = {
          from,
          to,
        };
        if (promotion) {
          moveOption.promotion = promotion;
        }

        const result = testChess.move(moveOption);
        if (!result) {
          return "Invalid move";
        }

        return null; // Move is valid
      } catch (error) {
        return "Invalid move";
      }
    },
    [state.yourTurn, state.status]
  );

  /**
   * Make a move with client-side validation
   */
  const move = useCallback(
    (
      from: string,
      to: string,
      promotion: PromotionOption
    ): { success: boolean; error?: string } => {
      // Client-side validation first
      const error = validateMove(from, to, promotion);
      if (error) {
        console.warn("Move rejected locally:", error);
        return { success: false, error };
      }

      // Send to server
      const sent = send({
        type: "MOVE",
        payload: { from, to, promotion },
      });

      if (!sent) {
        return {
          success: false,
          error: "Failed to send move - connection issue",
        };
      }

      return { success: true };
    },
    [validateMove, send]
  );

  /**
   * Get all legal moves from a square (for highlighting)
   */
  const getLegalMoves = useCallback((square: Square): Move[] => {
    try {
      return chessRef.current.moves({ square, verbose: true }) as Move[];
    } catch (error) {
      return [];
    }
  }, []);

  /**
   * Check if it's a valid square to select (has pieces that can move)
   */
  const canSelectSquare = useCallback(() => {
    if (!state.yourTurn || state.status !== "PLAYING") {
      return false;
    }
  }, [state.yourTurn, state.status, getLegalMoves]);

  return {
    state,
    move,
    initGame,
    watchGame,
    // New utilities
    validateMove,
    getLegalMoves,
    canSelectSquare,
    // Connection state
    connected,
    connectionState,
    reconnect,
  };
}
