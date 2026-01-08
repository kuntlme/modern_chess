"use client"
import { useEffect, useRef, useState } from "react";

export function useGameSocket(userId: string) {
    const wsRef = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        console.log("url ", process.env.NEXT_PUBLIC_WS_URL)
        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}?userId=${userId}`);
        wsRef.current = ws;

        ws.onopen = () => setConnected(true);
        ws.onclose = () => setConnected(false);

        return () => {
            ws.close();
        }
    }, [userId]);

    function send(message: unknown) { //TODO: make message type ClientMessage
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