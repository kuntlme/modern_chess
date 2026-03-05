"use server";

import prisma from "@repo/prisma/client";

import { auth } from "@/lib/auth";

// export const showOnlineStatus = async (status: boolean) => {
//   const session = await auth();
//   if (!session) return;
//   try {
//     const userId = session.user.id;
//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         allowShowOnlineStatus: status,
//       },
//     });
//     if (updatedUser) return { success: true };
//   } catch (error) {
//     console.log(error);
//     throw new Error("Something went wrong while updating name");
//   }
// };

// export const friendRequest = async (request: boolean) => {
//   const session = await auth();
//   if (!session) return;
//   try {
//     const userId = session.user.id;
//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         allowFriendRequest: request,
//       },
//     });
//     if (updatedUser) return { success: true };
//   } catch (error) {
//     console.log(error);
//     throw new Error("Something went wrong while updating name");
//   }
// };

// export const showRating = async (isShowRating: boolean) => {
//   const session = await auth();
//   if (!session) return;
//   try {
//     const userId = session.user.id;
//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         allowShowRating: isShowRating,
//       },
//     });
//     if (updatedUser) return { success: true };
//   } catch (error) {
//     console.log(error);
//     throw new Error("Something went wrong while updating name");
//   }
// };

// export const showGameHistory = async (isShowGameHistory: boolean) => {
//   const session = await auth();
//   if (!session) return;
//   try {
//     const userId = session.user.id;
//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         allowShowGameHistory: isShowGameHistory,
//       },
//     });
//     if (updatedUser) return { success: true };
//   } catch (error) {
//     console.log(error);
//     throw new Error("Something went wrong while updating name");
//   }
// };
