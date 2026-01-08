"use client";

import { gameReducer } from "@/lib/gameReducer";
import { useEffect, useReducer } from "react";
import { useGameSocket } from "./useGameSocket";
import { ServerMessage } from "@/schema/serverMessageSchema";

export function useGame(userId: string) {
    const [state, dispatch] = useReducer(gameReducer, {
        status: "IDLE",
        moves: [],
        yourTurn: false,
    })

    const { send, connected, onMessage } = useGameSocket(userId);

    useEffect(() => {
        if (!connected) return;

        onMessage((event: MessageEvent) => {
            const message: ServerMessage = JSON.parse(event.data);
            dispatch(message);
        })

        send({ type: "INIT_GAME" });
    }, [connected]);

    function move(from: string, to: string, promotion: string = "") {
        if (!state.yourTurn) return;

        send({
            type: "MOVE",
            payload: {
                from,
                to,
                promotion
            }
        })
    }

    return { state, move };
}