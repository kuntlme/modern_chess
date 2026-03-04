"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
// adjust to your auth helper
import prisma from "@/lib/db";

/*
UTILITY
*/

function sortIds(a: string, b: string) {
  return a < b ? [a, b] : [b, a];
}

/*
SEND FRIEND REQUEST
*/

export async function sendFriendRequest(toUserId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const fromUserId = session.user.id;

  if (fromUserId === toUserId)
    throw new Error("You cannot send a request to yourself");

  // Already friends?
  const [u1, u2] = sortIds(fromUserId, toUserId);

  const existingFriendship = await prisma.friendship.findUnique({
    where: {
      user1Id_user2Id: {
        user1Id: u1,
        user2Id: u2,
      },
    },
  });

  if (existingFriendship) throw new Error("You are already friends");

  // Existing pending request either direction?
  const existingRequest = await prisma.friendRequest.findFirst({
    where: {
      OR: [
        { fromId: fromUserId, toId: toUserId },
        { fromId: toUserId, toId: fromUserId },
      ],
      status: "PENDING",
    },
  });

  // If reverse pending exists → auto accept
  if (existingRequest && existingRequest.fromId === toUserId) {
    return acceptFriendRequest(existingRequest.id);
  }

  if (existingRequest) throw new Error("Friend request already pending");

  await prisma.friendRequest.create({
    data: {
      fromId: fromUserId,
      toId: toUserId,
    },
  });

  revalidatePath("/friends");
}

/*
CANCEL FRIEND REQUEST
*/

export async function cancelFriendRequest(requestId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const request = await prisma.friendRequest.findUnique({
    where: { id: requestId },
  });

  if (!request) throw new Error("Request not found");

  if (request.fromId !== session.user.id) throw new Error("Not allowed");

  if (request.status !== "PENDING")
    throw new Error("Cannot cancel this request");

  await prisma.friendRequest.update({
    where: { id: requestId },
    data: { status: "CANCELLED" },
  });

  revalidatePath("/friends");
}

/*
ACCEPT FRIEND REQUEST
*/

export async function acceptFriendRequest(requestId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const request = await prisma.friendRequest.findUnique({
    where: { id: requestId },
  });

  if (!request) throw new Error("Request not found");

  if (request.toId !== session.user.id) throw new Error("Not allowed");

  if (request.status !== "PENDING") throw new Error("Request is not pending");

  const [u1, u2] = sortIds(request.fromId, request.toId);

  await prisma.$transaction([
    prisma.friendship.create({
      data: {
        user1Id: u1,
        user2Id: u2,
      },
    }),
    prisma.friendRequest.update({
      where: { id: requestId },
      data: { status: "ACCEPTED" },
    }),
  ]);

  revalidatePath("/friends");
}

/*
REJECT FRIEND REQUEST
*/

export async function rejectFriendRequest(requestId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const request = await prisma.friendRequest.findUnique({
    where: { id: requestId },
  });

  if (!request) throw new Error("Request not found");

  if (request.toId !== session.user.id) throw new Error("Not allowed");

  if (request.status !== "PENDING") throw new Error("Request is not pending");

  await prisma.friendRequest.update({
    where: { id: requestId },
    data: { status: "REJECTED" },
  });

  revalidatePath("/friends");
}

/*
REMOVE FRIEND
*/

export async function removeFriend(friendUserId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const [u1, u2] = sortIds(session.user.id, friendUserId);

  const friendship = await prisma.friendship.findUnique({
    where: {
      user1Id_user2Id: {
        user1Id: u1,
        user2Id: u2,
      },
    },
  });

  if (!friendship) throw new Error("Friendship does not exist");

  await prisma.friendship.delete({
    where: {
      user1Id_user2Id: {
        user1Id: u1,
        user2Id: u2,
      },
    },
  });

  revalidatePath("/friends");
}
