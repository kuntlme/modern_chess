"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import { OnlineUser, ServerMessage } from "@/schema/serverMessageSchema";

// WebSocket connection status
type ConnectionState =
  | "connecting"
  | "connected"
  | "disconnected"
  | "reconnecting";

// Configuration for reconnection
const RECONNECT_CONFIG = {
  maxAttempts: 5,
  baseDelayMs: 1000,
  maxDelayMs: 30000,
} as const;

export function usePresence() {
  const wsRef = useRef<WebSocket | null>(null);
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("disconnected");
  const [token, setToken] = useState<string>("");
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  // Reconnection state
  const reconnectAttemptRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate delay with exponential backoff
  const getReconnectDelay = useCallback((attempt: number) => {
    const delay = RECONNECT_CONFIG.baseDelayMs * Math.pow(2, attempt);
    return Math.min(delay, RECONNECT_CONFIG.maxAttempts);
  }, []);

  // Clear reconnection timeout
  const clearReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  // Handle incoming messages
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message: ServerMessage = JSON.parse(event.data);

      switch (message.type) {
        case "ONLINE_USERS":
          setOnlineUsers(message.payload.users);
          break;
        case "USER_JOINED":
          setOnlineUsers((prev) => {
            // Don't add if already exists
            if (prev.some((u) => u.id === message.payload.id)) {
              return prev.map((u) =>
                u.id === message.payload.id ? message.payload : u
              );
            }
            return [...prev, message.payload];
          });
          break;
        case "USER_LEFT":
          setOnlineUsers((prev) =>
            prev.filter((u) => u.id !== message.payload.id)
          );
          break;
        case "USER_IN_GAME":
          setOnlineUsers((prev) => {
            //Don't update if it already updated
            if (prev.some((u) => u.id === message.payload.id)) {
              return prev.map((u) =>
                u.id === message.payload.id ? message.payload : u
              );
            }
            return [...prev, message.payload];
          });
          break;
        case "USER_OUT_GAME":
          setOnlineUsers((prev) => {
            //Don't update if it already updated
            if (prev.some((u) => u.id === message.payload.id)) {
              return prev.map((u) =>
                u.id === message.payload.id ? message.payload : u
              );
            }
            return [...prev, message.payload];
          });
          break;
        case "PONG":
          // Connection is alive
          break;
        default:
          // Ignore game-related messages in presence hook
          break;
      }
    } catch (error) {
      console.error("Failed to parse presence message:", error);
    }
  }, []);

  // Connect to WebSocket
  const connect = useCallback(
    (authToken: string) => {
      if (!authToken) return;

      // Clear up existing connection
      if (wsRef.current) {
        wsRef.current.close();
      }

      setConnectionState("connecting");
      console.log("Connecting to presence WebSocket...");

      const WS_URL =
        process.env.NEXT_PUBLIC_WS_URL || "wss://chess-ws-latest.onrender.com";

      const ws = new WebSocket(
        `${WS_URL}?token=${encodeURIComponent(authToken)}`
      );
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("Presence WebSocket connected");
        setConnectionState("connected");
        reconnectAttemptRef.current = 0;
      };

      ws.onclose = (event) => {
        console.log("Presence WebSocket closed:", event.code, event.reason);
        setConnectionState("disconnected");

        // Don't reconnect on intentional close or auth errors
        if (event.code === 1000 || event.code === 4001 || event.code === 1008) {
          console.log("Not reconnecting - intentional close or auth error");
          return;
        }

        // Attempt reconnection
        if (reconnectAttemptRef.current < RECONNECT_CONFIG.maxAttempts) {
          const delay = getReconnectDelay(reconnectAttemptRef.current);
          console.log(
            `Reconnecting presence in ${delay}ms (attempt ${reconnectAttemptRef.current + 1}/${RECONNECT_CONFIG.maxAttempts})`
          );

          setConnectionState("reconnecting");
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptRef.current++;
            connect(authToken);
          }, delay);
        } else {
          console.log("Max reconnection attempts reached for presence");
        }
      };

      ws.onerror = (error) => {
        console.log("Presence WebsSocket error:", error);
      };

      ws.onmessage = handleMessage;
    },
    [getReconnectDelay, handleMessage]
  );

  // Load token on mount
  useEffect(() => {
    const loadToken = async () => {
      try {
        const res = await fetch("/api/auth/token");
        if (!res.ok) throw new Error("No token");
        const { wsToken } = await res.json();
        console.log("Presence token loaded");
        setToken(wsToken);
      } catch (error) {
        console.error("Failed to load presence token:", error);
      }
    };
    loadToken();
  }, []);

  // Connect when token is available
  useEffect(() => {
    if (token) {
      connect(token);
    }

    return () => {
      clearReconnectTimeout();
      if (wsRef.current) {
        wsRef.current.close(1000, "component unmounting");
      }
    };
  }, [token, connect, clearReconnectTimeout]);

  // Ping to keep connection alive
  useEffect(() => {
    if (connectionState !== "connected") return;

    const pingInterval = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: "PING" }));
      }
    }, 30000);

    return () => clearInterval(pingInterval);
  }, [connectionState]);

  // Request online users refresh
  const refreshOnlineUsers = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "GET_ONLINE_USERS" }));
    }
  }, []);

  return {
    onlineUsers,
    connected: connectionState === "connected",
    connectionState,
    refreshOnlineUsers,
  };
}
