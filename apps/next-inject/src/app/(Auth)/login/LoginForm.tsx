"use client"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Google } from "@/components/SVG/Google"
import { authenticate } from "@/app/_actions/authenticate"

interface LoginFormProps {}

export const LoginForm = ({}: LoginFormProps) => {
  return (
    <AlertDialog open defaultOpen>
      <AlertDialogContent className="flex flex-col border-muted">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-4xl font-bold">
            Login
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            Login Today!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <Button
          variant="secondary"
          className="space-x-2"
          onClick={() => authenticate("google")}
        >
          <Google />
          <span>Sign In with Google</span>
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  )
}
