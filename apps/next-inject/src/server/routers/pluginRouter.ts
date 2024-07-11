import { db } from "@/db"
import { transactions } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { stripePluginNameToCliName } from "@/lib/utils"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const pluginRouter = createTRPCRouter({
  hasPlugin: protectedProcedure
    .input(z.object({ priceId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        if (input.priceId !== "Undefined") {
          const transactionForPlugin = await db
            .select()
            .from(transactions)
            .where(
              and(
                eq(transactions.priceId, input.priceId),
                eq(transactions.userId, ctx.session.user.id)
              )
            )
          if (transactionForPlugin.length === 1) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } catch (error) {
        return false
      }
    }),

  getApiKey: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session.user.id
  }),
  getOwnedPlugins: protectedProcedure.query(async ({ ctx }) => {
    const data = await db
      .select({ productName: transactions.productName })
      .from(transactions)
      .where(eq(transactions.userId, ctx.session.user.id))

    const parsedPluginNames = data.map(({ productName }) => ({
      originalName: productName,
      parsedName: stripePluginNameToCliName(productName),
    }))

    return parsedPluginNames
  }),
})
