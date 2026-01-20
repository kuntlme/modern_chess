"use client"
import { Button } from "@/components/ui/button";
import { handleSignIn, handleSignOut } from "@/feature/auth/action";
import { useCurrentUser } from "@/feature/auth/hooks/use-current-user";

export default function Home() {
  const currentUser = useCurrentUser();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {!!currentUser ? <Button onClick={() => {
        handleSignOut()
      }}>Sign Out</Button> : <Button
      onClick={async() => {
        handleSignIn()
      }}
      >Sign in</Button>}
    </div>
  );
}
