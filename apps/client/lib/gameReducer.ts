import { ServerMessage } from "@/schema/serverMessageSchema";

import { GameState, GetGameFromDB } from "./types";

export function gameReducer(
  state: GameState,
  message: ServerMessage | GetGameFromDB
): GameState {
  switch (message.type) {
    case "WATCH_GAME": {
      return {
        ...state,
        fen: message.payload.fen,
        moves: message.payload.moves,
        status: "PLAYING",
        whiteId: message.payload.whiteId,
        blackId: message.payload.blackId,
      };
    }
    case "DB_GAME_LOADED": {
      return {
        ...state,
        status: "ENDED",
        fen: message.payload.fen,
        moves: message.payload.moves,
        winner: message.payload.winner,
        reason: message.payload.reason,
        whiteId: message.payload.whiteId,
        blackId: message.payload.blackId,
      };
      break;
    }
    case "INIT_GAME":
      return {
        status: "PLAYING",
        color: message.payload.color,
        fen: message.payload.fen,
        moves: message.payload.moves,
        yourTurn: message.payload.color === "w",
        whiteId: message.payload.whiteId,
        blackId: message.payload.blackId,
        gameId: message.payload.gameId,
      };
    case "RESUME_GAME":
      return {
        status: "PLAYING",
        color: message.payload.color,
        fen: message.payload.fen,
        moves: message.payload.moves,
        yourTurn: message.payload.yourTurn,
      };
    case "MOVE": {
      return {
        ...state,
        fen: message.payload.fen,
        moves: message.payload.moves,
        yourTurn: !state.yourTurn,
      };
    }
    case "DRAW_OFFERED": {
      return {
        ...state,
        drawOfferIncoming: true,
      };
    }
    case "DRAW_DECLINED": {
      return {
        ...state,
        drawOfferIncoming: false,
      };
    }
    case "GAME_OVER":
      return {
        ...state,
        status: "ENDED",
        winner: message.payload.winner,
        reason: message.payload.reason,
        yourTurn: false,
      };
    case "ERROR": {
      console.error(message.payload.message);
      return state;
    }
    default:
      return state;
  }
}
