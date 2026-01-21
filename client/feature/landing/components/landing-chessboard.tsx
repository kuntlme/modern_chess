"use client";
import { Chess } from "chess.js";
import React, { useEffect, useState } from "react";
import { Chessboard, ChessboardOptions } from "react-chessboard";

const LandingChessBoard = () => {
  const [currentFen, setCurrentFen] = useState("");

  const moves: string[] = [
    "e2e4",
    "d7d5",
    "g1f3",
    "d5e4",
    "f3e5",
    "f7f6",
    "d1h5",
    "g7g6",
    "f1c4",
    "g6h5",
    "c4f7"
  ];
  useEffect(() => {
    const game = new Chess();
    setCurrentFen(game.fen());
    
    let moveIndex = 0;
    
    const animateMove = () => {
        game.move(moves[moveIndex]);
        setCurrentFen(game.fen());
        moveIndex++;
        if(moveIndex >= moves.length){
            moveIndex = 0;
            game.reset();
        }
        setTimeout(animateMove, 700); // 700ms delay between moves
    };
    
    animateMove();
  }, []);

  const chessboardOptions: ChessboardOptions = {
    position: currentFen,
    boardOrientation: "white",
    canDragPiece: ({ isSparePiece, piece, square }) => false,
  };
  return (
    <>
      <Chessboard options={chessboardOptions} />
    </>
  );
};

export default LandingChessBoard;
