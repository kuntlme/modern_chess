"use client";
import Image from "next/image";

import {
  ChartPie,
  Crown,
  SquareStack,
  Star,
  Table,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DataTable from "@/feature/dashboard/components/data-table";
import PlayButton from "@/feature/dashboard/components/play-button";
import { columns, data } from "@/feature/dashboard/home/table-info";
import { usePresence } from "@/hooks/usePresence";
import { cn } from "@/lib/utils";

const page = () => {
  const { onlineUsers, connected } = usePresence();

  const items = [
    {
      title: "Rating",
      amount: 1580,
      icon: <Star className="size-8" />,
      gradient: "from-amber-500 to-orange-600",
      bgGlow: "shadow-amber-500/20",
    },
    {
      title: "Game Played",
      amount: 453,
      icon: <Trophy className="size-8" />,
      gradient: "from-emerald-500 to-teal-600",
      bgGlow: "shadow-emerald-500/20",
    },
    {
      title: "Win Rate",
      amount: "34%",
      icon: <Target className="size-8" />,
      gradient: "from-violet-500 to-purple-600",
      bgGlow: "shadow-violet-500/20",
    },
  ];
  return (
    <div className="flex w-full flex-col items-center justify-start gap-8 py-4">
      {/* Hero Section - Play Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl text-black"
      >
        <div className="group relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-amber-500/10 via-transparent to-emerald-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {/* Glow effect */}
          <div className="absolute -top-20 -right-20 size-72 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="relative flex min-h-70 items-center justify-between p-8">
            {/* Left side - Chess illustration */}
            <div className="relative flex-1">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Image
                  src="/play_chess.svg"
                  alt="Play chess"
                  width={350}
                  height={350}
                  className="drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            </div>

            {/* Right side - Actions */}
            <div className="flex flex-col items-end gap-5">
              <div className="mb-4 text-right">
                <h2 className="mb-2 text-4xl font-bold text-white">
                  Ready to Play?
                </h2>
                <p className="text-lg text-slate-400">
                  Challenge players worldwide
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <PlayButton />
                <Button
                  variant="outline"
                  className="h-14 min-w-50 rounded-2xl border-2 border-slate-600 bg-transparent text-lg font-semibold text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-800 hover:text-white"
                >
                  <Zap className="mr-2 size-5" />
                  Practice
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

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
