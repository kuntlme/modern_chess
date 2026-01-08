"use client";

import { useEffect, useRef, useState } from "react";

export function useGameSocket(userId: string) {
    const wsRef = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(process.env.WS_URL!);
        wsRef.current = ws;

        ws.onopen = () => setConnected(true);
        ws.onclose = () => setConnected(false);

        return () => {
            ws.close();
        }
    }, [userId]);

    function send(message: unknown) {
        if(wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(message));
        }
    }

    return {send, connected};
}