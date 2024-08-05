"use client"

import { usePathname } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { emailAuthSchema } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import Input from "@/components/InputField"

type Inputs = z.infer<typeof emailAuthSchema>

export const EmailProvider = () => {
  const pathname = usePathname()
  const form = useForm<Inputs>({
    resolver: zodResolver(emailAuthSchema),
    defaultValues: {
      email: "",
    },
  })
  async function onSubmit({ email }: Inputs) {
    try {
      await signIn("resend", {
        email,
        redirect: false,
        callbackUrl: pathname === "/login" ? "/dashboard" : pathname,
      })

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
        <Button type="submit">Get Magic Link</Button>
      </form>
    </Form>
  )
}
