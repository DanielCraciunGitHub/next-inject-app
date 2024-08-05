"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { WordedSeparator } from "@/components/WordedSeparator"

import { EmailProvider } from "./EmailProvider"
import { SocialProviders } from "./SocialProviders"

interface LoginFormProps {}

export const LoginForm = ({}: LoginFormProps) => {
  return (
    <Card className="w-[400px]">
      <CardContent className="flex flex-col space-y-2 border-muted">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">Login</CardTitle>
          <CardDescription>Join Next Inject today</CardDescription>
        </CardHeader>

        <SocialProviders />
        <WordedSeparator word="or" />
        <EmailProvider />
      </CardContent>
    </Card>
  )
}
