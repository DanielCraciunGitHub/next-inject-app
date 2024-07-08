import { headers } from "next/headers"
import Stripe from "stripe"

import { stripe } from "@/lib/stripe"
import { env } from "@/env.mjs"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.NODE_ENV === "development" ? env.STRIPE_WEBHOOK_TEST_SECRET : env.STRIPE_WEBHOOK_SECRET

    )
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    console.log(session)
    // Confirmation email logic here...
  }

  return new Response(null, { status: 200 })
}
