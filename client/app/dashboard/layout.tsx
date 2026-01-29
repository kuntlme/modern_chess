"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
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
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  {
    label: "Dashboard",
    href: "/dashboard/home",
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
      <div className="flex h-screen w-full bg-sidebar pt-2">
        <Sidebar
          collapsible="icon"
          className="border-none bg-sidebar flex flex-col"
        >
          <SidebarHeader className="pt-5 shrink-0">
            <div className="flex gap-2 w-full">
              {open ? (<ChessKing className="size-7 shrink-0" />) : (<SidebarTrigger className="size-8"/>)}
              <motion.div
                variants={sidebarVarient}
                animate={open ? "open" : "closed"}
                className="text-xl font-extrabold flex justify-between items-center w-full"
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

          <SidebarFooter className="px-0 pb-0 shrink-0">
            <div
              className={cn(
                "flex items-center rounded-2xl shrink-0 transition-all duration-300",
                showFooterDetails
                  ? "gap-2 bg-neutral-200 px-4 py-2 justify-start"
                  : "pb-2 bg-sidebar justify-center",
              )}
            >
              <Avatar className={cn("bg-neutral-300 flex justify-center items-center shrink-0 transition-all duration-300 ", open ? "size-10": "size-8")}>
                <User className="text-black" />
              </Avatar>
              <AnimatePresence onExitComplete={() => setShowFooterDetails(false)}>
               {open && <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 justify-between"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-md text-neutral-900/70 font-medium">
                      Player1
                    </span>
                    <div className="w-fit flex gap-1 justify-between items-center bg-yellow-500/30 border border-yellow-500 rounded-full px-2 py-0.5">
                      <Star size={12} className="text-yellow-700" />
                      <span className="text-xs text-yellow-700">59</span>
                    </div>
                  </div>

                  <LogOut className="text-red-500" />
                </motion.div>}
              </AnimatePresence>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="rounded-tl-4xl bg-neutral-300 w-full flex justify-center items-center p-5">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
