"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { emailAuthSchema } from "@/lib/validations"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { SpinnerButton } from "@/components/Buttons/SpinnerButton"
import Input from "@/components/InputField"
import { authenticateResend } from "@/app/_actions/authenticate"

type Inputs = z.infer<typeof emailAuthSchema>

export const EmailProvider = () => {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<Inputs>({
    resolver: zodResolver(emailAuthSchema),
    defaultValues: {
      email: "",
    },
  })
  async function onSubmit({ email }: Inputs) {
    setIsLoading(true)
    try {
      const res = await authenticateResend({ email, redirectTo: pathname })

      if (!res.ok) {
        throw new Error(res.error)
      }

      toast({
        title: "Success",
        description: "Please use the link from your email inbox to sign in",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      form.reset()
      setIsLoading(false)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <Input
          control={form.control}
          name="email"
          placeholder="johndoe@gmail.com"
          label="Login with email"
        />
        <SpinnerButton name="Get Magic Link" state={isLoading} type="submit" />
      </form>
    </Form>
  )
}
