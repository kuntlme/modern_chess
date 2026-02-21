"use client";

import { useRouter } from "next/navigation";

import { motion } from "motion/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const users = ["A", "B", "C", "D", "E", "F"];

export default function MatchmakingLoader() {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Finding Opponent</CardTitle>
        <CardDescription>Just give us a moment..</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-5">
          <p className="text-muted-foreground">Changed mind!!!</p>
          <Button variant={"default"} onClick={() => router.push("/dashboard")}>
            Back to dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
