"use client";

import React, { useEffect, useState } from "react";

import { Circle, Clock, Gamepad2, User, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePresence } from "@/hooks/usePresence";
import { cn } from "@/lib/utils";
import { OnlineUser } from "@/schema/serverMessageSchema";

interface OnlineUserCardProps {
  users: OnlineUser[];
  connected: boolean;
}

const statusConfig = {
  online: {
    color: "bg-primary",
    label: "Online",
    icon: Circle,
  },
  in_game: {
    color: "bg-chart-2",
    label: "In Game",
    icon: Gamepad2,
  },
  idle: {
    color: "bg-muted-foreground",
    label: "Away",
    icon: Clock,
  },
};

const OnlineUserCard = () => {
  const { onlineUsers: users, connected } = usePresence();
  const [onlineCount, setOnlineCount] = useState(0);
  const [inGameCount, setInGameCount] = useState(0);

  useEffect(() => {
    setOnlineCount(users.filter((u) => u.status != "idle").length);
    setInGameCount(users.filter((u) => u.status === "in_game").length);
  }, [users]);

  return (
    <Card className="border-border bg-card overflow-hidden border shadow-xl">
      <CardHeader className="border-border border-b pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-card-foreground flex items-center gap-3">
            <div className="bg-primary/15 rounded-xl p-2.5">
              <Users className="text-primary size-5" />
            </div>
            <span className="text-lg font-semibold">Online Players</span>
          </CardTitle>

          <div className="flex items-center gap-2">
            <div
              className={cn(
                "size-2.5 rounded-full",
                connected ? "bg-primary" : "bg-destructive"
              )}
            />
            <span className="text-muted-foreground text-sm">
              {connected ? "Live" : "Connecting..."}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 flex gap-4">
          <div className="bg-muted flex items-center gap-2 rounded-lg px-3 py-1.5">
            <Circle className="text-primary fill-primary size-3" />
            <span className="text-muted-foreground text-sm">
              {onlineCount} online
            </span>
          </div>

          <div className="bg-muted flex items-center gap-2 rounded-lg px-3 py-1.5">
            <Gamepad2 className="text-chart-2 size-3" />
            <span className="text-muted-foreground text-sm">
              {inGameCount} playing
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="max-h-75 overflow-y-auto p-0">
        {users.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center justify-center py-12">
            <Users className="mb-3 size-12 opacity-30" />
            <p className="text-sm">No other players online</p>
            <p className="text-xs">Be the first to start a game!</p>
          </div>
        ) : (
          <ul className="divide-border divide-y">
            <AnimatePresence mode="popLayout">
              {users.map((user, index) => {
                const config = statusConfig[user.status];
                const StatusIcon = config.icon;

                return (
                  <motion.li
                    key={user.id}
                    onClick={() => console.log("Clicked user:", user.id)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="group hover:bg-muted flex cursor-pointer items-center gap-4 px-5 py-3.5 transition-colors"
                  >
                    {/* Avatar */}
                    <div className="relative">
                      <Avatar className="bg-muted ring-border group-hover:ring-primary/30 flex size-10 items-center justify-center ring-2 transition-all">
                        <User className="text-muted-foreground size-5" />
                      </Avatar>

                      <div
                        className={cn(
                          "border-card absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-2",
                          config.color
                        )}
                      />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="text-card-foreground group-hover:text-primary truncate text-sm font-medium transition-colors">
                        Player #{user.id.slice(-6)}
                      </p>

                      <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                        <StatusIcon className="size-3" />
                        <span>{config.label}</span>
                      </div>
                    </div>

                    {/* Badge */}
                    <Badge variant="secondary" className="text-xs font-medium">
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
