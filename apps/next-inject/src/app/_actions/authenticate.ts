"use server"

import { headers } from "next/headers"
import { ActionResponse } from "@/types"
import { BuiltInProviderType } from "@auth/core/providers"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

import { auth, signIn, signOut } from "@/lib/auth"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "60 m"),
})

export async function authenticate(provider: BuiltInProviderType) {
  const session = await auth()
  if (session) {
    await signOut()
  } else {
    await signIn(provider)
  }
}
export async function signOutAction({ redirectTo }: { redirectTo: string }) {
  await signOut({ redirectTo })
}

interface AuthResend {
  redirectTo: string
  email: string
}
export async function authenticateResend({
  redirectTo,
  email,
}: AuthResend): Promise<ActionResponse> {
  const ip = headers().get("x-forwarded-for") ?? ""
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return {
      ok: false,
      code: 429,
      error: "Error, please try again later",
    }
  }

  await signIn("resend", {
    email,
    redirect: false,
    callbackUrl: redirectTo === "/login" ? "/dashboard" : redirectTo,
  })

  return {
    ok: true,
    code: 200,
  }
}
