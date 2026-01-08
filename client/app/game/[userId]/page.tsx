"use client";
import GameBoard from "@/components/chessboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGame } from "@/hooks/useGame";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function GamePage() {
  const params = useParams<{ userId: string }>();
  console.log(params.userId);

  const { state, move, initGame, watchGame } = useGame(params.userId);

  const [gameId, setGameId] = useState<string>("");

  return (
    <main className="w-full h-screen flex min-h-screen items-center justify-center gap-30 bg-neutral-800 border">
      <div className="border border-red-500 w-1/2">
        <GameBoard state={state} sendMove={move} />
      </div>
      <div className="h-full flex flex-col w-1/3 border text-white">
        <p>{state.color}</p>
        <p>{state.fen}</p>
        <p>{state.moves}</p>
        <p>{state.status}</p>
        <p>{state.winner ?? "null"}</p>
        <p>{state.yourTurn ? "yes" : "no"}</p>

        <Button disabled={state.status != "IDLE"} onClick={() => initGame()}>INIT_GAME</Button>
        <Input value={gameId} onChange={(e) => setGameId(e.target.value)}/>
        <Button disabled={state.status != "IDLE"} onClick={() => watchGame(gameId)}>WATCH GAME</Button>
      </div>
    </main>
  );
}
