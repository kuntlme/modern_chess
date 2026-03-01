import { Chess } from "chess.js";
import { networkInterfaces } from "os";

import { saveGameToDB } from "./save-to-db.js";
import type {
  ClientMessage,
  DrawResponsePayload,
  MovePayload,
} from "./schema/clientMessageSchema.js";
import type {
  GameOverReason,
  ServerMessage,
} from "./schema/serverMessageSchema.js";
import type { DrawRequest, User } from "./types.js";

type Color = "w" | "b";

interface gameResult {
  reason: GameOverReason;
  winner: Color | null;
  endAt: Date;
}

export class Game {
  id: string;
  white: User;
  black: User;

  private chess: Chess;
  private moves: string[];

  private result?: gameResult;

  private startTime: Date;

  private drawRequest: DrawRequest = null;

  watchers = new Map<string, User>();

  constructor(
    id: string,
    white: User,
    black: User,
    private onGameOver: (gameId: string) => void
  ) {
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
        whiteId: this.white.id,
        blackId: this.black.id,
      },
    });

    this.send(this.black, {
      type: "INIT_GAME",
      payload: {
        color: "b",
        fen: this.chess.fen(),
        moves: [],
        gameId: this.id,
        whiteId: this.white.id,
        blackId: this.black.id,
      },
    });
  }

  handleMove(user: User, move: MovePayload) {
    const isWhite = user.id === this.white.id;
    const turn = this.chess.turn(); // "w" | "b"

    if ((turn === "w" && !isWhite) || (turn === "b" && isWhite)) {
      return this.send(user, {
        type: "ERROR",
        payload: {
          message: "Not your turn",
        },
      });
    }
    let result;
    try {
      result = this.chess.move(move);
    } catch (error) {
      return this.send(user, {
        type: "ERROR",
        payload: {
          message: "Invalid move",
        },
      });
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
    this.checkEngineGameOver();
  }

  handleResign(user: User) {
    if (this.result) return;

    const winner: Color = user.id === this.white.id ? "b" : "w";

    this.endGame("RESIGNATION", winner);
  }

  handleDrawRequest(user: User) {
    // already pending
    if (this.drawRequest) {
      return;
    }
    // Cannot request when not your turn
    const isWhite = user.id === this.white.id;
    const turn = this.chess.turn(); // "w" | "b"

    if ((turn === "w" && !isWhite) || (turn === "b" && isWhite)) {
      return this.send(user, {
        type: "ERROR",
        payload: {
          message: "Not your turn",
        },
      });
    }

    this.drawRequest = {
      requestBy: turn,
      createdAt: new Date(),
    };

    const opponent = isWhite ? this.black : this.white;

    this.send(opponent, {
      type: "DRAW_OFFERED",
      payload: {
        by: turn,
      },
    });
  }

  handleDrawResponse(user: User, response: DrawResponsePayload) {
    if (!this.drawRequest || this.result) return;
    const playerColor = user.id === this.white.id ? "w" : "b";

    if (playerColor === this.drawRequest.requestBy) return;

    if (response.accept) {
      this.endGame("DRAW_AGREEMENT", null);
    } else {
      const opponent = user.id === this.white.id ? this.black : this.white;
      this.send(opponent, {
        type: "DRAW_DECLINED",
        payload: {
          by: playerColor,
        },
      });
      this.drawRequest = null;
    }
  }

  private checkEngineGameOver() {
    if (!this.chess.isGameOver() || this.result) return;

    if (this.chess.isCheckmate()) {
      const winner: Color = this.chess.turn() === "w" ? "b" : "w";
      return this.endGame("CHECKMATE", winner);
    }

    if (this.chess.isStalemate()) {
      return this.endGame("STALEMATE", null);
    }

    if (this.chess.isThreefoldRepetition()) {
      return this.endGame("DRAW_BY_REPETITION", null);
    }

    if (this.chess.isInsufficientMaterial()) {
      return this.endGame("DRAW_BY_INSUFFICIENT_MATERIAL", null);
    }

    if (this.chess.isDrawByFiftyMoves()) {
      this.endGame("DRAW_BY_FIFTY_MOVE_RULE", null);
    }
  }

  private endGame(reason: GameOverReason, winner: Color | null) {
    if (this.result) return;
    this.result = {
      reason,
      winner,
      endAt: new Date(),
    };
    this.broadcast({
      type: "GAME_OVER",
      payload: { reason, winner },
    });

    saveGameToDB({
      gameId: this.id,
      whiteId: this.white.id,
      blackId: this.black.id,
      status: "ENDED",
      winner: winner === "w" ? "WHITE" : winner === "b" ? "BLACK" : "DRAW",
      fen: this.chess.fen(),
      moves: this.moves,
      gameResult: reason,
      pgn: this.chess.pgn(),
    });

    this.onGameOver(this.id);
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
        whiteId: this.white.id,
        blackId: this.black.id,
      },
    });
    if (this.result) {
      this.send(user, {
        type: "GAME_OVER",
        payload: {
          reason: this.result.reason,
          winner: this.result.winner,
        },
      });
    }
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
      },
    });

    if (this.result) {
      this.send(user, {
        type: "GAME_OVER",
        payload: {
          reason: this.result.reason,
          winner: this.result.winner,
        },
      });
    }
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
