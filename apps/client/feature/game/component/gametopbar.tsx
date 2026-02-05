import { Share2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Props = {
  white: string;
  black: string;
  yourColor?: "w" | "b";
  status: string;
};

export function GameTopBar({ white, black, yourColor, status }: Props) {
  return (
    <div className="flex items-center justify-between border-b px-6 py-3">
      {/* PLAYER VS PLAYER */}
      <div className="flex items-center gap-4">
        <Badge variant={yourColor === "w" ? "default" : "secondary"}>
          ♙ {white}
          {yourColor === "w" && " (You)"}
        </Badge>

        <span className="text-muted-foreground font-medium">VS</span>

        <Badge variant={yourColor === "b" ? "default" : "secondary"}>
          ♟ {black}
          {yourColor === "b" && " (You)"}
        </Badge>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline">
          <Share2 className="size-4" />
        </Button>

        <Button variant="destructive" disabled={status !== "PLAYING"}>
          Resign
        </Button>
      </div>
    </div>
  );
}
