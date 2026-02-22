"use client";

import React, { useEffect, useMemo } from "react";

import {
  ArrowLeft,
  ArrowRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

const MoveBoard = ({
  moves,
  currentMove,
  setCurrentMove,
}: {
  moves: string[];
  currentMove: number;
  setCurrentMove: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // Snap to latest move when moves change
  useEffect(() => {
    if (moves.length) {
      setCurrentMove(moves.length - 1);
    }
  }, [moves, setCurrentMove]);

  // Pair white/black moves
  const pairedMoves = useMemo(() => {
    const result: string[][] = [];
    for (let i = 0; i < moves.length; i += 2) {
      result.push([moves[i], moves[i + 1]]);
    }
    return result;
  }, [moves]);

  const goStart = () => setCurrentMove(-1);
  const goEnd = () => setCurrentMove(moves.length - 1);
  const goPrev = () => setCurrentMove((m) => m - 1);
  const goNext = () => setCurrentMove((m) => m + 1);

  return (
    <div className="bg-card flex h-[420px] flex-col overflow-hidden rounded-xl border">
      {/* HEADER */}
      <div className="bg-muted/40 text-muted-foreground grid grid-cols-[32px_1fr_1fr] border-b px-3 py-2 text-xs font-semibold">
        <div>#</div>
        <div>White</div>
        <div>Black</div>
      </div>

      {/* MOVE LIST */}
      <div className="flex-1 overflow-y-auto px-2 py-2 text-sm">
        {moves.length === 0 && (
          <div className="text-muted-foreground flex h-full items-center justify-center">
            No moves yet
          </div>
        )}

        {/* START POSITION */}
        <div
          onClick={goStart}
          className={cn(
            "mb-2 cursor-pointer rounded-md px-3 py-2 text-center text-sm font-medium transition-colors",
            currentMove === -1
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          Initial Position
        </div>

        {pairedMoves.map(([white, black], idx) => {
          const whiteIndex = idx * 2;
          const blackIndex = idx * 2 + 1;

          return (
            <div
              key={idx}
              className="hover:bg-muted/50 grid grid-cols-[32px_1fr_1fr] items-center rounded-md px-2 py-1 transition-colors"
            >
              {/* MOVE NUMBER */}
              <div className="text-muted-foreground text-right text-xs">
                {idx + 1}.
              </div>

              {/* WHITE MOVE */}
              <div
                onClick={() => setCurrentMove(whiteIndex)}
                className={cn(
                  "cursor-pointer rounded px-2 py-1 transition-colors",
                  currentMove === whiteIndex
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-muted"
                )}
              >
                {white}
              </div>

              {/* BLACK MOVE */}
              <div
                onClick={() => black && setCurrentMove(blackIndex)}
                className={cn(
                  "cursor-pointer rounded px-2 py-1 transition-colors",
                  currentMove === blackIndex
                    ? "bg-primary/20 text-primary font-medium"
                    : black
                      ? "hover:bg-muted"
                      : ""
                )}
              >
                {black ?? ""}
              </div>
            </div>
          );
        })}
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-between border-t px-4 py-3">
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            disabled={currentMove === -1}
            onClick={goStart}
          >
            <ChevronsLeft className="size-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            disabled={currentMove === -1}
            onClick={goPrev}
          >
            <ArrowLeft className="size-4" />
          </Button>
        </div>

        <div className="text-muted-foreground text-xs">
          {currentMove === -1
            ? "Start"
            : `${currentMove + 1} / ${moves.length}`}
        </div>

        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            disabled={currentMove >= moves.length - 1}
            onClick={goNext}
          >
            <ArrowRight className="size-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            disabled={currentMove >= moves.length - 1}
            onClick={goEnd}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoveBoard;
