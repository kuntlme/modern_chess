"use client";

import { useState, useTransition } from "react";

import { Check, Star, Swords, Trophy, UserPlus, Users, X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  acceptFriendRequest,
  cancelFriendRequest,
  rejectFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "../action";
import { searchUsers } from "../action/search-user";

export default function FriendsClient({
  friends,
  suggested,
  sent,
  received,
}: any) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isSearching, startSearchTransition] = useTransition();

  async function handleSearch(value: string) {
    setSearch(value);

    startSearchTransition(async () => {
      if (value.length < 2) {
        setSearchResults([]);
        return;
      }

      const results = await searchUsers(value);
      setSearchResults(results);
    });
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Users className="text-primary size-6" />
        <h1 className="text-2xl font-semibold">Friends</h1>
      </div>

      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="friends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="suggested">Suggested</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
        </TabsList>

        {/* FRIENDS */}
        <TabsContent value="friends">
          <UserCardList
            users={friends}
            action={(user: any) => (
              <Button
                size="sm"
                variant="outline"
                disabled={isPending}
                onClick={() => startTransition(() => removeFriend(user.id))}
              >
                Remove
              </Button>
            )}
          />
        </TabsContent>

        {/* SUGGESTED */}
        <TabsContent value="suggested">
          <UserCardList
            users={suggested}
            action={(user: any) => (
              <Button
                size="sm"
                disabled={isPending}
                onClick={() =>
                  startTransition(() => sendFriendRequest(user.id))
                }
              >
                <UserPlus className="mr-1 size-4" />
                Add
              </Button>
            )}
          />
        </TabsContent>

        {/* SENT */}
        <TabsContent value="sent">
          <UserCardList
            users={sent.map((r: any) => r.to)}
            action={(user: any, index: number) => (
              <Button
                size="sm"
                variant="outline"
                disabled={isPending}
                onClick={() =>
                  startTransition(() => cancelFriendRequest(sent[index].id))
                }
              >
                Cancel
              </Button>
            )}
          />
        </TabsContent>

        {/* RECEIVED */}
        <TabsContent value="received">
          <UserCardList
            users={received.map((r: any) => r.from)}
            action={(user: any, index: number) => (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(() =>
                      acceptFriendRequest(received[index].id)
                    )
                  }
                >
                  <Check className="mr-1 size-4" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(() =>
                      rejectFriendRequest(received[index].id)
                    )
                  }
                >
                  <X className="mr-1 size-4" />
                  Reject
                </Button>
              </div>
            )}
          />
        </TabsContent>

        {/* SEARCH */}
        <TabsContent value="search">
          <UserCardList
            users={searchResults}
            action={(user: any) => (
              <Button
                size="sm"
                disabled={isPending}
                onClick={() =>
                  startTransition(() => sendFriendRequest(user.id))
                }
              >
                <UserPlus className="mr-1 size-4" />
                Add
              </Button>
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function UserCardList({ users, action }: any) {
  if (!users || users.length === 0) {
    return (
      <Card>
        <CardContent className="text-muted-foreground py-12 text-center">
          No users found.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users ({users.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.map((user: any, index: number) => (
          <div
            key={user.id}
            className="bg-muted/40 flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>
                  {user.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{user.username}</p>
                  {user.status && (
                    <Badge variant="secondary">{user.status}</Badge>
                  )}
                </div>

                <div className="text-muted-foreground mt-1 flex gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Star className="text-primary size-3" />
                    {user.rating ?? 800}
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="text-primary size-3" />
                    {user.winRate ?? 0}%
                  </span>
                  <span className="flex items-center gap-1">
                    <Swords className="text-primary size-3" />
                    {user.gamesPlayed ?? 0}
                  </span>
                </div>
              </div>
            </div>

            {action(user, index)}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
