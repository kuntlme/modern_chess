import { GameState } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MoveBoard = ({
  moves,
  currentMove,
  setCurrentMove,
}: {
  moves: string[];
  currentMove: number;
  setCurrentMove: React.Dispatch<React.SetStateAction<number>>;
}) => {
  useEffect(() => {
    if (moves.length != 0) {
      setCurrentMove(moves.length - 1);
    }
  }, [moves]);
  useEffect(() => {
    console.log(currentMove);
  }, [currentMove]);

  const pairedMoves: string[][] = [];
  for (let i = 0; i < moves.length; i += 2) {
    pairedMoves.push([moves[i], moves[i + 1]]);
  }
  return (
    <div className="flex flex-col h-full">

      {/* MOVE LIST */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1 text-sm">
        {/* START */}
        <div
          onClick={() => setCurrentMove(-1)}
          className={cn(
            "px-2 py-1 rounded cursor-pointer font-medium text-center border",
            currentMove === -1
              ? "bg-neutral-700 text-white"
              : "text-muted-foreground hover:bg-neutral-800"
          )}
        >
          Start
        </div>

        {/* MOVES */}
        {pairedMoves.map(([white, black], idx) => {
          const whiteIndex = idx * 2;
          const blackIndex = idx * 2 + 1;

          return (
            <div
              key={idx}
              className="grid grid-cols-[28px_1fr_1fr] items-center gap-1"
            >
              {/* MOVE NUMBER */}
              <div className="text-muted-foreground text-xs text-right">
                {idx + 1}.
              </div>

              {/* WHITE MOVE */}
              <div
                onClick={() => setCurrentMove(whiteIndex)}
                className={cn(
                  "px-2 py-1 rounded cursor-pointer border",
                  currentMove === whiteIndex
                    ? "bg-neutral-700 text-white"
                    : "hover:bg-neutral-800"
                )}
              >
                {white}
              </div>

              {/* BLACK MOVE */}
              {black ? (
                <div
                  onClick={() => setCurrentMove(blackIndex)}
                  className={cn(
                    "px-2 py-1 rounded cursor-pointer border",
                    currentMove === blackIndex
                      ? "bg-neutral-700 text-white"
                      : "hover:bg-neutral-800"
                  )}
                >
                  {black}
                </div>
              ) : (
                <div />
              )}
            </div>
          );
        })}
      </div>

      {/* CONTROLS */}
      <div className="flex justify-between items-center pt-3 border-t mt-2">
        <Button
          size="icon"
          variant="outline"
          disabled={currentMove === -1}
          onClick={() => setCurrentMove((m) => m - 1)}
        >
          <ArrowLeft className="size-4" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          disabled={currentMove >= moves.length - 1}
          onClick={() => setCurrentMove((m) => m + 1)}
        >
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default MoveBoard;
