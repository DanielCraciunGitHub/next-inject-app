"use client"

import { ReactNode } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EmailProvider } from "@/app/(Auth)/login/EmailProvider"
import { SocialProviders } from "@/app/(Auth)/login/SocialProviders"

import { WordedSeparator } from "./WordedSeparator"

interface LoginModalProps {
  children: ReactNode
}

export const LoginModal = ({ children }: LoginModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col space-y-0 border-muted">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold">Login</DialogTitle>
          <DialogDescription>Join Next Inject today</DialogDescription>
        </DialogHeader>

        <SocialProviders />
        <WordedSeparator word="or" />
        <EmailProvider />
      </DialogContent>
    </Dialog>
  )
}
