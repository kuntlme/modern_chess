import { Button } from "@/components/ui/button";
import { useGame } from "@/hooks/useGame";
import { useRouter } from "next/navigation";

const PlayButton = () => {
  // const { initGame } = useGame();
  const router = useRouter()
  return (
    <Button
      className="text-5xl font-semibold text-neutral-700/90 py-5 h-30 rounded-2xl"
      onClick={() => {
        // initGame();
        router.push("/game")
      }}
    >
      Play
    </Button>
  );
};

export default PlayButton;
