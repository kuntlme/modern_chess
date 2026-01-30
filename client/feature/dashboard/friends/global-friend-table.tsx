"use client"
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CircleUserRound,
  ScanEye,
  User,
  UserRoundPlus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";

export const globalFriendsData: UserList[] = [
  {
    username: "kuntl",
    avatar: "kuntsl",
    rating: 567,
    status: "ONLINE",
  },
  {
    username: "kuntl",
    avatar: "kuntsl",
    rating: 567,
    status: "ONLINE",
  },
  {
    username: "kuntl",
    avatar: "kuntsl",
    rating: 567,
    status: "OFFLINE",
  },
  {
    username: "kuntl",
    avatar: "kuntsl",
    rating: 567,
    status: "INGAME",
  },
];

export type UserList = {
  username: string;
  avatar: string;
  rating: number;
  status: "ONLINE" | "INGAME" | "OFFLINE";
};

export const globalFriendscolumns: ColumnDef<UserList>[] = [
  {
    id: "user",
    header: () => <div>User</div>,
    cell: ({ row }) => {
        const user = row.original;
        return (
            <div className="flex gap-2 justify-start items-center">
                <Avatar className="bg-neutral-400/40 p-2 rounded-full">
                    <AvatarImage src={user.avatar} alt={user.username}/>
                    <AvatarFallback><User className="size-5"/></AvatarFallback>
                </Avatar>
                {user.username}
            </div>
        )
    },
  },
  {
    accessorKey: "rating",
    header: () => <div>Rating</div>,
    cell: ({ row }) => <div>{row.getValue<string>("rating")}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
        const status = row.getValue("status");
        switch (status) {
            case "ONLINE": {
                return (
                    <Badge className="bg-green-400/30 border border-green-500 space-x-1 text-green-700">
                        <div className="size-2 rounded-full bg-green-600 animate-pulse" />
                        {status}
                    </Badge>
                )
            }
            case "INGAME": {
                return (
                    <Badge className="bg-amber-500/30 border border-amber-500 space-x-1 text-amber-700">
                        <div className="size-2 rounded-full bg-amber-500 animate-pulse" />
                        {status}
                    </Badge>
                )
            }
            case "OFFLINE": {
                return (
                    <Badge className="bg-red-500/30 border border-red-500 text-red-700">
                        {status}
                    </Badge>
                )
            }
        }
        
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <Button>
          <UserRoundPlus />
          Add Friend
        </Button>
      );
    },
  },
];
