import { siteConfig } from "@/config"
import { z } from "zod"

import { stripe } from "@/lib/stripe"
import { formatPluginPrice } from "@/lib/utils"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const paymentRouter = createTRPCRouter({
  getStripeUrl: protectedProcedure
    .input(
      z.object({
        priceIds: z.array(z.string()),
        pathname: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${siteConfig.url}/dashboard`,
          cancel_url: `${siteConfig.url}${input.pathname}`,
          payment_method_types: ["card"],
          mode: "payment",
          line_items: input.priceIds.map((priceId) => ({
            price: priceId,
            quantity: 1,
          })),
          metadata: {
            userId: ctx.session.user.id,
          },
          customer_email: ctx.session.user.email!,

          discounts:
            input.priceIds.length === 1
              ? [
                  {
                    promotion_code: "promo_1PjJZ6EPAN9phIe0KT29Z2K8",
                  },
                ]
              : [],
        })
        return stripeSession.url!
      } catch (error) {
        console.error(error)
      }
    }),
  getPluginPrice: publicProcedure
    .input(z.object({ priceId: z.string().optional() }))
    .query(async ({ input }) => {
      try {
        if (!input.priceId) {
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
