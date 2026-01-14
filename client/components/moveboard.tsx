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
  currentMove: number | null;
  setCurrentMove: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  useEffect(() => {
    if (moves.length != 0) {
      setCurrentMove(moves.length - 1);
    }
  }, [moves]);
  useEffect(() => {
    console.log(currentMove);
  }, [currentMove]);
  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex flex-wrap w-full justify-between items-center gap-2 flex-6">
        <div
          className={cn(
            currentMove != null && currentMove == -1 ? "bg-neutral-700" : "",
            "p-2 rounded-lg cursor-pointer"
          )}
          onClick={() => setCurrentMove(-1)}
        >
          S
        </div>
        {Array.isArray(moves) &&
          moves.map((move, idx) => {
            return (
              <div
                key={idx.toString()}
                className={cn(
                  currentMove != null && idx === currentMove
                    ? "bg-neutral-700"
                    : "",
                  "p-2 rounded-lg cursor-pointer"
                )}
                onClick={() => setCurrentMove(idx)}
              >
                {move}
              </div>
            );
          })}
      </div>
      <div className="flex justify-between items-center">
        <Button
          disabled={currentMove === null || currentMove === -1}
          onClick={() => currentMove != null && setCurrentMove(currentMove - 1)}
        >
          <ArrowLeft className="size-5" />
        </Button>
        <Button
          disabled={currentMove === null || currentMove === moves.length - 1}
          onClick={() => currentMove != null && setCurrentMove(currentMove + 1)}
        >
          <ArrowRight className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default MoveBoard;
