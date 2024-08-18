import { headers } from "next/headers"
import { db } from "@/db"
import { transactions } from "@/db/schema"
import { env } from "@/env.mjs"
import Stripe from "stripe"

import { stripe } from "@/lib/stripe"

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

    let productData: { priceId: string; productName: string }[] = []
    for (const item of data) {
      const priceId = item.price!.id
      const { name: productName } = await stripe.products.retrieve(
        item.price!.product.toString()
      )
      productData.push({ priceId, productName })
    }

    const userId = session.metadata!.userId
    const paymentIntent = session.payment_intent!.toString()

    console.log(
      productData.map(({ priceId, productName }) => ({
        paymentIntent,
        userId,
        priceId,
        productName,
      }))
    )

    await db.transaction(async (tx) => {
      for (const { priceId, productName } of productData) {
        await tx.insert(transactions).values({
          paymentIntent,
          userId,
          priceId,
          productName,
        })
      }
    })
  }

  return new Response(null, { status: 200 })
}
