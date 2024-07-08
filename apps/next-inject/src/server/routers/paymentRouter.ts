import { siteConfig } from "@/config"
import { z } from "zod"

import { stripe } from "@/lib/stripe"
import { formatPluginPrice } from "@/lib/utils"

import { createTRPCRouter, publicProcedure } from "../trpc"

export const paymentRouter = createTRPCRouter({
  getStripeUrl: publicProcedure
    .input(z.object({ priceId: z.string() }))
    .query(async ({ input }) => {
      try {
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${siteConfig.url}/ebook?purchase=success`,
          cancel_url: `${siteConfig.url}/ebook`,
          payment_method_types: ["card", "paypal"],
          mode: "payment",
          billing_address_collection: "auto",
          line_items: [
            {
              price: input.priceId,
              quantity: 1,
            },
          ],
        })
        return stripeSession.url!
      } catch (error) {
        console.error(error)
      }
    }),
  getPluginPrice: publicProcedure
    .input(z.object({ priceId: z.string() }))
    .query(async ({ input }) => {
      try {
        const price = await stripe.prices.retrieve(input.priceId)
        console.log(price)
        return formatPluginPrice(price.currency, price.unit_amount! / 100)
      } catch (error) {
        return "Free"
      }
    }),
})
