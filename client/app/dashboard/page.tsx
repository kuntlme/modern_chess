"use client";
import Image from "next/image";

import { ChartPie, Crown, SquareStack, Star, Table } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DataTable from "@/feature/dashboard/components/data-table";
import PlayButton from "@/feature/dashboard/components/play-button";
import { columns, data } from "@/feature/dashboard/home/table-info";
import { cn } from "@/lib/utils";

const page = () => {
  const items = [
    {
      title: "Rating",
      amount: 1580,
      icon: <Star className="size-10 text-red-500" />,
    },
    {
      title: "Game Played",
      amount: 453,
      icon: <SquareStack className="size-10 text-green-600" />,
    },
    {
      title: "Win Rate",
      amount: "34 %",
      icon: <Crown className="size-10 text-purple-600" />,
    },
  ];
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-5">
      <div className="group flex h-100 w-2/3 items-center justify-between overflow-hidden rounded-xl bg-linear-to-r from-neutral-800 to-neutral-100 shadow-lg transition-all duration-300 hover:shadow-xl">
        {/* Image section */}
        <div className="h-full w-2/3">
          <Image
            src="/play_chess.svg"
            alt="Play chess"
            width={140}
            height={140}
            className="h-full w-fit transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Action section */}
        <div className="flex h-full w-1/3 flex-col justify-center gap-3 px-3 backdrop-blur">
          <PlayButton />
          <Button
            variant="secondary"
            className="border-secondary h-30 rounded-2xl border py-5 text-3xl font-semibold text-neutral-500"
          >
            Practice
          </Button>
        </div>
      </div>

      {/* stat */}
      <div className="flex w-2/3 items-center justify-between gap-5">
        {items.map((item, idx) => (
          <div
            className={cn(
              "flex w-1/3 items-center justify-start gap-5 rounded-lg border p-5",
              "shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
            )}
          >
            <div className="flex items-center justify-center">{item.icon}</div>
            <div>
              <p>{item.title}</p>
              <span className="text-2xl font-extrabold text-neutral-800/60">
                {item.amount}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="w-2/3 pt-10">
        <div className="flex w-full items-center justify-start gap-2">
          <ChartPie className="size-6 text-neutral-500" strokeWidth={"2px"} />
          <h2 className="text-2xl font-semibold text-neutral-500">
            Resent Games
          </h2>
        </div>
        {/* Table  */}
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default page;
