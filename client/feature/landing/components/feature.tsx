import React from "react";

import {
  Aperture,
  BadgePercent,
  Brain,
  Cpu,
  DiamondPlus,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Container from "./Container";

const FeatureCards = () => {
  return (
    <Container className="space-y-10 py-10">
      <div className="flex justify-center">
        <div className="flex w-full items-center">
          <div className="h-px w-full bg-linear-to-r from-transparent to-neutral-500/30"></div>
        </div>
        <div className="flex items-stretch gap-2 rounded-full border border-neutral-500/30 px-4 py-1 text-xs text-gray-500">
          <div className="inset-y-0 h-full w-px bg-cyan-500"></div>
          <div className="h-full w-px bg-gray-500"></div>
          <span>FEATURE</span>
          <div className="h-full w-px bg-gray-500"></div>
          <div className="h-full w-px bg-green-500"></div>
        </div>
        <div className="flex w-full items-center">
          <div className="h-px w-full bg-linear-to-r from-neutral-500/30 to-transparent"></div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center gap-10">
        <Card className="group relative h-145 w-1/3 rounded-4xl border-gray-800 bg-gray-950 duration-500 ease-in-out hover:border-gray-600/60 hover:bg-linear-to-b hover:from-green-700/5 hover:to-transparent">
          {/* background animation element */}
          <div className="absolute flex h-full w-full items-center justify-center">
            <DiamondPlus
              size={300}
              strokeWidth={"0.25px"}
              className="animation-duration-[20.0s] absolute animate-spin text-green-700/10 duration-900 ease-in-out group-hover:scale-80 group-hover:text-green-700/20"
            />
            <DiamondPlus
              size={200}
              strokeWidth={"0.25px"}
              className="animation-duration-[20.0s] absolute rotate-45 animate-spin text-green-700/10 duration-900 ease-in-out group-hover:scale-160 group-hover:text-green-700/20"
            />
            <DiamondPlus
              size={100}
              strokeWidth={"0.25px"}
              className="animation-duration-[20.0s] absolute rotate-45 animate-spin text-green-700/10 duration-900 ease-in-out group-hover:scale-175 group-hover:text-green-700/20"
            />
          </div>
          <CardHeader className="space-y-5">
            <div className="hover: flex size-14 items-center justify-center rounded-2xl border border-gray-800 bg-gray-600/20 duration-400 ease-in-out group-hover:scale-105 group-hover:border-green-500/20 group-hover:bg-green-500/10">
              <Cpu strokeWidth={"2px"} size={30} className="text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="z-1 space-y-6 py-30">
            <div className="flex translate-y-full items-center gap-2 opacity-0 duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
              <span className="text-xs text-green-400">ONLINE</span>
            </div>
            <CardTitle className="text-4xl text-neutral-200">
              Live Matches
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Challenge players worldwide in real-time matches with various time
              controls and game modes.
            </CardDescription>
            <div>
              <div className="inset-x-0 h-px w-full bg-gray-800"></div>
              <div className="left-0 h-px w-0 bg-green-500 duration-500 ease-in-out group-hover:w-full"></div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative h-145 w-1/3 rounded-4xl border-gray-800 bg-gray-950 duration-500 ease-in-out hover:border-gray-600/60 hover:bg-linear-to-b hover:from-purple-700/5 hover:to-transparent">
          {/* background animation element */}
          <div className="absolute flex h-full w-full items-center justify-center">
            <BadgePercent
              size={300}
              strokeWidth={"0.25px"}
              className="animation-duration-[20.0s] absolute animate-spin text-purple-700/10 duration-900 ease-in-out group-hover:scale-80 group-hover:text-purple-700/20"
            />
            <BadgePercent
              size={200}
              strokeWidth={"0.25px"}
              className="animation-duration-[20.0s] absolute rotate-45 animate-spin text-purple-700/10 duration-900 ease-in-out group-hover:scale-160 group-hover:text-purple-700/20"
            />
            <BadgePercent
              size={100}
              strokeWidth={"0.25px"}
              className="animation-duration-[20.0s] absolute rotate-90 animate-spin text-purple-700/10 duration-900 ease-in-out group-hover:scale-175 group-hover:text-purple-700/20"
            />
          </div>
          <CardHeader className="space-y-5">
            <div className="hover: flex size-14 items-center justify-center rounded-2xl border border-gray-800 bg-gray-600/20 duration-400 ease-in-out group-hover:scale-105 group-hover:border-purple-500/20 group-hover:bg-purple-500/10">
              {/* icon */}
              <Brain
                strokeWidth={"2px"}
                size={30}
                className="text-purple-500"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-30">
            <div className="flex translate-y-full items-center gap-2 opacity-0 duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              <div className="size-2 animate-pulse rounded-full bg-purple-500"></div>
              <span className="text-xs text-purple-400">SMART ANALYSIS</span>
            </div>
            <CardTitle className="text-4xl text-neutral-200">
              Analyze Games
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Review every move, spot mistakes, and improve your strategy with
              detailed game history and analysis.
            </CardDescription>
            <div>
              <div className="inset-x-0 h-px w-full bg-gray-800"></div>
              <div className="left-0 h-px w-0 bg-purple-500 duration-500 ease-in-out group-hover:w-full"></div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative h-145 w-1/3 rounded-4xl border-gray-800 bg-gray-950 duration-500 ease-in-out hover:border-gray-600/60 hover:bg-linear-to-b hover:from-cyan-700/5 hover:to-transparent">
          {/* background animation element */}
          <div className="absolute flex h-full w-full items-center justify-center">
            <Aperture
              size={300}
              strokeWidth={"0.25px"}
              className="animation-duration-[20.0s] absolute animate-spin text-cyan-700/10 duration-900 ease-in-out group-hover:scale-60 group-hover:text-cyan-700/20"
            />
            <Aperture
              size={200}
              strokeWidth={"0.25px"}
              className="animation-duration-[20.0s] absolute rotate-90 animate-spin text-cyan-700/10 duration-900 ease-in-out group-hover:scale-150 group-hover:text-cyan-700/20"
            />
          </div>
          <CardHeader className="space-y-5">
            <div className="hover: flex size-14 items-center justify-center rounded-2xl border border-gray-800 bg-gray-600/20 duration-400 ease-in-out group-hover:scale-105 group-hover:border-cyan-500/20 group-hover:bg-cyan-500/10">
              {/* icon  */}
              <Users strokeWidth={"2px"} size={30} className="text-cyan-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-30">
            <div className="flex translate-y-full items-center gap-2 opacity-0 duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              <div className="size-2 animate-pulse rounded-full bg-cyan-500"></div>
              <span className="text-xs text-cyan-400">PRIVATE ROOMS</span>
            </div>
            <CardTitle className="text-4xl text-neutral-200">
              Play With Friends
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Create private rooms and invite friends with a single link. No
              matchmaking, no pressure — just pure chess.
            </CardDescription>
            <div>
              <div className="inset-x-0 h-px w-full bg-gray-800"></div>
              <div className="left-0 h-px w-0 bg-cyan-500 duration-500 ease-in-out group-hover:w-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default FeatureCards;
