"use client";
import { Input } from "@/components/ui/input";
import DataTable from "@/feature/dashboard/components/data-table";
import {
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Globe,
  Search,
  UserRoundSearch,
  Users,
} from "lucide-react";
import {
  globalFriendsData,
  globalFriendscolumns,
} from "@/feature/dashboard/friends/global-friend-table";
import {
  existingFriendsData,
  existingFriendsColumns,
} from "@/feature/dashboard/friends/existing-friend-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const page = () => {
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(true);
  const [isExistingFriendOpen, setIsExistingFriendOpen] = useState(true);

  return (
    <div className="space-y-5 flex flex-col justify-center items-center">
      <div className="flex justify-start items-center gap-5">
        <UserRoundSearch
          className="size-18 text-neutral-600/60"
          strokeWidth={"2.75px"}
        />
        <h1 className="text-7xl font-bold text-neutral-600/60">Find Friends</h1>
      </div>
      <div className="flex gap-4 justify-center items-center w-2/3">
        <Input type="text" placeholder="Enter username" className="w-1/3" />
        <div className="border p-2 rounded-md">
          <Search className="text-neutral-500 size-5" />
        </div>
      </div>
      <div className="flex gap-3 justify-start items-center">
        <Globe className="size-6 text-neutral-500" strokeWidth={"1.75px"} />
        <h2 className="text-2xl font-semibold text-neutral-500">
          Global Search
        </h2>
        <Button
          className="border cursor-pointer bg-transparent border-none"
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
      <div className="px-5 w-3/5">
        <DataTable data={globalFriendsData} columns={globalFriendscolumns} />
      </div>

      <div className="flex gap-3 justify-start items-center">
        <Users className="size-6 text-neutral-500" strokeWidth={"1.75px"} />
        <h2 className="text-2xl font-semibold text-neutral-500">Friends</h2>
        <Button
          className="border cursor-pointer bg-transparent border-none"
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
      {isExistingFriendOpen && <div className="px-5 w-3/5">
        <DataTable
          data={existingFriendsData}
          columns={existingFriendsColumns}
        />
      </div>}
    </div>
  );
};

export default page;
