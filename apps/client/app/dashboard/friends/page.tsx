"use client";
import { act, useState } from "react";

import { Avatar } from "@radix-ui/react-avatar";
import {
  ArrowDown,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Gamepad2,
  Globe,
  MessageSquare,
  Search,
  Star,
  Swords,
  Trophy,
  User,
  UserCheck,
  UserPlus,
  UserRoundSearch,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { deflate } from "zlib";
import { boolean } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from "@/feature/dashboard/components/data-table";
import {
  existingFriendsColumns,
  existingFriendsData,
} from "@/feature/dashboard/friends/existing-friend-table";
import {
  globalFriendscolumns,
  globalFriendsData,
} from "@/feature/dashboard/friends/global-friend-table";
import { cn } from "@/lib/utils";

type Friend = {
  id: number;
  username: string;
  displayName: string;
  rating: number;
  status: string;
  lastActive: string;
  winRate: number;
  gamesPlayed: number;
  mutualFriends: number;
};

type MockPendingRequest = {
  id: number;
  username: string;
  displayName: string;
  rating: number;
  mutualFriends: number;
  requestDate: string;
};

type MockSuggestion = {
  id: number;
  username: string;
  displayName: string;
  mutualFriends: number;
  reason: string;
};

type GlobalSearchResult = {
  id: number;
  username: string;
  displayName: string;
  rating: number;
  country: string;
  gamesPlayed: number;
};

const mockFriends: Friend[] = [];
const mockPendingRequests: MockPendingRequest[] = [];
const mockSuggestions: MockSuggestion[] = [];
const globalSearchResults: GlobalSearchResult[] = [];
const section = [
  {
    label: "Total Friends",
    value: mockFriends.length,
    icon: Users,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    label: "Online Now",
    value: mockFriends.filter((f) => f.status === "online").length,
    icon: UserCheck,
    gradient: "from-amber-600 to-orange-700",
  },
  {
    label: "In Game",
    value: mockFriends.filter((f) => f.status === "in-game").length,
    icon: Gamepad2,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    label: "Pending",
    value: mockPendingRequests.length,
    icon: Clock,
    gradient: "from-amber-300 to-orange-400",
  },
];

const tabs = [
  {
    id: "friends",
    label: "My Friends",
    icon: Users,
    count: mockFriends.length,
  },
  {
    id: "requests",
    label: "Requests",
    icon: UserPlus,
    count: mockPendingRequests.length,
  },
  {
    id: "suggestions",
    label: "Requests",
    icon: UserRoundSearch,
  },
  {
    id: "search",
    label: "Global Search",
    icon: Globe,
  },
];

const page = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [searchQuery, setSearchQuery] = useState("");
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-500";
      case "in-game":
        return "bg-amber-500";
      default:
        return "bg-slate-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Online";
      case "in-game":
        return "In Game";
      default:
        return "Offline";
    }
  };

  const FriendCard = ({
    friend,
    showActions = true,
  }: {
    friend: Friend;
    showActions?: boolean;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-xl bg-slate-800/50 p-4 transition-all duration-300 hover:bg-slate-800/80"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar with status */}
          <div className="relative">
            <Avatar className="flex size-14 items-center justify-center bg-linear-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20">
              <User className="size-7 text-white" />
            </Avatar>
            <div
              className={cn(
                "absolute -right-0.5 -bottom-0.5 size-4 rounded-full border-2 border-slate-800",
                getStatusColor(friend.status)
              )}
            />
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white">{friend.username}</h3>
              {friend.status === "in_game" && (
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400">
                  <Swords className="mr-1 inline size-3" />
                  Playing
                </span>
              )}
            </div>
            <p className="text-sm text-slate-400">{friend.displayName}</p>
            <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Star className="size-3 text-amber-400" />
                {friend.rating}
              </span>
              <span className="flex items-center gap-1">
                <Trophy className="size02 text-emerald-400" />
                {friend.winRate}%
              </span>
              <span className="flex items-center gap-1">
                <Trophy className="size02 text-emerald-400" />
                {friend.gamesPlayed}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="sm"
              className="h-9 rounded-lg bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20"
            >
              <Swords className="mr-1 size-4" />
              Challenge
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-9 rounded-lg border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700"
            >
              <MessageSquare className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );

  const PendingRequestCard = ({ request }: { request: MockPendingRequest }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="flex size-12 items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600">
            <User className="size-6 text-white" />
          </Avatar>
          <div>
            <h3 className="font-semibold text-white">{request.username}</h3>
            <p className="text-sm text-slate-400">{request.displayName}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <Star className="size-3 text-amber-400" />
              <span>*</span>
              <span>{request.mutualFriends}</span>
              <span>*</span>
              <Clock className="size-3" />
              <span>{request.requestDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="h-9 rounded-lg bg-linear-to-r from-emerald-500 to-teal-600 text-white"
          >
            <Check className="mr-1 size-4" />
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-9 rounded-lg border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const SuggestionCard = ({ suggestion }: { suggestion: MockSuggestion }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group overflow-hidden rounded-xl bg-slate-800/50 p-4 transition-all hover:bg-slate-800/80"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="flex size-12 items-center justify-center bg-linear-to-br from-cyan-500 to-blue-600">
            <User className="size-6 text-white" />
          </Avatar>
          <div>
            <h3 className="font-semibold text-white">{suggestion.username}</h3>
            <p className="text-sm text-slate-400">{suggestion.displayName}</p>
            <p className="mt-1 text-xs text-indigo-400">{suggestion.reason}</p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="border-in500/50 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 transition-all hover:bg-indigo-500 hover:text-white"
        >
          <UserPlus className="mr-1 size-4" />
          Add
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="flex w-full flex-col items-center gap-8 py-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-5xl flex-col items-center gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-linear-to-br from-amber-500 to-orange-600 p-4 shadow-lg shadow-amber-500/20">
            <Users className="size-8 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Friends</h1>
            <p className="text-slate-400">Connect with fellow players</p>
          </div>
        </div>

        {/* Global Search */}
        <div className="flex w-full max-w-xl items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search player worldwide..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              className="h-12 rounded-xl border-slate-700 bg-slate-800/50 pl-12 text-white placeholder:text-slate-400 focus:border-indigo-500"
            />
          </div>
          <Button
            onClick={() => setIsSearching(true)}
            className="h-12 rounded-xl border-slate-700 bg-slate-800/50 pl-12 text-white placeholder:text-slate-400 focus:border-indigo-500"
          >
            <Globe className="mr-2 size-5" />
            Search
          </Button>
        </div>
      </motion.div>

      {/* stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid w-full max-w-5xl grid-cols-4 gap-4"
      >
        {section.map((stat, idx) => (
          <Card
            key={idx}
            className="border-0 bg-linear-to-br from-slate-800 to-slate-900 shadow-xl"
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div
                className={cn(
                  "rounded-xl bg-linear-to-br p-3 shadow-lg",
                  stat.gradient
                )}
              >
                <stat.icon className="size-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-5xl"
      >
        <TabsList className="mb-6 grid h-auto w-full grid-cols-4 gap-2 border border-slate-700 bg-slate-800/50 p-2">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="relative flex items-center gap-2 rounded-lg py-3 data-[stable=active]:bg-slate-700 data-[state=active]:text-white"
            >
              <tab.icon className="size-4" />
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
                  {tab.count}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Friends Tab */}
        <TabsContent value="friends">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-0 bg-linear-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="p-6">
                {/* Search within friends */}
                <div className="mb-6 items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Search friends..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-10 rounded-lg border-slate-700 bg-slate-800/50 pl-10 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <select className="h-10 rounded-lg border border-slate-700 bg-slate-800/50 px-3 text-sm text-white">
                    <option value="all">All Friends</option>
                    <option className="online">Online Only</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>

                {/* Friends List */}
                <div className="space-y-3">
                  {mockFriends
                    .filter(
                      (f) =>
                        searchQuery === "" ||
                        f.username
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        f.displayName
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                    )
                    .map((friend, idx) => (
                      <FriendCard key={friend.id} friend={friend} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Pending Requests */}
            <Card className="border-0 bg-linear-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 p-2.5 shadow-lg shadow-indigo-500/20">
                    <UserPlus className="size-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    Pending Requests ({mockPendingRequests.length})
                  </h2>
                </div>

                {mockPendingRequests.length > 0 ? (
                  <div className="space-y-3">
                    {mockPendingRequests.map((request) => (
                      <PendingRequestCard key={request.id} request={request} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                    <UserCheck className="mb-4 size-12 opacity-50" />
                    <p>No pending requests</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sent Requests */}
            <Card className="from border-0 bg-slate-800 bg-linear-to-br to-slate-900 shadow-xl">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-amber-500 to-orange-600 p-2.5 shadow-lg shadow-amber-500/20">
                    <Clock className="size-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    Sent Requests
                  </h2>
                </div>

                <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                  <User className="mb-4 size-10 opacity-50" />
                  <p>No pending sent requests</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Suggestions Tab */}
        <TabsContent value="suggestions">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-0 bg-linear-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 p-2.5 shadow-lg shadow-cyan-500/20">
                    <UserRoundSearch className="size-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Suggested Friends
                    </h2>
                    <p className="text-sm text-slate-400">
                      Players you might want to connect with
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {mockSuggestions.map((suggestion) => (
                    <SuggestionCard
                      key={suggestion.id}
                      suggestion={suggestion}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Global Search Tab */}
        <TabsContent value="search">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-0 bg-linear-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-violet-500 to-purple-600 p-2.5 shadow-lg shadow-violet-500/20">
                    <Globe className="size-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Global Search
                    </h2>
                    <p className="text-sm text-slate-400">
                      Find players from around the world
                    </p>
                  </div>
                </div>

                {/* Search Results */}
                <div className="space-y-3">
                  {globalSearchResults.map((player, idx) => (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group flex items-center justify-between rounded-xl bg-slate-700/30 p-4 transition-all hover:bg-slate-700/50"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="flex size-14 items-center justify-center bg-linear-to-br from-amber-500 to-orange-600 shadow-lg">
                          <User className="size-7 text-white" />
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white">
                              {player.username}
                            </h3>
                            <span className="text-lg">{player.country}</span>
                          </div>
                          <p className="text-sm text-slate-400">
                            {player.displayName}
                          </p>
                          <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Star className="size-3 text-amber-400" />
                              {player.rating}
                            </span>
                            <span className="flex items-center gap-1">
                              <Gamepad2 className="size-3" />
                              {player.gamesPlayed.toLocaleString()} games
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="h-9 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 text-white opacity-0 transition-all group-hover:opacity-100"
                      >
                        <UserPlus className="mr-1 size-4" />
                        Add Friend
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {/* Load More */}
                <div className="mt-6 flex justify-center">
                  <Button
                    variant="outline"
                    className="border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700"
                  >
                    Load More Results
                    <ChevronDown className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
