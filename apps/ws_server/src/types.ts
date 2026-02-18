import { WebSocket } from "ws";

export type UserStatus = "online" | "in_game" | "idle";

export type User = {
  id: string;
  socket: WebSocket | null;
  gameId?: string | undefined;
  lastSeen: number;
  status: UserStatus;
};
