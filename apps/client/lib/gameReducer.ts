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
      };
    }
    case "DB_GAME_LOADED": {
      return {
        ...state,
        status: "ENDED",
        fen: message.payload.fen,
        moves: message.payload.moves,
        winner: message.payload.winner,
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
    case "GAME_OVER":
      return {
        ...state,
        status: "ENDED",
        winner: message.payload.winner,
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
