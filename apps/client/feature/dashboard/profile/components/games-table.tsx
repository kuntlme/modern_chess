"use client";

import Link from "next/link";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { GameWithPlayers } from "../types";

interface Props {
  games: GameWithPlayers[];
  userId: string;
}

export function GamesTable({ games, userId }: Props) {
  const columns: ColumnDef<GameWithPlayers>[] = [
    {
      header: "Opponent",
      cell: ({ row }) => {
        const game = row.original;
        const isWhite = game.whiteId === userId;
        const opponent = isWhite ? game.black : game.white;
        const colorLabel = isWhite ? "White" : "Black";
        const colorIcon = isWhite
          ? "bg-muted text-foreground border-border"
          : "bg-foreground text-background border-border shadow-sm";

        return (
          <Link href={`/dashboard/profile/${opponent.id}`}>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 rounded-full border">
                <AvatarImage src={opponent?.image || ""} />
                <AvatarFallback className="bg-primary/5 text-primary">
                  {opponent?.name?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">
                  {opponent?.name || "Unknown"}
                </span>
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
          </Link>
        );
      },
    },
    {
      header: "Result",
      cell: ({ row }) => {
        const game = row.original;
        const isWhite = game.whiteId === userId;
        const isGameEnded =
          game.status === "ENDED" || game.status === "ABANDONED";

        if (!isGameEnded) {
          return (
            <Badge
              variant="secondary"
              className="bg-secondary/50 border-transparent font-normal"
            >
              In Progress
            </Badge>
          );
        }

        let resultType: "win" | "loss" | "draw" | "abandoned" = "draw";

        if (game.status === "ABANDONED" && !game.winner) {
          resultType = "abandoned";
        } else if (game.winner === "DRAW") {
          resultType = "draw";
        } else if (
          (game.winner === "WHITE" && isWhite) ||
          (game.winner === "BLACK" && !isWhite)
        ) {
          resultType = "win";
        } else if (game.winner) {
          resultType = "loss";
        }

        const resultColors = {
          win: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          loss: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
          draw: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
          abandoned:
            "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
        };

        const labels = {
          win: "Won",
          loss: "Lost",
          draw: "Draw",
          abandoned: "Abandoned",
        };

        const gameResultReason = game.gameResult
          ? game.gameResult.toLowerCase().replace(/_/g, " ")
          : "";

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
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.original.startedAt);
        return (
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-muted-foreground text-xs">
              {date.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: games,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-card overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-muted-foreground h-10"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-muted-foreground h-24 text-center"
              >
                No games played yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
