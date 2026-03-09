import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { ProfileStats } from "../types";

export function ProfileStats({ stats }: { stats: ProfileStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Games</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">
          {stats.totalGames}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wins</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-green-500">
          {stats.wins}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Losses</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-red-500">
          {stats.losses}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Draws</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{stats.draws}</CardContent>
      </Card>
    </div>
  );
}
