"use client";
import React, { useEffect, useState } from "react";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import {
  BarChart3,
  ChessKing,
  Gamepad2,
  Home,
  LayoutDashboard,
  LogOut,
  Play,
  Search,
  Settings,
  Star,
  User,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getSidebarData } from "@/feature/dashboard/home/action";
import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [showFooterDetails, setShowFooterDetails] = useState(open);
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    rating: number;
  } | null>(null);

  const items = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      label: "Play",
      href: "#",
      icon: <Play />,
    },
    {
      label: "Games",
      href: "/dashboard/games",
      icon: <Gamepad2 />,
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 />,
    },
    {
      label: "Friends",
      href: "/dashboard/friends",
      icon: <Users />,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Settings />,
    },
    {
      label: "Profile",
      href: `/dashboard/profile/${session.data?.user.id}`,
      icon: <User />,
    },
  ];

  // Fix hydration mismatch - only render client-side components after mount
  useEffect(() => {
    setMounted(true);
    getSidebarData().then(setUserData);
  }, []);

  useEffect(() => {
    if (open) setShowFooterDetails(true);
  }, [open]);

  const sidebarVariant = {
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.1 },
    },
  };
  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="bg-sidebar flex h-screen w-full pt-2">
        <Sidebar
          collapsible="icon"
          className="bg-sidebar flex flex-col border-none"
        >
          <SidebarHeader className="shrink-0 pt-5">
            <div className="flex w-full gap-2">
              {open ? (
                <ChessKing className="size-7 shrink-0" />
              ) : (
                <SidebarTrigger className="size-8" />
              )}
              <motion.div
                variants={sidebarVariant}
                animate={open ? "open" : "closed"}
                className="flex w-full items-center justify-between text-xl font-extrabold"
              >
                <span>CheckMate</span>
                <SidebarTrigger />
              </motion.div>
            </div>
          </SidebarHeader>
          <SidebarContent className="flex-1 overflow-y-auto">
            <SidebarGroup>
              <SidebarGroupLabel>Options</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item, idx) => (
                    <SidebarMenuItem key={idx}>
                      <SidebarMenuButton asChild>
                        <Link href={item.href}>
                          {item.icon}
                          {item.label}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="shrink-0 px-0 pb-0">
            {mounted ? (
              <DropdownMenu>
                <DropdownMenuTrigger disabled={!open}>
                  <div
                    className={cn(
                      "flex shrink-0 items-center rounded-t-2xl transition-all duration-300",
                      showFooterDetails
                        ? "justify-start gap-2 bg-neutral-200 px-4 py-2"
                        : "bg-sidebar justify-center pb-2"
                    )}
                  >
                    <Avatar
                      className={cn(
                        "flex shrink-0 items-center justify-center bg-neutral-300 transition-all duration-300",
                        open ? "size-10" : "size-8"
                      )}
                    >
                      {session?.data?.user?.image ? (
                        <img
                          src={session.data.user.image}
                          alt={userData?.name || "User"}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <User className="size-5 text-black" />
                      )}
                    </Avatar>
                    <AnimatePresence
                      onExitComplete={() => setShowFooterDetails(false)}
                    >
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-between gap-3"
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="text-md max-w-[120px] truncate font-medium text-neutral-900/70">
                              {userData?.name || "Player"}
                            </span>
                            <div className="flex w-fit items-center justify-between gap-1 rounded-full border border-yellow-500 bg-yellow-500/30 px-2 py-0.5">
                              <Star
                                size={12}
                                className="fill-current text-yellow-700"
                              />
                              <span className="text-xs font-semibold text-yellow-700">
                                {userData?.rating || 0}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="flex w-[--radix-dropdown-menu-trigger-width] min-w-56 flex-col gap-1 rounded-xl p-1 pb-1.5"
                  side="top"
                  align="start"
                  sideOffset={10}
                >
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link
                      href={`/dashboard/profile/${session.data?.user.id}`}
                      className="flex w-full items-center"
                    >
                      <User className="mr-2 size-4" />
                      <span>Show Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex w-full cursor-pointer items-center bg-red-400/20 text-red-700 focus:bg-red-400/30 focus:text-red-800"
                    onClick={async () => {
                      await signOut();
                    }}
                  >
                    <LogOut className="mr-2 size-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex shrink-0 items-center justify-center pb-2">
                <Avatar className="flex size-8 shrink-0 items-center justify-center bg-neutral-300">
                  {session?.data?.user?.image ? (
                    <img
                      src={session.data.user.image}
                      alt="User"
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <User className="size-5 text-black" />
                  )}
                </Avatar>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>
        <div className="bg-background w-full rounded-tl-xl p-5">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
