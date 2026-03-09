"use client";

import { User } from "@repo/prisma/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function ProfileHeader({ user }: { user: User }) {
  const username = user.username ?? "Anonymous";

  return (
    <Card>
      <CardContent className="flex items-center gap-6 py-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{username}</h1>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">Rating {user.rating}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
