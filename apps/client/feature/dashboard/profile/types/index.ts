import { Game, User } from "@repo/prisma/types";

export type ProfileStats = {
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
};

export type GameWithPlayers = Game & {
  white: Pick<User, "id" | "name" | "image" | "rating" | "country">;
  black: Pick<User, "id" | "name" | "image" | "rating" | "country">;
};

export type UserProfile = {
  user: User;
  stats: ProfileStats;
  games: GameWithPlayers[];
  totalPages: number;
};

export type GameRow = {
  id: string;
  opponent: string;
  color: "white" | "black";
  result: "win" | "loss" | "draw";
  date: string;
};
