"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import dotenv from "dotenv";

import { ClientMessage } from "@/schema/clientMessageSchema";

dotenv.config();

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

export function useGameSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("disconnected");

  const [token, setToken] = useState<string>("");

  // Reconnection state
  const reconnectAttemptRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageHandlerRef = useRef<((msg: MessageEvent) => void) | null>(null);

  // Calculate delay with exponential backoff
  const getReconnectDelay = useCallback((attempt: number) => {
    const delay = RECONNECT_CONFIG.baseDelayMs * Math.pow(2, attempt);
    return Math.min(delay, RECONNECT_CONFIG.maxDelayMs);
  }, []);

  // Clear reconnection timeout
  const clearReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  // Connect to Websocket
  const connect = useCallback(
    (authToken: string) => {
      if (!authToken) return;

      // Clean up existing connection
      if (wsRef.current) {
        wsRef.current.close();
      }

      setConnectionState("connecting");
      console.log("Connecting to WebSocket...", process.env.NEXT_PUBLIC_WS_URL);

      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_WS_URL}?token=${encodeURIComponent(authToken)}`
      );
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
        setConnectionState("connected");
        reconnectAttemptRef.current = 0; // Reset attempt on successful connection
      };

      ws.onclose = (event) => {
        console.log("WebSocket closed:", event.code, event.reason);
        setConnectionState("disconnected");

        // Don't reconnect on intentional close or auth errors
        if (
          event.code === 1000 ||
          event.code === 40001 ||
          event.code === 1000
        ) {
          console.log("Not reconnecting - intentional close or auth error");
          return;
        }

        // Attempt reconnection
        if (reconnectAttemptRef.current < RECONNECT_CONFIG.maxAttempts) {
          const delay = getReconnectDelay(reconnectAttemptRef.current);
          console.log(
            `Reconnecting in ${delay}ms (attempt ${reconnectAttemptRef.current + 1}/${RECONNECT_CONFIG.maxAttempts})`
          );

          setConnectionState("reconnecting");
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptRef.current++;
            connect(authToken);
          }, delay);
        } else {
          console.log("Max reconnection attempts reached");
        }
      };

      ws.onerror = (error) => {
        console.log("WebSocket error", error);
      };

      // Re-attach message handler if one was set
      if (messageHandlerRef.current) {
        ws.onmessage = messageHandlerRef.current;
      }
    },
    [getReconnectDelay]
  );

  // Load token on mount
  useEffect(() => {
    const loadToken = async () => {
      try {
        const res = await fetch("/api/auth/token", { credentials: "include" });
        if (!res.ok) throw new Error("No token");
        const { wsToken } = await res.json();
        console.log("Token loaded");
        setToken(wsToken);
      } catch (error) {
        console.error("Failed to load token", error);
      }
    };
    loadToken();
  }, []);

  // Connect when token is available
  useEffect(() => {
    if (token) {
      connect(token);
      return () => {
        clearReconnectTimeout();
        if (wsRef.current) {
          wsRef.current.close(1000, "Complete unmounting");
        }
      };
    }
  }, [token, connect, clearReconnectTimeout]);

  // Send message
  const send = useCallback((message: ClientMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current?.send(JSON.stringify(message));
      return true;
    }
    console.warn("Cannot send message - WebSocket not connected");
    return false;
  }, []);

  // Set message handler
  const onMessage = useCallback((callback: (msg: MessageEvent) => void) => {
    messageHandlerRef.current = callback;
    if (wsRef.current) {
      wsRef.current.onmessage = callback;
    }
  }, []);

  // Manual reconnect trigger
  const reconnect = useCallback(() => {
    reconnectAttemptRef.current = 0;
    if (token) {
      connect(token);
    }
  }, [token, connect]);

  return {
    send,
    connected: connectionState === "connected",
    connectionState,
    onMessage,
    reconnect,
  };
}
