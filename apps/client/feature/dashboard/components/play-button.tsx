"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const PlayButton = () => {
  const router = useRouter();

  return (
    <Button
      size="lg"
      className="rounded-xl px-10 py-6 text-lg font-semibold"
      onClick={() => router.push("/game")}
    >
      Play Now
    </Button>
  );
};

export default PlayButton;
