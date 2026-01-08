"use client";
import GameBoard from "@/components/chessboard";
import { Button } from "@/components/ui/button";
import { useGame } from "@/hooks/useGame";
import { useParams } from "next/navigation";

export default function GamePage() {
  const params = useParams<{ userId: string }>();
  console.log(params.userId);
  const { state, move } = useGame(params.userId);

  return (
    <main className="w-full h-screen flex min-h-screen items-center justify-center gap-30 bg-neutral-800 border">
      {/* <pre className="text-white">{JSON.stringify(state)}</pre> */}
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

        <Button disabled={state.status != "IDLE"}>Play</Button>
      </div>
    </main>
  );
}
