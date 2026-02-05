"use client";

import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Props {
  open: boolean;
  result: "WIN" | "LOSS" | "DRAW";
  winner?: string | null;
  onRestart?: () => void;
}

export function GameOverOverlay({ open, result, winner, onRestart }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="w-90 space-y-4 p-6 text-center">
              <h1
                className={`text-4xl font-extrabold ${
                  result === "WIN"
                    ? "text-emerald-500"
                    : result === "LOSS"
                      ? "text-rose-500"
                      : "text-yellow-500"
                }`}
              >
                {result === "WIN" && "You Win ♟️"}
                {result === "LOSS" && "You Lost"}
                {result === "DRAW" && "Draw"}
              </h1>

              <p className="text-muted-foreground text-sm">
                {winner ? `Winner: ${winner}` : "No winner this game"}
              </p>

              <Separator />

              {onRestart && (
                <Button className="w-full" onClick={onRestart}>
                  Play Again
                </Button>
              )}
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
