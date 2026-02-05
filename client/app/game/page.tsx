"use client";
import GameBoard from "@/components/chessboard";
import MoveBoard from "@/components/moveboard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGame } from "@/hooks/useGame";
import { useEffect, useState } from "react";
import PromoBoard from "@/components/promoboard";
import { PromotionOption } from "@/schema/clientMessageSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Share2 } from "lucide-react";
import { GameTopBar } from "@/feature/game/component/gametopbar";

export default function GamePage() {
  const { state, move, initGame, watchGame } = useGame();

  const [watchDialog, setWatchDialog] = useState(false);

  const [showGameOver, setShowGameOver] = useState<boolean>(false);

  const [currentMove, setCurrentMove] = useState<number>(-1);

  const [isPromotion, setIsPromotion] = useState<boolean>(false);

  const [promoPiece, setPromoPiece] = useState<PromotionOption>("");

  const [pendingMove, setPendingMove] = useState<{
    from: string;
    to: string;
  } | null>(null);

  const hasMoves = Array.isArray(state.moves) && state.moves.length > 0;

  // update game over ui
  useEffect(() => {
    if (state.status === "ENDED" && !showGameOver) {
      setShowGameOver(true);
    }
  }, [state, showGameOver]);

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
    <div className="h-screen max-h-screen w-full bg-background flex flex-col">
      {/* TOP BAR */}
      {state.status !== "IDLE" && (
        <GameTopBar
          white="Player One"
          black="Player Two"
          yourColor={state.color}
          status={state.status}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex flex-1 gap-6 px-6 justify-center w-full">
        <div className="flex justify-center w-full">
        {/* BOARD */}
        <div className="flex flex-1 items-center justify-center p-2">
          {state.status === "IDLE" ? (
            <Card className="w-90 p-6 space-y-4">
              <Button className="w-full" onClick={initGame}>
                Start Game
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setWatchDialog(true)}
              >
                Watch Game
              </Button>
            </Card>
          ) : (
            <Card className="p-0.5 flex justify-center h-full">
              <CardContent>
                <GameBoard
                  state={state}
                  sendMove={move}
                  currentMove={currentMove}
                  onPromotionRequired={(from, to) => {
                    setPendingMove({ from, to });
                    setIsPromotion(true);
                  }}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT PANEL (ONLY WHEN GAME STARTS) */}
        {state.status !== "IDLE" && (
          <div className="flex-1 flex items-center justify-center max-h-full p-2 w-1/3">
            <Card className="flex flex-col w-80 h-full overflow-y-auto">
              <CardContent className="flex flex-col gap-4 p-4">
                {hasMoves && (
                  <>
                    <h3 className="font-extrabold text-4xl text-center">Moves</h3>
                    <Separator className="my-2" />
                    <MoveBoard
                      moves={state.moves}
                      currentMove={currentMove}
                      setCurrentMove={setCurrentMove}
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        </div>
      </div>

      {/* PROMOTION */}
      <PromoBoard isPromotion={isPromotion} setPromoPiece={setPromoPiece} />

      {/* GAME OVER */}
      <Dialog open={showGameOver} onOpenChange={setShowGameOver}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Game Over</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Winner: {state.winner ?? "Draw"}
          </p>
        </DialogContent>
      </Dialog>

      {/* WATCH GAME DIALOG */}
      <Dialog open={watchDialog} onOpenChange={setWatchDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Watch Game</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Enter Game ID"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />

          <Button
            className="mt-4"
            onClick={() => {
              watchGame(gameId);
              setWatchDialog(false);
            }}
          >
            Watch
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
