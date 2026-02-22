"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { getPlayerById } from "../action/get-player";

type Player = {
  username: string;
  image: string;
  rating: number;
};

const PlayerCard = ({
  playerId,
  isTurn,
  isGameOver,
}: {
  playerId?: string;
  isTurn: boolean;
  isGameOver: boolean;
}) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!playerId) return;

    const fetchPlayer = async () => {
      try {
        setLoading(true);
        const user = (await getPlayerById(playerId)) as Player;
        setPlayer(user);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerId]);

  const active = isTurn && !isGameOver;

  return (
    <div
      className={cn(
        "relative flex items-center gap-4 rounded-xl border-2 p-4 transition-all duration-300",
        active
          ? "border-primary bg-primary/10 shadow-inner"
          : "border-border/50 bg-secondary/40"
      )}
    >
      {/* Turn Indicator */}
      {active && (
        <div className="bg-primary absolute top-0 left-0 h-full w-1 rounded-l-xl" />
      )}

      {/* Avatar */}
      <div className="relative h-14 w-14 overflow-hidden rounded-full border">
        {
          loading ? (
            <div className="bg-muted flex h-full w-full items-center justify-center">
              <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
            </div>
          ) : (
            // player?.image
            // ? (
            //   <Image
            //     src={player.image}
            //     alt={player.username}
            //     fill
            //     className="object-cover"
            //   />
            // ) : (
            <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center text-lg font-bold">
              {player?.username?.[0]?.toUpperCase() ?? "?"}
            </div>
          )
          /* ) */
        }
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <span
          className={cn(
            "text-lg font-semibold tracking-tight",
            active ? "text-primary" : "text-foreground"
          )}
        >
          {player?.username ?? "Loading..."}
        </span>

        <span className="text-muted-foreground text-sm">
          Rating: {player?.rating ?? "--"}
        </span>
      </div>
    </div>
  );
};

export default PlayerCard;
