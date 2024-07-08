"use client"

import { Session } from "@auth/core/types"
import { LogInIcon, LogOutIcon } from "lucide-react"

import { authenticate } from "@/app/_actions/authenticate"

import { Button } from "../ui/button"

interface AuthSession {
  session?: Session | null
}

export default function AuthButton({ session }: AuthSession) {
  return session ? (
    <>
      <div>Welcome {session.user.name}</div>
      <Button onClick={() => authenticate("google")}>
        <LogOutIcon />
      </Button>
    </>
  ) : (
    <Button onClick={() => authenticate("google")}>
      <LogInIcon />
    </Button>
  )
}
