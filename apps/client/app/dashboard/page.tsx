"use client";

import Image from "next/image";

import { ChartPie, Star, Target, Trophy, Zap } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DataTable from "@/feature/dashboard/components/data-table";
import OnlineUserCard from "@/feature/dashboard/components/online-user-card";
import PlayButton from "@/feature/dashboard/components/play-button";
import { columns, data } from "@/feature/dashboard/home/table-info";
import { usePresence } from "@/hooks/usePresence";

const Page = () => {
  const { onlineUsers, connected } = usePresence();

  const items = [
    {
      title: "Rating",
      amount: 1580,
      icon: <Star className="size-6" />,
    },
    {
      title: "Games Played",
      amount: 453,
      icon: <Trophy className="size-6" />,
    },
    {
      title: "Win Rate",
      amount: "34%",
      icon: <Target className="size-6" />,
    },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-10 py-10">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl"
      >
        <Card className="bg-card shadow-lg">
          <CardContent className="flex min-h-[280px] items-center justify-between p-10">
            {/* Left Illustration */}
            <div className="flex-1">
              <Image
                src="/play_chess.svg"
                alt="Play chess"
                width={320}
                height={320}
                className="opacity-90"
              />
            </div>

            {/* Right Content */}
            <div className="flex flex-col items-end gap-6 text-right">
              <div>
                <h2 className="text-foreground font-serif text-4xl font-semibold">
                  Ready to Play?
                </h2>
                <p className="text-muted-foreground mt-2">
                  Challenge players worldwide and improve your strategy.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <PlayButton />

                <Button
                  variant="secondary"
                  className="h-14 rounded-xl px-8 text-base font-medium"
                >
                  <Zap className="mr-2 size-4" />
                  Practice
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* STATS SECTION */}
      <div className="flex w-full max-w-5xl gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex-1"
          >
            <Card className="bg-card shadow-md">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-primary/10 text-primary rounded-lg p-3">
                  {item.icon}
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">{item.title}</p>
                  <p className="text-foreground text-2xl font-semibold">
                    {item.amount}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex w-full max-w-5xl gap-6">
        {/* Recent Games */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1"
        >
          <Card className="bg-card shadow-md">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 text-primary rounded-md p-2">
                  <ChartPie className="size-4" />
                </div>
                <h2 className="font-serif text-lg font-semibold">
                  Recent Games
                </h2>
              </div>

              <DataTable data={data} columns={columns} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Online Users */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-80"
        >
          <OnlineUserCard users={onlineUsers} connected={connected} />
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
