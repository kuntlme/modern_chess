import { randomUUID } from "crypto";

import { Game } from "./game.js";
import type { ClientMessage } from "./schema/clientMessageSchema.js";
import type { ServerMessage } from "./schema/serverMessageSchema.js";
import { type User } from "./types.js";

export class GameManager {
  private users = new Map<string, User>();
  private games = new Map<string, Game>();
  private waitingUser: User | null = null;

  //Register a new user connection and broadcast their presence
  registerUser(user: User) {
    const existing = this.users.get(user.id);
    if (existing) {
      // RECONNECT - update socket reference
      existing.socket = user.socket;
      existing.lastSeen = Date.now();
      existing.status = existing.gameId ? "in_game" : "online";

      // If they were in a game, resume it
      if (existing.gameId) {
        const game = this.games.get(existing.gameId);
        game?.resume(existing);
      }

      //Send them the current online users
      this.sendOnlineUsers(existing);

      //Broadcast that they're back online
      this.broadcastUserJoined(existing);
    }
    // New user
    this.users.set(user.id, user);

    // Send then the current online user list
    this.sendOnlineUsers(user);

    //Broadcast to everyone that a new user joined
    this.broadcastUserJoined(user);
  }

  // Unregister user (disconnect)
  unregisterUser(user: User) {
    const stored = this.users.get(user.id);
    if (!stored) return;

    stored.socket = null;
    stored.lastSeen = Date.now();
    stored.status = "idle";

    // Broadcast that user left
    this.broadcastUserLeft(user.id);
  }

  // Get online users for the requesting user
  private sendOnlineUsers(user: User) {
    const onlineUser = Array.from(this.users.values())
      .filter((u) => u.socket != null && u.id != user.id)
      .map((u) => ({
        id: u.id,
        status: u.status,
      }));

    this.send(user, {
      type: "ONLINE_USERS",
      payload: { users: onlineUser },
    });
  }

  // Broadcast user joined to all connected users
  private broadcastUserJoined(joinedUser: User) {
    for (const [id, user] of this.users) {
      if (user.socket && user.id !== joinedUser.id) {
        this.send(user, {
          type: "USER_JOINED",
          payload: {
            id: joinedUser.id,
            status: joinedUser.status,
          },
        });
      }
    }
  }

  // Broadcast user left to all connected users
  private broadcastUserLeft(leftUserId: string) {
    for (const [id, user] of this.users) {
      if (user.socket && user.id !== leftUserId) {
        this.send(user, {
          type: "USER_LEFT",
          payload: {
            id: leftUserId,
          },
        });
      }
    }
  }

  addUser(user: User) {
    const existing = this.users.get(user.id);

    // If user already exist in the system
    if (existing) {
      existing.socket = user.socket;
      existing.lastSeen = Date.now();

      // If they're already in a game, resume it
      if (existing.gameId) {
        const game = this.games.get(existing.gameId);
        game?.resume(existing);
        user.gameId = existing.gameId;
        return;
      }

      // User exists but not in a game - proceed with matchmaking
      // Check if they're already waiting
      if (this.waitingUser?.id === existing.id) {
        // Already waiting, do nothing
        return;
      }

      // Try to match with waiting user
      if (this.waitingUser && this.waitingUser.id !== existing.id) {
        const gameId = randomUUID();
        const game = new Game(gameId, this.waitingUser, existing);
        console.log("gameID", gameId);
        this.games.set(gameId, game);

        // Update both users status to in_game
        this.waitingUser.status = "in_game";
        existing.status = "in_game";

        this.waitingUser = null;
      } else {
        // No one is waiting, this user waits
        this.waitingUser = existing;
      }
      return;
    }

    //New user - add to map
    this.users.set(user.id, user);
    if (this.waitingUser) {
      // INIT_GAME
      const gameId = randomUUID();
      const game = new Game(gameId, this.waitingUser, user);
      console.log("gameID ", gameId);
      this.games.set(gameId, game);

      // Update both users status to in_game
      this.waitingUser.status = "in_game";
      user.status = "in_game";
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
        if (!user.gameId) {
          this.send(user, {
            type: "ERROR",
            message: "You are not in game",
          });
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
      case "WATCH_GAME": {
        const game = this.games.get(message.payload.gameId);
        if (!game) {
          this.send(user, {
            type: "ERROR",
            message: "Invalid game ID",
          });
          return;
        }
        game.handleWatcher(user);
        break;
      }
      case "GET_ONLINE_USERS": {
        this.sendOnlineUsers(user);
        break;
      }
      case "PING": {
        // Update last seen and respond with PONG
        user.lastSeen = Date.now();
        this.send(user, { type: "PONG" });
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

  private send(user: User, message: ServerMessage) {
    if (!user.socket) return;

    user.socket.send(JSON.stringify(message));
  }
}
