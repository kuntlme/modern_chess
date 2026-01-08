import { type User } from "./types.js";
import { Game } from "./game.js";
import { randomUUID } from "crypto";
import type { ClientMessage } from "./schema/clientMessageSchema.js";
import type { ServerMessage } from "./schema/serverMessageSchema.js";

export class GameManager {
    private users = new Map<string, User>();
    private games = new Map<string, Game>();
    private waitingUser: User | null = null;

    addUser(user: User) {
        const existing = this.users.get(user.id);
        if (existing) {
            // RECONNECT
            existing.socket = user.socket;
            existing.lastSeen = Date.now();
            if (existing.gameId) {
                const game = this.games.get(existing.gameId);
                game?.resume(existing);
                user.gameId = existing.gameId;
            }
            return;
        }

        this.users.set(user.id, user);
        if (this.waitingUser) {
            // INIT_GAME
            const gameId = randomUUID();
            const game = new Game(gameId, this.waitingUser, user);
            this.games.set(gameId, game);
            this.waitingUser = null;
        } else {
            this.waitingUser = user;
        }
    }

    removeUser(user: User) {
        const stored = this.users.get(user.id);
        if (!stored) return;

        stored.socket = null;
        stored.lastSeen = Date.now();
    }

    handleMessage(user: User, message: ClientMessage) {


        switch (message.type) {
            case "INIT_GAME": {
                this.addUser(user);
                break;
            }
            case "MOVE": {
                if(!user.gameId){
                    this.send(user, {
                        type: "ERROR",
                        message: "You are not in game",
                    })
                    return;
                }
                const game = this.games.get(user.gameId);
                if (!game) return;
                game.handleMove(user, message.payload);
                break;
            }
            case "EXIT": {
                //TODO:
                break;
            }

        }
    }

    cleanup() {
        const now = Date.now();

        for (const [id, user] of this.users) {
            if (!user.socket && now - user.lastSeen > 5 * 60000) {
                this.users.delete(id);
            }
        }
    }

    private send(user: User, data: ServerMessage) {
        if(user.socket && user.socket.readyState === user.socket.OPEN){
            user.socket.send(JSON.stringify(data));
        }
    }
}