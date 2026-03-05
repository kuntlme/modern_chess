"use server";

import prisma from "@repo/prisma/client";

import { auth } from "@/lib/auth";

export async function getFriendsData() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;

  /*
    FRIENDS
  */
  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [{ user1Id: userId }, { user2Id: userId }],
    },
    include: {
      user1: true,
      user2: true,
    },
  });

  const friends = friendships.map((f) =>
    f.user1Id === userId ? f.user2 : f.user1
  );

  /*
    SENT REQUESTS
  */
  const sent = await prisma.friendRequest.findMany({
    where: {
      fromId: userId,
      status: "PENDING",
    },
    include: { to: true },
  });

  /*
    RECEIVED REQUESTS
  */
  const received = await prisma.friendRequest.findMany({
    where: {
      toId: userId,
      status: "PENDING",
    },
    include: { from: true },
  });

  /*
    SUGGESTED
  */
  const excludedIds = new Set<string>([
    userId,
    ...friends.map((f) => f.id),
    ...sent.map((r) => r.toId),
    ...received.map((r) => r.fromId),
  ]);

  const suggested = await prisma.user.findMany({
    where: {
      id: { notIn: Array.from(excludedIds) },
    },
    take: 20,
  });

  return {
    friends,
    suggested,
    sent,
    received,
  };
}
