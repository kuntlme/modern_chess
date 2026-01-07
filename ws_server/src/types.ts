import { z } from "zod";
import { WebSocket } from "ws"
export type User = {
  id: string;
  socket: WebSocket | null;
  gameId?: string;
  lastSeen: number;
}
