"use client";
import { Button } from "@/components/ui/button";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DataTable from "@/feature/dashboard/components/data-table";
import { cn } from "@/lib/utils";
import { Crown, SquareStack, Star, Table } from "lucide-react";
import Image from "next/image";

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
    <div className="w-full flex flex-col justify-center items-center space-y-5">
      <div
        className="group w-2/3 h-100 flex items-center justify-between
                      bg-linear-to-r from-neutral-800 to-neutral-100
                      rounded-xl shadow-lg hover:shadow-xl
                      transition-all duration-300 overflow-hidden"
      >
        {/* Image section */}
        <div className="w-2/3 h-full">
          <Image
            src="/play_chess.svg"
            alt="Play chess"
            width={140}
            height={140}
            className="h-full w-fit transition-transform duration-300
                       group-hover:scale-105"
          />
        </div>

        {/* Action section */}
        <div
          className="w-1/3 h-full flex flex-col justify-center gap-3
                        backdrop-blur px-3"
        >
          <Button className="text-5xl font-semibold text-neutral-700/90 py-5 h-30 rounded-2xl">
            Play
          </Button>
          <Button
            variant="secondary"
            className="text-3xl font-semibold py-5 h-30 rounded-2xl text-neutral-500 border border-secondary"
          >
            Practice
          </Button>
        </div>
      </div>

      {/* stat */}
      <div className="flex justify-between items-center gap-5 w-2/3">
        {items.map((item, idx) => (
          <div
            className={cn(
              "w-1/3 border flex justify-start items-center gap-5 p-5 rounded-lg",
              "shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]",
            )}
          >
            <div className="flex justify-center items-center">{item.icon}</div>
            <div>
              <p>{item.title}</p>
              <span className="text-2xl font-extrabold text-neutral-800/60">
                {item.amount}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Table  */}
      <div className="w-2/3 border">
        <DataTable />
      </div>
    </div>
  );
};

export default page;
