import { siteConfig } from "@/config"
import { z } from "zod"

import { stripe } from "@/lib/stripe"
import { formatPluginPrice } from "@/lib/utils"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const paymentRouter = createTRPCRouter({
  getStripeUrl: protectedProcedure
    .input(
      z.object({
        priceId: z.string(),
        pathname: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${siteConfig.url}/dashboard`,
          cancel_url: `${siteConfig.url}${input.pathname}`,
          payment_method_types: ["card", "paypal"],
          mode: "payment",
          line_items: [
            {
              price: input.priceId,
              quantity: 1,
            },
          ],
          metadata: {
            userId: ctx.session.user.id,
          },
          customer_email: ctx.session.user.email!,
          allow_promotion_codes: true,
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
        if (input.priceId === "Undefined") {
          return undefined
        } else {
          const price = await stripe.prices.retrieve(input.priceId)

          return formatPluginPrice(price.currency, price.unit_amount! / 100)
        }
      } catch (error) {
        return undefined
      }
    }),
})
