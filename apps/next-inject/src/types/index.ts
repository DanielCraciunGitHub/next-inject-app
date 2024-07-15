import { AppRouter } from "@/server"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import React from "react"

export type NavItem = {
  href: string
  emoji?: string
} & (
  | {
      name: string
    }
  | {
      icon: React.ReactNode
    }
)
export type SocialLink = {
  href: string
  name: string
  icon: React.ReactNode
}
export type ActionResponse = {
  ok: boolean
  error?: string
  code?: number
}

export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>