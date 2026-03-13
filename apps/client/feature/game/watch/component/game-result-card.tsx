"use client";
import { Dispatch, SetStateAction } from "react";

import {
  AlertCircle,
  Clock,
  Crown,
  Ghost,
  GitFork,
  Handshake,
  RefreshCw,
  RotateCcw,
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
  initGame,
  setShowGameOver,
}: {
  state: GameState;
  initGame: () => false | undefined;
  setShowGameOver: Dispatch<SetStateAction<boolean>>;
}) => {
  const resultCfg =
    state.winner === "w"
      ? {
          icon: <Crown className="h-7 w-7" />,
          title: "White Wins",
          subtitle: "White delivered the victory",
          border: "border-gray-300",
          bg: "bg-gray-100 dark:bg-gray-800",
          text: "text-gray-900 dark:text-white",
        }
      : state.winner === "b"
        ? {
            icon: <Crown className="h-7 w-7" />,
            title: "Black Wins",
            subtitle: "Black delivered the victory",
            border: "border-gray-800",
            bg: "bg-gray-900/10",
            text: "text-gray-900 dark:text-white",
          }
        : {
            icon: <Handshake className="h-7 w-7" />,
            title: "Draw",
            subtitle: "Both players ended equally",
            border: "border-yellow-500/40",
            bg: "bg-yellow-500/10",
            text: "text-yellow-500",
          };

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
          <p className={`text-lg font-bold ${resultCfg.text}`}>
            {resultCfg.title}
          </p>
          <p className="text-muted-foreground text-xs">{resultCfg.subtitle}</p>
        </div>
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
          New Game
        </Button>
      </div>
    </motion.div>
  );
};

export default GameResultCard;
