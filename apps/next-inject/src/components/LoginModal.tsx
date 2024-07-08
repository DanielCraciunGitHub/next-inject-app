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
import { authenticate } from "@/app/_actions/authenticate"

import { Google } from "./SVG/Google"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

interface LoginModalProps {
  buttonNode: ReactNode
}

export const LoginModal = ({ buttonNode }: LoginModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{buttonNode}</DialogTrigger>
      <DialogContent className="flex flex-col border-muted">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold">Login</DialogTitle>
          <DialogDescription className="text-lg">
            Login Today!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Button
          variant="secondary"
          className="space-x-2"
          onClick={() => authenticate("google")}
        >
          <Google />
          <span>Sign In with Google</span>
        </Button>
      </DialogContent>
    </Dialog>
  )
}
