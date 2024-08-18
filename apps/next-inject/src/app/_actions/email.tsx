"use server"

import { env } from "@/env.mjs"
import { Resend } from "resend"

import WelcomeEmail from "@/components/Emails/welcome"

const resend = new Resend(env.RESEND_KEY)

interface WelcomePayload {
  name: string
  email: string
}

// ! Send a welcome email from the client or from the server with ease using this function.
export const sendWelcomeEmail = async ({ name, email }: WelcomePayload) => {
  // ! Be sure to edit the `from` and `react` fields before sending.
  const { data, error } = await resend.emails.send({
    from: "Next Inject <noreply@danielfullstack.com>",
    to: [email],
    subject: `Next Inject Purchase Confirmation`,
    react: <WelcomeEmail firstName={name} />,
  })

  if (error) {
    return { ok: false, error }
  }

  return { ok: true, data }
}
