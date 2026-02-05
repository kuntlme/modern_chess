"use client";
import React from "react";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface Props {
  session: Session | null;
  children: React.ReactNode;
}

const SessionProviderClient = ({ session, children }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderClient;
