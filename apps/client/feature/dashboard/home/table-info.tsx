"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, CircleUserRound, ScanEye } from "lucide-react";

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
  opponent: string;
  result: "win" | "lose" | "draw";
  color: "white" | "black";
  duration: string; // "12m 32s"
  ratingChange: number; // +8 / -12
  date: string;
};

export const columns: ColumnDef<GameList>[] = [
  {
    accessorKey: "opponent",
    header: () => <div className="text-muted-foreground">Opponent</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-medium">
        <CircleUserRound className="text-muted-foreground size-4" />
        {row.original.opponent}
      </div>
    ),
  },
  {
    accessorKey: "result",
    header: () => <div className="text-muted-foreground">Result</div>,
    cell: ({ row }) => {
      const result = row.original.result;

      const styles =
        result === "win"
          ? "bg-primary/15 text-primary"
          : result === "lose"
            ? "bg-destructive/15 text-destructive"
            : "bg-muted text-muted-foreground";

      return (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${styles}`}
        >
          {result}
        </span>
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
    header: () => <div className="text-muted-foreground">Date</div>,
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">{row.original.date}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <ArrowRight className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-popover border-border">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <ScanEye className="mr-2 size-4" />
              View Game
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CircleUserRound className="mr-2 size-4" />
              View Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
