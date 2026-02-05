import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useGame } from "@/hooks/useGame";

const PlayButton = () => {
  // const { initGame } = useGame();
  const router = useRouter();
  return (
    <Button
      className="h-30 rounded-2xl py-5 text-5xl font-semibold text-neutral-700/90"
      onClick={() => {
        // initGame();
        router.push("/game");
      }}
    >
      Play
    </Button>
  );
};

export default PlayButton;
