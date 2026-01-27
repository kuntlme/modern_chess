import React from "react";
import Container from "./Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Aperture,
  BadgePercent,
  Brain,
  Cpu,
  DiamondPlus,
  Users,
} from "lucide-react";

const FeatureCards = () => {
  return (
    <Container className="space-y-10 py-10">
      <div className="flex justify-center">
        <div className="w-full flex items-center">
          <div className="h-px w-full bg-linear-to-r to-neutral-500/30 from-transparent"></div>
        </div>
        <div className="text-xs border border-neutral-500/30 text-gray-500 px-4 py-1 rounded-full flex items-stretch gap-2">
          <div className="inset-y-0 w-px h-full bg-cyan-500"></div>
          <div className="w-px h-full bg-gray-500"></div>
          <span>FEATURE</span>
          <div className="w-px h-full bg-gray-500"></div>
          <div className="w-px h-full bg-green-500"></div>
        </div>
        <div className="w-full flex items-center">
          <div className="h-px w-full bg-linear-to-r from-neutral-500/30 to-transparent"></div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-10 w-full">
        <Card className="relative w-1/3 h-145 bg-gray-950 border-gray-800 rounded-4xl group hover:border-gray-600/60 hover:bg-linear-to-b hover:from-green-700/5 hover:to-transparent duration-500 ease-in-out">
          {/* background animation element */}
          <div className="absolute w-full h-full flex justify-center items-center">
            <DiamondPlus
              size={300}
              strokeWidth={"0.25px"}
              className="absolute text-green-700/10 animate-spin animation-duration-[20.0s] group-hover:text-green-700/20 group-hover:scale-80 duration-900 ease-in-out"
            />
            <DiamondPlus
              size={200}
              strokeWidth={"0.25px"}
              className="absolute rotate-45 text-green-700/10 animate-spin animation-duration-[20.0s] group-hover:text-green-700/20 group-hover:scale-160 duration-900 ease-in-out"
            />
            <DiamondPlus
              size={100}
              strokeWidth={"0.25px"}
              className="absolute rotate-45 text-green-700/10 animate-spin animation-duration-[20.0s] group-hover:text-green-700/20 group-hover:scale-175 duration-900 ease-in-out"
            />
          </div>
          <CardHeader className="space-y-5">
            <div className="size-14 flex justify-center items-center border border-gray-800 rounded-2xl bg-gray-600/20 hover: group-hover:border-green-500/20 group-hover:bg-green-500/10 group-hover:scale-105 duration-400 ease-in-out">
              <Cpu strokeWidth={"2px"} size={30} className="text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="py-30 space-y-6 z-1">
            <div className="opacity-0 flex items-center gap-2 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 duration-500 ease-in-out">
              <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs">ONLINE</span>
            </div>
            <CardTitle className="text-4xl text-neutral-200">
              Live Matches
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Challenge players worldwide in real-time matches with various time
              controls and game modes.
            </CardDescription>
            <div>
              <div className="inset-x-0 bg-gray-800 w-full h-px"></div>
              <div className="left-0 bg-green-500 w-0 h-px group-hover:w-full duration-500 ease-in-out"></div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative w-1/3 h-145 bg-gray-950 border-gray-800 rounded-4xl group hover:border-gray-600/60 hover:bg-linear-to-b hover:from-purple-700/5 hover:to-transparent duration-500 ease-in-out">
          {/* background animation element */}
          <div className="absolute w-full h-full flex justify-center items-center">
            <BadgePercent
              size={300}
              strokeWidth={"0.25px"}
              className="absolute text-purple-700/10 animate-spin animation-duration-[20.0s] group-hover:text-purple-700/20 group-hover:scale-80 duration-900 ease-in-out"
            />
            <BadgePercent
              size={200}
              strokeWidth={"0.25px"}
              className="absolute rotate-45 text-purple-700/10 animate-spin animation-duration-[20.0s] group-hover:text-purple-700/20 group-hover:scale-160 duration-900 ease-in-out"
            />
            <BadgePercent
              size={100}
              strokeWidth={"0.25px"}
              className="absolute rotate-90 text-purple-700/10 animate-spin animation-duration-[20.0s] group-hover:text-purple-700/20 group-hover:scale-175 duration-900 ease-in-out"
            />
          </div>
          <CardHeader className="space-y-5">
            <div className="size-14 flex justify-center items-center border border-gray-800 rounded-2xl bg-gray-600/20 hover: group-hover:border-purple-500/20 group-hover:bg-purple-500/10 group-hover:scale-105 duration-400 ease-in-out">
              {/* icon */}
              <Brain
                strokeWidth={"2px"}
                size={30}
                className="text-purple-500"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-30">
            <div className="opacity-0 flex items-center gap-2 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 duration-500 ease-in-out">
              <div className="size-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-purple-400 text-xs">SMART ANALYSIS</span>
            </div>
            <CardTitle className="text-4xl text-neutral-200">
              Analyze Games
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Review every move, spot mistakes, and improve your strategy with
              detailed game history and analysis.
            </CardDescription>
            <div>
              <div className="inset-x-0 bg-gray-800 w-full h-px"></div>
              <div className="left-0 bg-purple-500 w-0 h-px group-hover:w-full duration-500 ease-in-out"></div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative w-1/3 h-145 bg-gray-950 border-gray-800 rounded-4xl group hover:border-gray-600/60 hover:bg-linear-to-b hover:from-cyan-700/5 hover:to-transparent duration-500 ease-in-out">
          {/* background animation element */}
          <div className="absolute w-full h-full flex justify-center items-center">
            <Aperture
              size={300}
              strokeWidth={"0.25px"}
              className="absolute text-cyan-700/10 animate-spin animation-duration-[20.0s] group-hover:text-cyan-700/20 group-hover:scale-60 duration-900 ease-in-out"
            />
            <Aperture
              size={200}
              strokeWidth={"0.25px"}
              className="absolute rotate-90 text-cyan-700/10 animate-spin animation-duration-[20.0s] group-hover:text-cyan-700/20 group-hover:scale-150 duration-900 ease-in-out"
            />
          </div>
          <CardHeader className="space-y-5">
            <div className="size-14 flex justify-center items-center border border-gray-800 rounded-2xl bg-gray-600/20 hover: group-hover:border-cyan-500/20 group-hover:bg-cyan-500/10 group-hover:scale-105 duration-400 ease-in-out">
              {/* icon  */}
              <Users strokeWidth={"2px"} size={30} className="text-cyan-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-30">
            <div className="opacity-0 flex items-center gap-2 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 duration-500 ease-in-out">
              <div className="size-2 bg-cyan-500 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-xs">PRIVATE ROOMS</span>
            </div>
            <CardTitle className="text-4xl text-neutral-200">
              Play With Friends
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Create private rooms and invite friends with a single link. No
              matchmaking, no pressure — just pure chess.
            </CardDescription>
            <div>
              <div className="inset-x-0 bg-gray-800 w-full h-px"></div>
              <div className="left-0 bg-cyan-500 w-0 h-px group-hover:w-full duration-500 ease-in-out"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default FeatureCards;
