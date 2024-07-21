"use client"

import { Session } from "@auth/core/types"
import { LogOutIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { signOutAction } from "@/app/_actions/authenticate"

interface AuthSession {
  session?: Session | null
}

export function LogoutButton({ session }: AuthSession) {
  return session ? (
    <>
      <Button
        onClick={async () => {
          await signOutAction({ redirectTo: "/plugins" })
        }}
        variant={"destructive"}
      >
        <LogOutIcon />
      </Button>
    </>
  ) : null
}
