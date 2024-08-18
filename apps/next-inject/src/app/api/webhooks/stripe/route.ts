import { randomUUID } from "crypto"
import { headers } from "next/headers"
import { db } from "@/db"
import { transactions, users } from "@/db/schema"
import { env } from "@/env.mjs"
import Stripe from "stripe"

import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { sendWelcomeEmail } from "@/app/_actions/email"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.NODE_ENV === "development"
        ? env.STRIPE_WEBHOOK_TEST_SECRET
        : env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    const { data } = await stripe.checkout.sessions.listLineItems(session.id)
    const paymentIntent = session.payment_intent!.toString()

    let productData: { priceId: string; productName: string }[] = []
    for (const item of data) {
      const priceId = item.price!.id
      const { name: productName } = await stripe.products.retrieve(
        item.price!.product.toString()
      )
      productData.push({ priceId, productName })
    }

    const email = session.customer_details!.email!
    const name = session.customer_details!.name!

    const userSession = await auth()

    let id: string
    if (userSession) {
      id = userSession.user.id
    } else {
      id = (
        await db
          .insert(users)
          .values({ email, name, id: randomUUID() })
          .returning()
      )[0].id
    }
    await db.transaction(async (tx) => {
      for (const { priceId, productName } of productData) {
        await tx.insert(transactions).values({
          paymentIntent,
          userId: id,
          priceId,
          productName,
        })
      }
    })

    await sendWelcomeEmail({ name, email })
  }

  return new Response(null, { status: 200 })
}
