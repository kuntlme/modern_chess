"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { spawn } from "child_process";
import { Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const WatchButton = () => {
  const [openWatchDialog, setOpenWatchDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gameId, setGameId] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    if (!gameId) {
      setError(true);
      return;
    }
    setLoading(true);
    router.push(`/game/watch/{gameId}`);
  };
  return (
    <Dialog open={openWatchDialog} onOpenChange={setOpenWatchDialog}>
      <DialogTrigger>
        <Button
          variant="secondary"
          className="h-14 rounded-xl px-8 text-base font-medium"
          onClick={() => setOpenWatchDialog(true)}
        >
          <Zap className="mr-2 size-4" />
          Watch Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Watch Live Game</DialogTitle>
        <DialogDescription>
          Enter a game ID to spectate an ongoing match in real time.
        </DialogDescription>
        <div>
          <Input
            type="text"
            placeholder="Enter game Id here"
            value={gameId}
            onChange={(e) => {
              setError(false);
              setGameId(e.target.value);
            }}
          />
          {error && (
            <span className="text-destructive ml-2 text-sm">
              Game id is required.
            </span>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleClick} disabled={loading}>
            {loading ? (
              <>
                <Spinner />
                Entering game
              </>
            ) : (
              <>Enter game</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WatchButton;
