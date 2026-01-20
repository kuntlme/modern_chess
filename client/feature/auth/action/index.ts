"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";



export const getUserById = async (id:string)=>{
    try {
        const user = await prisma.user.findUnique({
            where:{id},
            include:{accounts:true}
        })
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAccountByUserId = async (userId:string)=>{
    try {
        const account = await prisma.account.findFirst({
            where:{
                userId
            }
        })
        return account
    } catch (error) {
        console.log(error)
        return null
    }
}

export const currentUser = async()=>{
    const user = await auth()
    return user?.user;
}

export const handleSignIn = async () => {
    await signIn();
}

export const handleSignOut = async () => {
    await signOut();
}