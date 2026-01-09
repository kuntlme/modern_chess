import { Chess } from "chess.js";
import type { User } from "./types.js";
import type { GameOverReason, ServerMessage } from "./schema/serverMessageSchema.js";
import type { ClientMessage, MovePayload } from "./schema/clientMessageSchema.js";

export class Game {
    id: string;
    white: User;
    black: User;

    private chess: Chess;
    private moves: string[];

    private startTime: Date;

    watchers = new Map<string, User>;

    constructor(id: string, white: User, black: User) {
        this.id = id;
        this.white = white;
        this.black = black;

        this.chess = new Chess();
        this.moves = [];
        this.startTime = new Date();

        white.gameId = id;
        black.gameId = id;

        this.sendInit();
    }

    private sendInit() {
        this.send(this.white, {
            type: "INIT_GAME",
            payload: {
                color: "w",
                fen: this.chess.fen(),
                moves: [],
                gameId: this.id,
            },
        })

        this.send(this.black, {
            type: "INIT_GAME",
            payload: {
                color: "b",
                fen: this.chess.fen(),
                moves: [],
                gameId: this.id,
            },
        });
    }

    handleMove(user: User, move: MovePayload) {
        const isWhite = user.id === this.white.id;
        const turn = this.chess.turn(); // "w" | "b"

        if ((turn === "w" && !isWhite) || (turn === "b" && isWhite)) {
            return this.send(user, {
                type: "ERROR",
                message: "Not your turn",
            })
        }
        let result;
        try {
            result = this.chess.move(move);
        } catch (error) {
            return this.send(user, {
                type: "ERROR",
                message: "Invalid move",
            })
        }

        const uci = `${result.from}${result.to}${result.promotion ?? ""}`;
        this.moves.push(uci);

        this.broadcast({
            type: "MOVE",
            payload: {
                uci: uci,
                fen: this.chess.fen(),
                moves: this.moves,
            },
        });
        this.checkGameOver();
    }

    handleWatcher(user: User) {
        const existing = this.watchers.get(user.id);
        if (!existing) this.watchers.set(user.id, user);
        this.send(user, {
            type: "WATCH_GAME",
            payload: {
                fen: this.chess.fen(),
                moves: this.moves,
                turn: this.chess.turn(),
            }
        })
    }

    checkGameOver() {
        if (!this.chess.isGameOver()) return;
        let reason: GameOverReason;
        let winner: "w" | "b" | null = null;
        if (this.chess.isCheckmate()) {
            console.log("checkmate");
            reason = "CHECKMATE";
            winner = this.chess.turn() === "w" ? "b" : "w";
        }
        // TODO: add condition from Resingation & Timeout, winner: "w" or "b", "Abandaned" winner: null 
        else if (this.chess.isStalemate()) {
            reason = "STALEMATE";
        } else if (this.chess.isThreefoldRepetition()) {
            reason = "DRAW_BY_REPETITION";
        } else if (this.chess.isInsufficientMaterial()) {
            reason = "DRAW_BY_INSUFFICIENT_MATERIAL";
        } else if (this.chess.isDrawByFiftyMoves()) {
            reason = "DRAW_BY_FIFTY_MOVE_RULE";
        } else {
            console.error("Unknown reason for game over");
            return;
        }
        this.broadcast({
            type: "GAME_OVER",
            payload: {
                reason, winner
            }
        })
    }

    resume(user: User) {
        this.send(user, {
            type: "RESUME_GAME",
            payload: {
                fen: this.chess.fen(),
                moves: this.moves,
                color: user.id === this.white.id ? "w" : "b",
                yourTurn:
                    (this.chess.turn() === "w" && user.id === this.white.id) ||
                    (this.chess.turn() === "b" && user.id === this.black.id),
                gameId: this.id,
            }
        })
    }

    private send(user: User, data: ServerMessage) {
        if (user.socket && user.socket.readyState === user.socket.OPEN) {
            user.socket.send(JSON.stringify(data));
        }
    }

    private broadcast(data: ServerMessage) {
        this.send(this.white, data);
        this.send(this.black, data);
        for (const [, watcher] of this.watchers) {
            this.send(watcher, data);
        }
    }
}

