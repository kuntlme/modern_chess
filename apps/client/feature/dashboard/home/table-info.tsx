"use client";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { CircleUserRound, MoreHorizontal, ScanEye } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type GameList = {
  id: string;
  opponent: {
    id: string;
    name: string | null;
    image: string | null;
    rating: number | null;
  };
  result: "win" | "lose" | "draw" | "abandoned";
  color: "white" | "black";
  duration: string; // "12m 32s"
  ratingChange: number; // +8 / -12
  date: string;
  time: string;
  gameResultReason?: string;
};

export const columns: ColumnDef<GameList>[] = [
  {
    accessorKey: "opponent",
    header: () => (
      <span className="text-muted-foreground font-medium">Opponent</span>
    ),
    cell: ({ row }) => {
      const opponent = row.original.opponent;
      const isWhite = row.original.color === "white";
      const colorLabel = isWhite ? "White" : "Black";
      const colorIcon = isWhite
        ? "bg-muted text-foreground border-border"
        : "bg-foreground text-background border-border shadow-sm";

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 rounded-full border">
            <AvatarImage src={opponent?.image || ""} />
            <AvatarFallback className="bg-primary/5 text-primary">
              {opponent?.name?.[0]?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{opponent?.name || "Unknown"}</span>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="text-muted-foreground mr-1 text-xs">
                {opponent?.rating} ELO
              </span>
              <Badge
                variant="outline"
                className={`inline-flex h-4 items-center justify-center rounded px-1.5 py-0 text-[10px] ${colorIcon}`}
              >
                {colorLabel}
              </Badge>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "result",
    header: () => (
      <span className="text-muted-foreground font-medium">Result</span>
    ),
    cell: ({ row }) => {
      const resultType = row.original.result;
      const gameResultReason = row.original.gameResultReason;

      const resultColors = {
        win: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        lose: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
        draw: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
        abandoned:
          "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      };

      const labels = {
        win: "Won",
        lose: "Lost",
        draw: "Draw",
        abandoned: "Abandoned",
      };

      return (
        <div className="flex flex-col items-start gap-1">
          <Badge
            variant="outline"
            className={`font-medium ${resultColors[resultType]}`}
          >
            {labels[resultType]}
          </Badge>
          {gameResultReason && (
            <span className="text-muted-foreground mt-0.5 text-xs capitalize">
              by {gameResultReason}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "color",
    header: () => <div className="text-muted-foreground">Side</div>,
    cell: ({ row }) => {
      const color = row.original.color;
      return (
        <span
          className={`rounded-md px-2 py-1 text-xs font-medium ${
            color === "white"
              ? "bg-accent text-accent-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          {color}
        </span>
      );
    },
  },
  {
    accessorKey: "ratingChange",
    header: () => <div className="text-muted-foreground">Rating</div>,
    cell: ({ row }) => {
      const change = row.original.ratingChange;
      const positive = change > 0;

      return (
        <span
          className={`text-sm font-semibold ${
            positive ? "text-primary" : "text-destructive"
          }`}
        >
          {positive ? `+${change}` : change}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => (
      <span className="text-muted-foreground font-medium">Date</span>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">{row.original.date}</span>
        <span className="text-muted-foreground text-xs">
          {row.original.time}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-popover border-border">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link
                href={`/game/watch/${row.original.id}`}
                className="flex w-full cursor-pointer items-center"
              >
                <ScanEye className="mr-2 size-4" />
                View Game
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/profile/${row.original.opponent.id}`}
                className="flex w-full cursor-pointer items-center"
              >
                <CircleUserRound className="mr-2 size-4" />
                View Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
