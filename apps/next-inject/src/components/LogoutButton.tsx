"use client"

import { Session } from "@auth/core/types"
import { LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

interface AuthSession {
  session?: Session | null
}

export function LogoutButton({ session }: AuthSession) {
  return session ? (
    <>
      <Button onClick={async () => await signOut()} variant={"destructive"}>
        <LogOutIcon />
      </Button>
    </>
  ) : null
}
