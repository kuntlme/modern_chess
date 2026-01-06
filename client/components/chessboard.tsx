"use client"

type SquareData = {
  type: string
  color: "w" | "b"
} | null

const BOARD: SquareData[][] = [
  [
    { type: "r", color: "b" },
    { type: "n", color: "b" },
    { type: "b", color: "b" },
    { type: "q", color: "b" },
    { type: "k", color: "b" },
    { type: "b", color: "b" },
    { type: "n", color: "b" },
    { type: "r", color: "b" },
  ],
  Array(8).fill({ type: "p", color: "b" }),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill({ type: "p", color: "w" }),
  [
    { type: "r", color: "w" },
    { type: "n", color: "w" },
    { type: "b", color: "w" },
    { type: "q", color: "w" },
    { type: "k", color: "w" },
    { type: "b", color: "w" },
    { type: "n", color: "w" },
    { type: "r", color: "w" },
  ],
]

// HARD-CODED possible moves just for UI demo
const POSSIBLE_MOVES = ["e4", "d4", "f3"]

export default function Chessboard() {
  return (
      <div className="aspect-square w-[95vmin]">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {BOARD.map((row, i) =>
            row.map((piece, j) => {
              const square =
                String.fromCharCode(97 + j) + (8 - i)
              const dark =
                (i + j) % 2 === 0

              return (
                <div
                  key={square}
                  className={`relative flex items-center justify-center ${
                    dark ? "bg-slate-600" : "bg-slate-300"
                  }`}
                >
                  {/* Hardcoded move dot */}
                  {POSSIBLE_MOVES.includes(square) && (
                    <img
                      src="/possible.png"
                      className="absolute w-1/3 h-1/3 opacity-70"
                      alt=""
                    />
                  )}

                  {/* Piece */}
                  {piece && (
                    <img
                      src={`/pieces/${piece.color}_${piece.type}.png`}
                      className="w-4/5 h-4/5 object-contain"
                      alt=""
                    />
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
  )
}
