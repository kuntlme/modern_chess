"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import {
  ChessKing,
  Home,
  LayoutDashboard,
  LogOut,
  Play,
  Search,
  Settings,
  Star,
  User,
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
import { cn } from "@/lib/utils";

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
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: <Search />,
  },
  {
    label: "Friends",
    href: "/dashboard/friends",
    icon: <User />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings />,
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [showFooterDetails, setShowFooterDetails] = useState(open);

  useEffect(() => {
    if (open) setShowFooterDetails(true);
  }, [open]);

  const sidebarVarient = {
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
                variants={sidebarVarient}
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
                    <User className="size-5 text-black" />
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
                          <span className="text-md font-medium text-neutral-900/70">
                            Player1
                          </span>
                          <div className="flex w-fit items-center justify-between gap-1 rounded-full border border-yellow-500 bg-yellow-500/30 px-2 py-0.5">
                            <Star size={12} className="text-yellow-700" />
                            <span className="text-xs text-yellow-700">59</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="m-0 bg-red-400/30 text-red-700">
                  <LogOut className="text-red-700" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="bg-background w-full rounded-tl-xl p-5">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
