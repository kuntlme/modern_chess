import React, { useEffect, useState } from "react";

import { Circle, Clock, Gamepad2, User, Users } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { OnlineUser } from "@/schema/serverMessageSchema";

interface OnlineUserCardProps {
  users: OnlineUser[];
  connected: boolean;
}

const statusConfig = {
  online: {
    color: "bg-emerald-500",
    label: "Online",
    icon: Circle,
  },
  in_game: {
    color: "bg-amber-500",
    label: "In Game",
    icon: Gamepad2,
  },
  idle: {
    color: "bg-gray-400",
    label: "Away",
    icon: Clock,
  },
};

const OnlineUserCard = ({ users, connected }: OnlineUserCardProps) => {
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [inGameCount, setInGameCount] = useState<number>(0);

  useEffect(() => {
    setOnlineCount(() => users.filter((u) => u.status === "online").length);
    setInGameCount(() => users.filter((u) => u.status === "in_game").length);
    console.log("enter");
    console.log(users);
  }, [users, connected]);
  return (
    <Card className="overflow-hidden border-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
      <CardHeader className="border-b border-slate-700/50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 p-2.5 shadow-lg shadow-emerald-500/20">
              <Users className="size-5" />
            </div>
            <span className="text-lg font-semibold">Online Players</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "size-2.5 rounded-full transition-colors",
                connected
                  ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                  : "bg-red-400"
              )}
            />
            <span className="text-sm text-slate-400">
              {connected ? "Live" : "Connecting..."}
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-b flex gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-slate-700/40 px-3 py-1.5">
            <Circle className="size-3 fill-emerald-400 text-emerald-400" />
            <span className="text-sm text-slate-300">{onlineCount} online</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-700/40 px-3 py-1.5">
            <Gamepad2 className="size-3 text-amber-400" />
            <span className="text-sm text-slate-300">
              {inGameCount} playing
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="max-h-75 overflow-y-auto p-0">
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <Users className="mb-3 size-12 opacity-30" />
            <p className="text-sm">No other players online</p>
            <p className="text-xs text-slate-600">
              Be the first to start a game!
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-700/30">
            <AnimatePresence mode="popLayout">
              {users.map((user, index) => {
                const config = statusConfig[user.status];
                const StatusIcon = config.icon;

                return (
                  <motion.li
                    key={user.id}
                    initial={{ opacity: 1, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-slate-700/20"
                  >
                    {/* Avatar with status indicator */}
                    <div className="relative">
                      <Avatar className="flex size-10 items-center justify-center bg-linear-to-br from-slate-600 to-slate-700 ring-2 ring-slate-600/50 transition-all group-hover:ring-slate-500/50">
                        <User className="size-5 text-slate-300" />
                      </Avatar>
                      <div
                        className={cn(
                          "absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-2 border-slate-900",
                          config.color
                        )}
                      />
                    </div>

                    {/* User Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-200 group-hover:text-white">
                        Player #{user.id.slice(-6)}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <StatusIcon className="size-3" />
                        <span>{config.label}</span>
                      </div>
                    </div>

                    {/* Status badge */}
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-0 text-xs font-medium",
                        user.status === "online" &&
                          "bg-emerald-500/10 text-emerald-400",
                        user.status === "in_game" &&
                          "bg-amber-500/10 text-amber-400",
                        user.status === "idle" &&
                          "bg-slate-500/10 text-slate-400"
                      )}
                    >
                      {config.label}
                    </Badge>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default OnlineUserCard;
