"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Crown,
  Handshake,
  LayoutDashboard,
  RotateCcw,
  Swords,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Props {
  open: boolean;
  user: "player" | "watcher";
  result: "WIN" | "LOSS" | "DRAW";
  winner?: string | null;
  reason?: string;
  onRestart?: () => void;
  onClose?: () => void;
}

const RESULT_CONFIG = {
  WIN: {
    icon: Crown,
    emoji: "🏆",
    title: "Victory!",
    subtitle: "Magnificent play — you won!",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    border: "border-emerald-500/30",
    ring: "ring-emerald-500/20",
    color: "text-emerald-500",
    bar: "bg-emerald-500",
    badge:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20",
  },
  LOSS: {
    icon: Swords,
    emoji: "⚔️",
    title: "Defeat",
    subtitle: "A tough battle — better luck next time.",
    gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
    border: "border-rose-500/30",
    ring: "ring-rose-500/20",
    color: "text-rose-500",
    bar: "bg-rose-500",
    badge:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/20",
  },
  DRAW: {
    icon: Handshake,
    emoji: "🤝",
    title: "Draw",
    subtitle: "Well fought — an even contest.",
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    border: "border-amber-500/30",
    ring: "ring-amber-500/20",
    color: "text-amber-500",
    bar: "bg-amber-500",
    badge:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20",
  },
} as const;

export function GameOverOverlay({
  open,
  user,
  result,
  winner,
  reason,
  onRestart,
  onClose,
}: Props) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (open) setCountdown(5);
  }, [open]);

  useEffect(() => {
    if (!open || !onClose) return;
    if (countdown <= 0) {
      onClose();
      return;
    }
    const t = setTimeout(() => setCountdown((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, open, onClose]);

  const cfg = RESULT_CONFIG[result];
  if (!cfg) return null;
  const Icon = cfg.icon;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative z-10 w-[400px] max-w-[calc(100vw-2rem)]"
          >
            <div
              className={`bg-card relative overflow-hidden rounded-2xl border-2 shadow-2xl ring-1 ${cfg.border} ${cfg.ring}`}
            >
              {/* Gradient backdrop inside card */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${cfg.gradient} opacity-60`}
              />

              {/* Close button */}
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-3 right-3 z-10 rounded-full p-1.5 transition"
                >
                  <X size={16} />
                </button>
              )}

              <div className="relative space-y-5 p-7">
                {/* Icon + Title */}
                <div className="flex flex-col items-center gap-3 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                      delay: 0.1,
                    }}
                    className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${cfg.border} bg-background shadow-md`}
                  >
                    <Icon
                      className={`h-8 w-8 ${cfg.color}`}
                      strokeWidth={1.75}
                    />
                  </motion.div>

                  <div className="space-y-1">
                    <h1
                      className={`text-3xl font-extrabold tracking-tight ${user === "player" ? cfg.color : "text-foreground"}`}
                    >
                      {user === "player" ? cfg.title : "Game Over"}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                      {user === "player" ? cfg.subtitle : "The game has ended."}
                    </p>
                  </div>
                </div>

                {/* Winner badge */}
                {winner && (
                  <div className="flex justify-center">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cfg.badge}`}
                    >
                      <span>{cfg.emoji}</span>
                      {winner === "w"
                        ? "White wins"
                        : winner === "b"
                          ? "Black wins"
                          : "Draw"}
                    </span>
                  </div>
                )}

                {/* Countdown progress */}
                {onClose && (
                  <div className="space-y-1.5">
                    <div className="bg-muted h-1 w-full overflow-hidden rounded-full">
                      <motion.div
                        key={countdown}
                        initial={{ width: "100%" }}
                        animate={{ width: `${(countdown / 5) * 100}%` }}
                        transition={{ duration: 1, ease: "linear" }}
                        className={`h-full ${cfg.bar}`}
                      />
                    </div>
                    <p className="text-muted-foreground text-center text-[11px]">
                      Auto-closing in {countdown}s
                    </p>
                  </div>
                )}

                <Separator />

                {/* Actions */}
                <div className="flex flex-col gap-2.5">
                  {onRestart && (
                    <Button
                      className="w-full gap-2 font-semibold"
                      onClick={onRestart}
                    >
                      <RotateCcw className="h-4 w-4" />
                      Play Again
                    </Button>
                  )}
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      Back to Dashboard
                    </Link>
                  </Button>
                  {onClose && (
                    <button
                      onClick={onClose}
                      className="text-muted-foreground hover:text-foreground text-center text-xs transition"
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
