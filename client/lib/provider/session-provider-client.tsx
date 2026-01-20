'use client'
import {SessionProvider} from "next-auth/react"
import type {Session} from "next-auth"
import React from "react";

interface Props {
  session: Session | null;
  children: React.ReactNode;
}

const SessionProviderClient = ({session, children}: Props) => {
  return (
    <SessionProvider session={session}>{children}</SessionProvider>
  )
}

export default SessionProviderClient