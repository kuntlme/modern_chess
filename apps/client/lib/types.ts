export type GameState = {
  status: "IDLE" | "PLAYING" | "ENDED";
  color?: "w" | "b";
  fen?: string;
  moves: string[];
  yourTurn: boolean;
  winner?: "w" | "b" | null;
};

export type GetGameFromDB = {
  type: "DB_GAME_LOADED";
  payload: GameState;
};
