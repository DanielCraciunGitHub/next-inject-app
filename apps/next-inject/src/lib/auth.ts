import { db } from "@/db"
import { env } from "@/env.mjs"
import { Adapter } from "@auth/core/adapters"
import Google from "@auth/core/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth, { DefaultSession } from "next-auth"
import GitHub from "next-auth/providers/github"

declare module "@auth/core/types" {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    Google,
    GitHub({
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  trustHost: true,
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id
        session.user.name = user.name
        session.user.email = user.email
        session.user.image = user.image
      }

      return session
    },
  },

  secret: env.AUTH_SECRET,
})
