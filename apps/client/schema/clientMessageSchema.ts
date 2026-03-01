import { z } from "zod";

export const WatchGameSchema = z.object({
  type: z.literal("WATCH_GAME"),
  payload: z.object({
    gameId: z.uuid(),
  }),
});

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
  }),
});

export const ResignationSchema = z.object({
  type: z.literal("RESIGN"),
});

export const ExitSchema = z.object({
  type: z.literal("EXIT"),
  payload: z.object({
    reason: z.enum(["RESIGN", "DISCONNECT", "LEAVE"]),
  }),
});

export const GetOnlineUsersSchema = z.object({
  type: z.literal("GET_ONLINE_USERS"),
});

export const DrawRequestSchema = z.object({
  type: z.literal("DRAW_REQUEST"),
});

export const DrawResponseSchema = z.object({
  type: z.literal("DRAW_RESPONSE"),
  payload: z.object({
    accept: z.boolean(),
  }),
});

export const PingSchema = z.object({
  type: z.literal("PING"),
});

export const ClientMessageSchema = z.discriminatedUnion("type", [
  WatchGameSchema,
  InitGameSchema,
  MoveSchema,
  ResignationSchema,
  ExitSchema,
  DrawRequestSchema,
  DrawResponseSchema,
  GetOnlineUsersSchema,
  PingSchema,
]);

export type PromotionOption = z.infer<typeof PromotionOptionSchema>;
export type ClientMessage = z.infer<typeof ClientMessageSchema>;
export type Square = z.infer<typeof square>;
export type MovePayload = z.infer<typeof MoveSchema>["payload"];
export type DrawResponsePayload = z.infer<typeof DrawResponseSchema>["payload"];
