"use client";
import { useEffect, useRef, useState } from "react";

import { ClientMessage } from "@/schema/clientMessageSchema";

export function useGameSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);

  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const loadToken = async () => {
      const res = await fetch("/api/auth/token");
      if (!res.ok) throw new Error("No token");
      const { wsToken } = await res.json();
      console.log(wsToken);
      setToken(wsToken);
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (token) {
      console.log("url ", process.env.NEXT_PUBLIC_WS_URL);
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_WS_URL}?token=${encodeURIComponent(token)}`
      );
      wsRef.current = ws;

      ws.onopen = () => setConnected(true);
      ws.onclose = () => setConnected(false);

      return () => {
        ws.close();
      };
    }
  }, [token]);

  function send(message: ClientMessage) {
    //TODO: make message type ClientMessage
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  }

  function onMessage(callback: (msg: MessageEvent) => void) {
    if (wsRef.current) {
      wsRef.current.onmessage = callback;
    }
  }

  return { send, connected, onMessage };
}
