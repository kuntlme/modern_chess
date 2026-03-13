"use client";
import { Dispatch, SetStateAction } from "react";

import { redirect } from "next/navigation";

import {
  AlertCircle,
  ArrowRight,
  Clock,
  Crown,
  Ghost,
  GitFork,
  Handshake,
  RefreshCw,
  RotateCcw,
  Swords,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { GameState } from "@/lib/types";

const gameOverReasonConfig: Record<
  string,
  { icon: React.ReactNode; label: string }
> = {
  CHECKMATE: { icon: <Zap className="h-4 w-4" />, label: "Checkmate" },
  STALEMATE: { icon: <AlertCircle className="h-4 w-4" />, label: "Stalemate" },
  DRAW_BY_REPETITION: {
    icon: <GitFork className="h-4 w-4" />,
    label: "Draw by Repetition",
  },
  DRAW_BY_INSUFFICIENT_MATERIAL: {
    icon: <Ghost className="h-4 w-4" />,
    label: "Insufficient Material",
  },
  DRAW_BY_FIFTY_MOVE_RULE: {
    icon: <RefreshCw className="h-4 w-4" />,
    label: "50-Move Rule",
  },
  RESIGNATION: {
    icon: <AlertCircle className="h-4 w-4" />,
    label: "Resignation",
  },
  TIMEOUT: { icon: <Clock className="h-4 w-4" />, label: "Timeout" },
  ABANDONED: { icon: <AlertCircle className="h-4 w-4" />, label: "Abandoned" },
  DRAW_AGREEMENT: {
    icon: <Handshake className="h-4 w-4" />,
    label: "Draw Agreement",
  },
};

const GameResultCard = ({
  state,
  gameResult,
  initGame,
  setShowGameOver,
}: {
  state: GameState;
  gameResult: "WIN" | "LOSS" | "DRAW";
  initGame: () => false | undefined;
  setShowGameOver: Dispatch<SetStateAction<boolean>>;
}) => {
  console.log(state);
  const resultCfg = {
    WIN: {
      icon: <Crown className="h-7 w-7" />,
      title: "Victory",
      subtitle: "You won this game",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      text: "text-emerald-500",
      badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    },
    LOSS: {
      icon: <Swords className="h-7 w-7" />,
      title: "Defeat",
      subtitle: "Better luck next time",
      border: "border-rose-500/40",
      bg: "bg-rose-500/10",
      text: "text-rose-500",
      badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
    DRAW: {
      icon: <Handshake className="h-7 w-7" />,
      title: "Draw",
      subtitle: "An equal contest",
      border: "border-yellow-500/40",
      bg: "bg-yellow-500/10",
      text: "text-yellow-500",
      badge: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    },
  }[gameResult];
  console.log(resultCfg);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl border-2 p-4 ${resultCfg.border} ${resultCfg.bg}`}
    >
      <div className="flex items-center gap-3">
        <div className={`${resultCfg.text} shrink-0`}>{resultCfg.icon}</div>
        <div className="min-w-0 flex-1">
          <p className={`text-lg leading-tight font-bold ${resultCfg.text}`}>
            {resultCfg.title}
          </p>
          <p className="text-muted-foreground text-xs">{resultCfg.subtitle}</p>
        </div>
        {state.winner && (
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${resultCfg.badge}`}
          >
            {state.winner === "w"
              ? "White wins"
              : state.winner === "b"
                ? "Black wins"
                : "Draw"}
          </span>
        )}
      </div>
      {state.reason && gameOverReasonConfig[state.reason] && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-slate-500/10 px-3 py-2">
          <div className="text-muted-foreground">
            {gameOverReasonConfig[state.reason].icon}
          </div>
          <span className="text-muted-foreground text-xs font-medium">
            {gameOverReasonConfig[state.reason].label}
          </span>
        </div>
      )}
      <div className="mt-3 flex gap-2">
        <Button
          size="sm"
          className="flex-1 gap-1.5 text-xs"
          onClick={() => {
            setShowGameOver(false);
            initGame();
          }}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Play Again
        </Button>
      </div>
    </motion.div>
  );
};

export default GameResultCard;
