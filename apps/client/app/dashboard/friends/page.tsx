"use client";
import { useState } from "react";

import {
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Globe,
  Search,
  UserRoundSearch,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "@/feature/dashboard/components/data-table";
import {
  existingFriendsColumns,
  existingFriendsData,
} from "@/feature/dashboard/friends/existing-friend-table";
import {
  globalFriendscolumns,
  globalFriendsData,
} from "@/feature/dashboard/friends/global-friend-table";

const page = () => {
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(true);
  const [isExistingFriendOpen, setIsExistingFriendOpen] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <div className="flex items-center justify-start gap-5">
        <UserRoundSearch
          className="size-18 text-neutral-600/60"
          strokeWidth={"2.75px"}
        />
        <h1 className="text-7xl font-bold text-neutral-600/60">Find Friends</h1>
      </div>
      <div className="flex w-2/3 items-center justify-center gap-4">
        <Input type="text" placeholder="Enter username" className="w-1/3" />
        <div className="rounded-md border p-2">
          <Search className="size-5 text-neutral-500" />
        </div>
      </div>
      <div className="flex items-center justify-start gap-3">
        <Globe className="size-6 text-neutral-500" strokeWidth={"1.75px"} />
        <h2 className="text-2xl font-semibold text-neutral-500">
          Global Search
        </h2>
        <Button
          className="cursor-pointer border border-none bg-transparent"
          onClick={() => setIsGlobalSearchOpen(!isGlobalSearchOpen)}
        >
          {isGlobalSearchOpen ? (
            <ChevronDown
              className="size-6 text-neutral-500"
              strokeWidth={"1.75px"}
            />
          ) : (
            <ChevronUp
              className="size-6 text-neutral-500"
              strokeWidth={"1.75px"}
            />
          )}
        </Button>
      </div>
      <div className="w-3/5 px-5">
        <DataTable data={globalFriendsData} columns={globalFriendscolumns} />
      </div>

      <div className="flex items-center justify-start gap-3">
        <Users className="size-6 text-neutral-500" strokeWidth={"1.75px"} />
        <h2 className="text-2xl font-semibold text-neutral-500">Friends</h2>
        <Button
          className="cursor-pointer border border-none bg-transparent"
          onClick={() => setIsExistingFriendOpen(!isExistingFriendOpen)}
        >
          {isExistingFriendOpen ? (
            <ChevronDown
              className="size-6 text-neutral-500"
              strokeWidth={"1.75px"}
              onClick={() => setIsExistingFriendOpen(!isExistingFriendOpen)}
            />
          ) : (
            <ChevronUp
              className="size-6 text-neutral-500"
              strokeWidth={"1.75px"}
              onClick={() => setIsExistingFriendOpen(!isExistingFriendOpen)}
            />
          )}
        </Button>
      </div>
      {isExistingFriendOpen && (
        <div className="w-3/5 px-5">
          <DataTable
            data={existingFriendsData}
            columns={existingFriendsColumns}
          />
        </div>
      )}
    </div>
  );
};

export default page;
