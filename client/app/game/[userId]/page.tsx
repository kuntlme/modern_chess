"use client";
import GameBoard from "@/components/chessboard";
import MoveBoard from "@/components/moveboard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGame } from "@/hooks/useGame";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PromoBoard from "@/components/promoboard";
import { PromotionOption } from "@/schema/clientMessageSchema";

export default function GamePage() {
  const params = useParams<{ userId: string }>();
  console.log(params.userId);

  const { state, move, initGame, watchGame } = useGame(params.userId);

  const [gameOverShown, setGameOverShown] = useState<boolean>(false);

  const [currentMove, setCurrentMove] = useState<number>(-1);

  const [isPromotion, setIsPromotion] = useState<boolean>(false);

  const [promoPiece, setPromoPiece] = useState<PromotionOption>("");

  const [pendingMove, setPendingMove] = useState<{
    from: string;
    to: string;
  } | null>(null);

  // update game over ui
  useEffect(() => {
    if (state.status === "ENDED" && !gameOverShown) {
      setGameOverShown(true);
    }
  }, [state, gameOverShown]);

  const [gameId, setGameId] = useState<string>("");

  const handlePromotionRequired = (from: string, to: string) => {
    setPendingMove({ from, to });
    setIsPromotion(true);
  };

  useEffect(() => {
    if (promoPiece && pendingMove) {
      move(pendingMove.from, pendingMove.to, promoPiece);
      setPendingMove(null);
      setPromoPiece("");
      setIsPromotion(false);
    }
  }, [promoPiece]);

  return (
    <main className="w-full h-screen flex min-h-screen items-center justify-center gap-30 bg-neutral-800 border">
      <PromoBoard isPromotion={isPromotion} setPromoPiece={setPromoPiece} />
      <Dialog open={gameOverShown} onOpenChange={setGameOverShown}>
        <DialogContent>
          <h1>Game Over</h1>
          <p>Winner: {state.winner ?? "NONE"}</p>
        </DialogContent>
      </Dialog>
      <div className="border border-red-500 w-1/2">
        <GameBoard
          state={state}
          sendMove={move}
          currentMove={currentMove}
          onPromotionRequired={handlePromotionRequired}
        />
      </div>
      <div className="h-full flex flex-col gap-3 w-1/3 border text-white p-5">
        <p>color: {state.color}</p>
        <p>{state.fen}</p>
        <p>moves: {state.moves}</p>
        <p>status: {state.status}</p>
        <p>winner: {state.winner ?? "null"}</p>
        <p>yourTurn: {state.yourTurn ? "yes" : "no"}</p>

        <Button disabled={state.status != "IDLE"} onClick={() => initGame()}>
          INIT_GAME
        </Button>
        <Input value={gameId} onChange={(e) => setGameId(e.target.value)} />
        <Button
          disabled={state.status != "IDLE"}
          onClick={() => watchGame(gameId)}
        >
          WATCH GAME
        </Button>
        <div>
          <MoveBoard
            moves={state.moves}
            currentMove={currentMove}
            setCurrentMove={setCurrentMove}
          />
        </div>
      </div>
    </main>
  );
}
