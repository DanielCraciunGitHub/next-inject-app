import { db } from "@/db"
import { users } from "@/db/schema"
import { eq, InferSelectModel } from "drizzle-orm"

import { createTRPCRouter, publicProcedure } from "../trpc"

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(async ({ ctx }) => {
    return ctx.session
  }),
  getRole: publicProcedure.query(
    async ({ ctx }): Promise<InferSelectModel<typeof users>["role"]> => {
      if (ctx.session) {
        const [data] = await db
          .select({ role: users.role })
          .from(users)
          .where(eq(users.id, ctx.session.user.id))
        return data.role
      } else {
        return "USER"
      }
    }
  ),
})
