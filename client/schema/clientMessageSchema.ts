import { z } from "zod";

export const WatchGameShema = z.object({
  type: z.literal("WATCH_GAME"),
  payload: z.object({
    gameId: z.uuid(),
  })
})

export const InitGameSchema = z.object({
  type: z.literal("INIT_GAME"),
});

const square = z.string().regex(/^[a-h][1-8]$/);

const PromotionOptionSchema = z.enum(["q", "r", "b", "n", ""]);

export const MoveSchema = z.object({
    type: z.literal("MOVE"),
    payload: z.object({
        from: square,
        to: square,
        promotion: PromotionOptionSchema,
    })
})

export const ExitSchema = z.object({
  type: z.literal("EXIT"),
  payload: z.object({
    reason: z.enum(["RESIGN", "DISCONNECT", "LEAVE"]),
  }),
})

export const ClientMessageSchema = z.discriminatedUnion("type", [WatchGameShema, InitGameSchema,MoveSchema, ExitSchema]);

export type PromotionOption = z.infer<typeof PromotionOptionSchema>;
export type ClientMessage = z.infer<typeof ClientMessageSchema>;
export type MovePayload = z.infer<typeof MoveSchema>["payload"];
