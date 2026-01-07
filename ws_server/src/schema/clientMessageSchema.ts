import { z } from "zod";

export const InitGameSchema = z.object({
  type: z.literal("INIT_GAME"),
});

const square = z.string().regex(/^[a-h][1-8]$/);

export const MoveSchema = z.object({
    type: z.literal("MOVE"),
    payload: z.object({
        from: square,
        to: square,
        promotion: z.enum(["q", "r", "b", "n", ""]),
    })
})

export const ExitSchema = z.object({
  type: z.literal("EXIT"),
  payload: z.object({
    reason: z.enum(["RESIGN", "DISCONNECT", "LEAVE"]),
  }),
})

export const ClientMessageSchema = z.discriminatedUnion("type", [InitGameSchema,MoveSchema, ExitSchema]);

export type ClientMessage = z.infer<typeof ClientMessageSchema>;
export type MovePayload = z.infer<typeof MoveSchema>["payload"];
