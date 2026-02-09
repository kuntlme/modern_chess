import { z } from "zod";

const gameOverReasonSchema = z.enum([
  "CHECKMATE",
  "STALEMATE",
  "DRAW_BY_REPETITION",
  "DRAW_BY_INSUFFICIENT_MATERIAL",
  "DRAW_BY_FIFTY_MOVE_RULE",
  "RESIGNATION",
  "TIMEOUT",
  "ABANDONED",
]);

export const WatchGameSchema = z.object({
  type: z.literal("WATCH_GAME"),
  payload: z.object({
    fen: z.string(),
    moves: z.array(z.string()),
    turn: z.enum(["w", "b"]),
  }),
});

export const InitGameSchema = z.object({
  type: z.literal("INIT_GAME"),
  payload: z.object({
    color: z.enum(["w", "b"]),
    fen: z.string(),
    moves: z.array(z.string()),
    gameId: z.uuid(),
  }),
});

export const MoveSchema = z.object({
  type: z.literal("MOVE"),
  payload: z.object({
    uci: z.string(),
    fen: z.string(),
    moves: z.array(z.string()),
  }),
});

export const ResumeGameSchema = z.object({
  type: z.literal("RESUME_GAME"),
  payload: z.object({
    color: z.enum(["w", "b"]),
    fen: z.string(),
    moves: z.array(z.string()),
    yourTurn: z.boolean(),
    gameId: z.uuid(),
  }),
});

export const GameOverSchema = z.object({
  type: z.literal("GAME_OVER"),
  payload: z.object({
    reason: gameOverReasonSchema,
    winner: z.enum(["w", "b"]).nullable(),
  }),
});

export const ErrorSchema = z.object({
  type: z.literal("ERROR"),
  message: z.string(),
});

export const OnlineUserSchema = z.object({
  id: z.string(),
  status: z.enum(["online", "in_game", "idle"]),
});

export const OnlineUsersSchema = z.object({
  type: z.literal("ONLINE_USERS"),
  payload: z.object({
    users: z.array(OnlineUserSchema),
  }),
});

export const UserJoinedSchema = z.object({
  type: z.literal("USER_JOINED"),
  payload: OnlineUserSchema,
});

export const UserLeftSchema = z.object({
  type: z.literal("USER_LEFT"),
  payload: z.object({
    id: z.string(),
  }),
});

export const PongSchema = z.object({
  type: z.literal("PONG"),
});

export const ServerMessageSchema = z.discriminatedUnion("type", [
  WatchGameSchema,
  InitGameSchema,
  MoveSchema,
  ResumeGameSchema,
  GameOverSchema,
  ErrorSchema,
  OnlineUserSchema,
  UserJoinedSchema,
  OnlineUsersSchema,
  UserLeftSchema,
  PongSchema,
]);

export type GameOverReason = z.infer<typeof gameOverReasonSchema>;
export type ErrorMessage = z.infer<typeof ErrorSchema>;
export type OnlineUser = z.infer<typeof OnlineUserSchema>;
export type ServerMessage = z.infer<typeof ServerMessageSchema>;
