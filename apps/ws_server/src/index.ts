import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { WebSocketServer } from "ws";

import { GameManager } from "./game-manager.js";
import { ClientMessageSchema } from "./schema/clientMessageSchema.js";
import type { User } from "./types.js";

dotenv.config();

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

setInterval(() => {
  gameManager.cleanup();
}, 60000);

wss.on("connection", function connection(ws, req) {
  console.log("url", req.url);
  const token = new URL(req.url ?? "", "ws://localhost").searchParams.get(
    "token"
  );

  if (!token) {
    ws.close(1008, "Missing auth token");
    return;
  }
  console.log(process.env.WS_SECRET);
  let payload;

  try {
    payload = jwt.verify(token, process.env.WS_SECRET!) as {
      sub: string;
    };
  } catch (error) {
    ws.close(4001, "Invalid or expired token");
    return;
  }

  console.log(payload.sub);

  const user: User = {
    id: payload.sub,
    socket: ws,
    lastSeen: Date.now(),
    status: "online",
  };

  // Register user and broadcast their presence
  gameManager.registerUser(user);

  ws.on("message", (data) => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(data.toString());
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "ERROR",
          message: "Invalid JSON",
        })
      );
      return;
    }

    const result = ClientMessageSchema.safeParse(parsed);

    if (!result.success) {
      return ws.send(
        JSON.stringify({
          type: "ERROR",
          message: "Invalid client message",
        })
      );
    }
    gameManager.handleMessage(user, result.data);
  });

  ws.on("close", () => {
    gameManager.unregisterUser(user);
  });
});

console.log("♟️ WebSocket Chess Server running on ws://localhost:8080");
