"use client";

import Link from "next/link";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GamesPagination({
  page,
  totalPages,
  userId,
}: {
  page: number;
  totalPages: number;
  userId: string;
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 justify-start">
        <Link
          href={`/dashboard/profile/${userId}?page=${Math.max(1, page - 1)}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            page <= 1 && "pointer-events-none opacity-50"
          )}
          tabIndex={page <= 1 ? -1 : undefined}
          aria-disabled={page <= 1}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Link>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <span className="text-muted-foreground text-sm">
          Page <span className="text-foreground font-medium">{page}</span> of{" "}
          <span className="text-foreground font-medium">{totalPages || 1}</span>
        </span>
      </div>

      <div className="flex flex-1 justify-end">
        <Link
          href={`/dashboard/profile/${userId}?page=${Math.min(totalPages, page + 1)}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            page >= totalPages && "pointer-events-none opacity-50"
          )}
          tabIndex={page >= totalPages ? -1 : undefined}
          aria-disabled={page >= totalPages}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
