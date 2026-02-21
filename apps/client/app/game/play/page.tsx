"use client";
import { useEffect, useState } from "react";

import { Flag, Handshake, Share2 } from "lucide-react";
import { motion } from "motion/react";

import GameBoard from "@/components/chessboard";
import MoveBoard from "@/components/moveboard";
import PromoBoard from "@/components/promoboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import MatchmakingLoader from "@/feature/game/component/finding-players.";
import { GameOverOverlay } from "@/feature/game/component/gameover-overlay";
import { useGame } from "@/hooks/useGame";
import { PromotionOption } from "@/schema/clientMessageSchema";

export default function GamePage() {
  const { state, move, initGame, connected } = useGame();
  const [currentMove, setCurrentMove] = useState<number>(-1);
  const [isPromotion, setIsPromotion] = useState<boolean>(false);
  const [promoPiece, setPromoPiece] = useState<PromotionOption>("");
  const [showGameOver, setShowGameOver] = useState(false);
  const [pendingMove, setPendingMove] = useState<{
    from: string;
    to: string;
  } | null>(null);

  useEffect(() => {
    if (connected) initGame();
  }, [connected]);

  useEffect(() => {
    if (promoPiece && pendingMove) {
      move(pendingMove.from, pendingMove.to, promoPiece);
      setPendingMove(null);
      setPromoPiece("");
      setIsPromotion(false);
    }
  }, [promoPiece]);

  useEffect(() => {
    if (state.status === "ENDED") {
      setShowGameOver(true);
    }
  }, [state.status]);

  const isGameOver = state.status === "ENDED";
  const gameResult = !isGameOver
    ? null
    : !state.winner
      ? "DRAW"
      : state.winner === state.color
        ? "WIN"
        : "LOSS";

  return (
    <div className="bg-background flex h-screen w-full flex-col overflow-hidden p-4 md:p-8">
      <div className="mx-auto flex h-full w-full max-w-7xl gap-8">
        {/* LEFT: GAME BOARD CONTAINER */}
        <div className="flex flex-2 items-center justify-center">
          {state.status === "IDLE" ? (
            <MatchmakingLoader />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border-primary/20 aspect-square w-full max-w-[85vh] overflow-hidden rounded-lg border-4 shadow-2xl"
            >
              <GameBoard
                state={state}
                sendMove={move}
                currentMove={currentMove}
                onPromotionRequired={(from, to) => {
                  setPendingMove({ from, to });
                  setIsPromotion(true);
                }}
              />
            </motion.div>
          )}
        </div>

        {/* RIGHT: SIDE PANEL */}
        {state.status !== "IDLE" && (
          <div className="flex max-w-[400px] min-w-[340px] flex-1 flex-col">
            {/* Action Bar (Top Right in image) */}
            <div className="mb-4 flex justify-end gap-2">
              <Badge variant={"default"} className="my-auto h-fit">
                {connected ? "connected" : "connecting..."}
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" /> share
              </Button>
              <Button variant="outline" size="sm">
                Request for draw
              </Button>
              <Button variant="destructive" size="sm">
                Resign
              </Button>
            </div>

            {/* Game Info Card */}
            <Card className="border-primary/10 flex flex-1 flex-col overflow-hidden border-2 shadow-lg">
              <CardContent className="flex flex-1 flex-col space-y-6 p-6">
                {/* Player 1 (Opponent) */}
                <div className="bg-secondary/40 border-border/50 hover:bg-secondary/60 flex h-32 w-full flex-col items-center justify-center rounded-xl border-2 transition-all">
                  <span className="text-2xl font-bold tracking-tight opacity-70">
                    player 1
                  </span>
                </div>

                {/* Moves Section */}
                <div className="flex flex-1 flex-col overflow-hidden">
                  <div className="mb-2 flex items-center justify-between px-2">
                    <span className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
                      Moves
                    </span>
                  </div>
                  <Separator />
                  <div className="flex-1 overflow-y-auto py-4">
                    <MoveBoard
                      moves={state.moves}
                      currentMove={currentMove}
                      setCurrentMove={setCurrentMove}
                    />
                  </div>
                </div>

                {/* Player 2 (You) */}
                <div className="bg-primary/10 border-primary/20 flex h-32 w-full flex-col items-center justify-center rounded-xl border-2 shadow-inner">
                  <span className="text-primary text-2xl font-bold tracking-tight">
                    player 2
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <PromoBoard isPromotion={isPromotion} setPromoPiece={setPromoPiece} />

      <GameOverOverlay
        open={showGameOver}
        result={gameResult!}
        winner={state.winner}
        onRestart={() => {
          setShowGameOver(false);
          initGame();
        }}
        onClose={() => setShowGameOver(false)}
      />
    </div>
  );
}
