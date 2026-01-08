import { ServerMessage } from "@/schema/serverMessageSchema";
import { GameState } from "./types";

export function gameReducer(
    state: GameState,
    message: ServerMessage,
): GameState {
    switch (message.type) {
        case "WATCH_GAME": {
            return {
                ...state,
                fen: message.payload.fen,
                moves: message.payload.moves,
                status: "PLAYING"
            }
        }
        case "INIT_GAME":
            return {
                status: "PLAYING",
                color: message.payload.color,
                fen: message.payload.fen,
                moves: message.payload.moves,
                yourTurn: message.payload.color === "w",
            }
        case "RESUME_GAME":
            return {
                status: "PLAYING",
                color: message.payload.color,
                fen: message.payload.fen,
                moves: message.payload.moves,
                yourTurn: message.payload.yourTurn,
            }
        case "MOVE": {
            return {
                ...state,
                fen: message.payload.fen,
                moves: message.payload.moves,
                yourTurn: !state.yourTurn,
            }
        }
        case "GAME_OVER":
            return {
                ...state,
                status: "ENDED",
                winner: message.payload.winner,
                yourTurn: false,
            }
        case "ERROR": {
            console.error(message.message);
            return state;
        }
        default:
            return state;
    }
}