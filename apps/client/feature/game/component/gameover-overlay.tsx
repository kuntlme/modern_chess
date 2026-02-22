"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Props {
  open: boolean;
  user: "player" | "watcher";
  result: "WIN" | "LOSS" | "DRAW";
  winner?: string | null;
  onRestart?: () => void;
  onClose?: () => void;
}

export function GameOverOverlay({
  open,
  user,
  result,
  winner,
  onRestart,
  onClose,
}: Props) {
  const [countdown, setCountdown] = useState(5);

  // Reset countdown when opened
  useEffect(() => {
    if (open) {
      setCountdown(5);
    }
  }, [open]);

  // Countdown logic
  useEffect(() => {
    if (!open || !onClose) return;

    if (countdown <= 0) {
      onClose();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, open, onClose]);

  const resultConfig = {
    WIN: {
      title: "Victory",
      color: "text-emerald-500",
      ring: "ring-emerald-500/40",
      glow: "shadow-emerald-500/20",
      bar: "bg-emerald-500",
    },
    LOSS: {
      title: "Defeat",
      color: "text-rose-500",
      ring: "ring-rose-500/40",
      glow: "shadow-rose-500/20",
      bar: "bg-rose-500",
    },
    DRAW: {
      title: "Draw",
      color: "text-yellow-500",
      ring: "ring-yellow-500/40",
      glow: "shadow-yellow-500/20",
      bar: "bg-yellow-500",
    },
  };

  const config = resultConfig[result];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            <Card
              className={`relative w-[420px] space-y-6 rounded-2xl border-2 p-8 text-center shadow-2xl ring-2 ${config.ring} ${config.glow}`}
            >
              {/* Close Button */}
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-4 right-4 rounded-full p-2 transition"
                >
                  <X size={18} />
                </button>
              )}

              {/* Title */}
              <div className="space-y-2">
                <h1
                  className={`text-4xl font-extrabold tracking-tight ${user === "player" ? config.color : "text-foreground"}`}
                >
                  {user === "player" ? config.title : "Game finished"}
                </h1>

                <p className="text-muted-foreground text-sm">
                  {winner ? `Winner: ${winner}` : "No winner this game"}
                </p>

                {/* Countdown Text */}
                {onClose && (
                  <p className="text-muted-foreground mt-2 text-xs">
                    Closing in {countdown}s...
                  </p>
                )}
              </div>

              {/* Progress Bar */}
              {onClose && (
                <div className="bg-muted h-1 w-full overflow-hidden rounded-full">
                  <motion.div
                    key={countdown}
                    initial={{ width: "100%" }}
                    animate={{ width: `${(countdown / 5) * 100}%` }}
                    transition={{ duration: 1, ease: "linear" }}
                    className={`h-full ${config.bar}`}
                  />
                </div>
              )}

              <Separator />

              {/* Actions */}
              <div className="flex flex-col gap-3">
                {onRestart && (
                  <Button
                    className="w-full text-base font-semibold"
                    onClick={onRestart}
                  >
                    Play Again
                  </Button>
                )}

                {onClose && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={onClose}
                  >
                    Close Now
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
