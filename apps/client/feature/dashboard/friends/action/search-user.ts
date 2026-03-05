"use server";
import prisma from "@repo/prisma/client";

import { auth } from "@/lib/auth";

export async function searchUsers(query: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;

  if (!query || query.length < 2) return [];

  /*
    Get:
    - Friends
    - Pending sent
    - Pending received
  */

  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [{ user1Id: userId }, { user2Id: userId }],
    },
  });

  const friendIds = friendships.map((f) =>
    f.user1Id === userId ? f.user2Id : f.user1Id
  );

  const sent = await prisma.friendRequest.findMany({
    where: { fromId: userId, status: "PENDING" },
  });

  const received = await prisma.friendRequest.findMany({
    where: { toId: userId, status: "PENDING" },
  });

  const excludedIds = [
    userId,
    ...friendIds,
    ...sent.map((r) => r.toId),
    ...received.map((r) => r.fromId),
  ];

  const users = await prisma.user.findMany({
    where: {
      id: { notIn: excludedIds },
      username: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 20,
  });

  return users;
}
