import ChessBoard from "@/components/chessboard";
import { Button } from "@/components/ui/button";

export default function GamePage() {
  return (
    <main className="w-full flex min-h-screen items-center justify-center gap-30 bg-neutral-800">
      <div className="border">
        <ChessBoard />
      </div>
      <div className="h-full flex flex-col w-1/3 border">
        <Button>Play</Button>
      </div>
    </main>
  );
}
