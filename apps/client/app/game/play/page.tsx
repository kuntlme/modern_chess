"use client";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import "dotenv/config";
import { Check, Copy, CopyIcon, Flag, Handshake, Share2 } from "lucide-react";
import { motion } from "motion/react";

import GameBoard from "@/components/chessboard";
import MoveBoard from "@/components/moveboard";
import PromoBoard from "@/components/promoboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import MatchmakingLoader from "@/feature/game/component/finding-players";
import { GameOverOverlay } from "@/feature/game/component/gameover-overlay";
import PlayerCard from "@/feature/game/component/player-card";
import { useGame } from "@/hooks/useGame";
import { PromotionOption } from "@/schema/clientMessageSchema";

export default function GamePage() {
  const session = useSession();
  const { state, move, initGame, connected } = useGame();
  const [currentMove, setCurrentMove] = useState<number>(-1);
  const [isPromotion, setIsPromotion] = useState<boolean>(false);
  const [promoPiece, setPromoPiece] = useState<PromotionOption>("");
  const [showGameOver, setShowGameOver] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pendingMove, setPendingMove] = useState<{
    from: string;
    to: string;
  } | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

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

              {/* Share Button */}
              <Dialog>
                <DialogTrigger>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" /> share
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogDescription>
                    Copy to share with others
                  </DialogDescription>
                  <div className="flex h-11.5 items-center justify-between overflow-hidden rounded-full border px-1">
                    <p className="text-muted-foreground max-w-56 truncate overflow-hidden px-2.5 text-sm">
                      {`${process.env.NEXT_PUBLIC_WEBSITE_URL}/game/watch/${state.gameId}`}
                    </p>
                    <Button
                      size="icon"
                      className="rounded-full"
                      onClick={() => {
                        handleCopy(
                          `${process.env.NEXT_PUBLIC_WEBSITE_URL}/game/watch/${state.gameId}`
                        );
                      }}
                    >
                      {copied === true ? <Check /> : <CopyIcon />}
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

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
                {/* You */}
                <PlayerCard
                  playerId={
                    state.whiteId === session.data?.user.id
                      ? state.whiteId
                      : state.blackId
                  }
                  isTurn={state.yourTurn}
                  isGameOver={state.status === "ENDED"}
                />

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
                <PlayerCard
                  playerId={
                    state.whiteId !== session.data?.user.id
                      ? state.whiteId
                      : state.blackId
                  }
                  isTurn={!state.yourTurn}
                  isGameOver={state.status === "ENDED"}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <PromoBoard isPromotion={isPromotion} setPromoPiece={setPromoPiece} />

      <GameOverOverlay
        user="player"
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
