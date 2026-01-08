import { z } from "zod";

export const WatchGameSchema = z.object({
    type: z.literal("WATCH_GAME"),
    payload: z.object({
        fen: z.string(),
        moves: z.array(z.string()),
        turn: z.enum(["w", "b"]),
    })
})

export const InitGameSchema = z.object({
    type: z.literal("INIT_GAME"),
    payload: z.object({
        color: z.enum(["w", "b"]),
        fen: z.string(),
        moves: z.array(z.string()),
        gameId: z.uuid(),
    }),
})

export const MoveSchema = z.object({
    type: z.literal("MOVE"),
    payload: z.object({
        uci: z.string(),
        fen: z.string(),
        moves: z.array(z.string()),
    })
})

export const ResumeGameSchema = z.object({
    type:z.literal("RESUME_GAME"),
    payload: z.object({
        color: z.enum(["w", "b"]),
        fen: z.string(),
        moves: z.array(z.string()),
        yourTurn: z.boolean(),
        gameId: z.uuid(),
    })
})

export const GameOverSchema = z.object({
    type: z.literal("GAME_OVER"),
    payload: z.object({
        reason: z.string(),
        winner: z.enum(["w", "b"]).nullable(),
    }),
});

export const ErrorSchema = z.object({
    type: z.literal("ERROR"),
    message: z.string(),
});

export const ServerMessageSchema = z.discriminatedUnion("type", [
    WatchGameSchema,
    InitGameSchema,
    MoveSchema,
    ResumeGameSchema,
    GameOverSchema,
    ErrorSchema,
]);

export type ErrorMessage = z.infer<typeof ErrorSchema>
export type ServerMessage = z.infer<typeof ServerMessageSchema>