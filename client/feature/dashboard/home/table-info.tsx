"use client"
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, CircleUserRound, ScanEye } from "lucide-react";

export const data: GameList[] = [
  {
    opponent: "Kuntl",
    result: "win",
    color: "white",
    date: "2h ago",
  },
  {
    opponent: "Kuntl",
    result: "lose",
    color: "black",
    date: "yesterday",
  },
  {
    opponent: "Kuntl",
    result: "lose",
    color: "black",
    date: "yesterday",
  },
];

export type GameList = {
  opponent: string;
  result: "win" | "lose" | "draw";
  color: "white" | "black";
  date: string;
};

export const columns: ColumnDef<GameList>[] = [
  {
    accessorKey: "opponent",
    header: () => <div>Opponent</div>,
    cell: ({ row }) => <div>{row.getValue("opponent")}</div>,
  },
  {
    accessorKey: "result",
    header: () => <div>Result</div>,
    cell: ({ row }) => <div>{row.getValue<string>("result")}</div>,
  },
  {
    accessorKey: "color",
    header: () => <div>Color</div>,
    cell: ({ row }) => <div>{row.getValue("color")}</div>,
  },
  {
    accessorKey: "date",
    header: () => <div>Date</div>,
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="size-5 cursor-pointer">
              <ArrowRight />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="right">
            <DropdownMenuGroup aria-orientation="vertical">
              <DropdownMenuItem className="bg-primary">
                <ScanEye className="size-4" />
                View Game
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CircleUserRound className="size-4" />
                View Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];