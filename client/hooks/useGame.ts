"use client";

import { gameReducer } from "@/lib/gameReducer";
import { useEffect, useReducer } from "react";
import { useGameSocket } from "./useGameSocket";
import { ServerMessage } from "@/schema/serverMessageSchema";
import { PromotionOption } from "@/schema/clientMessageSchema";

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
    }, [connected]);

    function initGame() {
        if (!connected) return;
        send({ type: "INIT_GAME" });
    }

    function watchGame(gameId: string) {
        if(!connected || !gameId) return;
        send({ 
            type: "WATCH_GAME",
            payload: {
                gameId: gameId,
            }
        })
    }

    function move(from: string, to: string, promotion: PromotionOption) {
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

    return { state, move, initGame, watchGame };
}