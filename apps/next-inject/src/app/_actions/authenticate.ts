"use server"

import { auth, signIn, signOut } from "@/lib/auth"

export async function authenticate(provider: "google" | "github") {
  const session = await auth()
  if (session) {
    await signOut()
  } else {
    await signIn(provider)
  }
}
