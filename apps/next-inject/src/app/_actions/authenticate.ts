"use server"

import { BuiltInProviderType } from "@auth/core/providers"

import { auth, signIn, signOut } from "@/lib/auth"

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
