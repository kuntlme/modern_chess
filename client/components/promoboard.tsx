import React, { useEffect, useState } from "react";

import {
  ChessBishop,
  ChessKnightIcon,
  ChessQueenIcon,
  ChessRookIcon,
} from "lucide-react";

import { PromotionOption } from "@/schema/clientMessageSchema";

import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent } from "./ui/dialog";

const PromoBoard = ({
  isPromotion,
  setPromoPiece,
}: {
  isPromotion: boolean;
  setPromoPiece: React.Dispatch<React.SetStateAction<PromotionOption>>;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    if (!isOpen && isPromotion) {
      setIsOpen(true);
    }
  }, [isPromotion]);
  const handleClick = (piece: PromotionOption) => {
    setPromoPiece(piece);
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogClose />
      <DialogContent className="m-0 h-3/12 border p-0">
        <div className="flex h-full items-center justify-center gap-2 border">
          <Button className="size-30" onClick={() => handleClick("q")}>
            <ChessQueenIcon className="size-18" />
          </Button>
          <Button className="size-30" onClick={() => handleClick("r")}>
            <ChessRookIcon className="size-18" />
          </Button>
          <Button className="size-30" onClick={() => handleClick("b")}>
            <ChessBishop className="size-18" />
          </Button>
          <Button className="size-30" onClick={() => handleClick("n")}>
            <ChessKnightIcon className="size-18" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoBoard;
