"use client";
import GameBoard from "@/components/chessboard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
      <Dialog open={state.status === "ENDED"}>
        <DialogContent>
            <h1>Game Over</h1>
            <p>Winner: {state.winner ?? "NONE"}</p>
        </DialogContent>
      </Dialog>
      <div className="border border-red-500 w-1/2">
        <GameBoard state={state} sendMove={move} />
      </div>
      <div className="h-full flex flex-col w-1/3 border text-white">
        <p>color: {state.color}</p>
        <p>{state.fen}</p>
        <p>moves: {state.moves}</p>
        <p>status: {state.status}</p>
        <p>winner: {state.winner ?? "null"}</p>
        <p>yourTurn: {state.yourTurn ? "yes" : "no"}</p>

        <Button disabled={state.status != "IDLE"} onClick={() => initGame()}>INIT_GAME</Button>
        <Input value={gameId} onChange={(e) => setGameId(e.target.value)}/>
        <Button disabled={state.status != "IDLE"} onClick={() => watchGame(gameId)}>WATCH GAME</Button>
      </div>
    </main>
  );
}
