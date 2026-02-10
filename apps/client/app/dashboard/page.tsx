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
import { Card, CardContent } from "@/components/ui/card";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DataTable from "@/feature/dashboard/components/data-table";
import OnlineUserCard from "@/feature/dashboard/components/online-user-card";
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

      {/* Stats & Online User Row */}
      <div className="flex w-full max-w-5xl gap-6">
        {/* Stats Card */}
        <div className="flex flex-1 gap-4">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              className="flex-1"
            >
              <Card
                className={cn(
                  "absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:scale-110"
                )}
              >
                {/* Glow effect on hover */}
                <div
                  className={cn(
                    "absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10",
                    item.gradient
                  )}
                />

                <CardContent className="relative flex items-center gap-4 p-5">
                  <div
                    className={cn(
                      "rounded-xl bg-linear-to-br p-3 shadow-lg transition-transform duration-300 group-hover:scale-110",
                      item.gradient
                    )}
                  >
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">
                      {item.title}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {item.amount}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content Row */}
      <div className="flex w-full max-w-5xl gap-6">
        {/* Recent Games Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1"
        >
          <Card className="border-0 bg-linear-to-br from-slate-800 to-slate-900 shadow-xl">
            <CardContent className="p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 p-2.5 shadow-lg shadow-blue-500/20">
                  <ChartPie className="size-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-white">
                  Recent Games
                </h2>
              </div>
              <DataTable data={data} columns={columns} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Online Users Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-80"
        >
          <OnlineUserCard users={onlineUsers} connected={connected} />
        </motion.div>
      </div>
    </div>
  );
};

export default page;
