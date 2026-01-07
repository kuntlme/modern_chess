import { WebSocketServer } from "ws";
import { GameManager } from "./game-maneger.js";
import { randomUUID } from "crypto";
import { ClientMessageSchema } from "./schema/clientMessageSchema.js";
import type { User } from "./types.js";

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

setInterval(() => {
    gameManager.cleanup()
}, 60000);

wss.on("connection", function connection(ws, req) {
    // TEMP identity (replace with auth later)
    const userId = new URL(req.url ?? "", "ws://localhost").searchParams.get("userId") ?? randomUUID()
    const user: User = {
        id: userId,
        socket: ws,
        lastSeen: Date.now(),
    }

    ws.on("message", (data) => {
        let parsed: unknown;
        try {
            parsed = JSON.parse(data.toString());
        } catch (error) {
            ws.send(JSON.stringify({
                type: "ERROR",
                message: "Invaid JSON",
            }))
            return;
        }

        const result = ClientMessageSchema.safeParse(parsed);

        if (!result.success) {
            return ws.send(JSON.stringify({
                type: "ERROR",
                message: "Invalid client message",
            }))
        }

        gameManager.handleMessage(user, result.data);
    })
    ws.on("close", () => {
        gameManager.removeUser(user)
    })
})


console.log("♟️ WebSocket Chess Server running on ws://localhost:8080");