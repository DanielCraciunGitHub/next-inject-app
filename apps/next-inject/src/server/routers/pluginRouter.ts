import { db } from "@/db"
import { transactions } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const pluginRouter = createTRPCRouter({
  hasPlugin: protectedProcedure
    .input(z.object({ priceId: z.string() }))
    .query(async ({ ctx, input }) => {
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
    }),
})
