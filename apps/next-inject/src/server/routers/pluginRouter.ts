import { siteConfig } from "@/config"
import { db } from "@/db"
import { transactions, users } from "@/db/schema"
import { and, eq, not } from "drizzle-orm"
import { z } from "zod"

import { stripePluginNameToCliName } from "@/lib/utils"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const pluginRouter = createTRPCRouter({
  hasPlugin: publicProcedure
    .input(z.object({ priceId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      try {
        if (!input.priceId) return false
        if (input.priceId.includes("Free")) return true

        if (ctx.session) {
          const transactionForPlugin = await db
            .select()
            .from(transactions)
            .where(
              and(
                eq(transactions.priceId, input.priceId),
                eq(transactions.userId, ctx.session.user.id)
              )
            )
          return transactionForPlugin.length === 1 ? true : false
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

  getPluginPurchases: publicProcedure.query(async ({ ctx }) => {
    try {
      const purchaseUsers = await ctx.db
        .select({ name: users.name, image: users.image })
        .from(users)
        .where(not(eq(users.email, siteConfig.email)))

      const count = purchaseUsers.length

      return { count, users: purchaseUsers.slice(6, 12) }
    } catch (error) {
      console.error(error)
      return { count: 0, users: null }
    }
  }),
})
