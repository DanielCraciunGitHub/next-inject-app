import { db } from "@/db"
import { env } from "@/env.mjs"
import { Adapter } from "@auth/core/adapters"
import Google from "@auth/core/providers/google"
import Resend from "@auth/core/providers/resend"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth, { DefaultSession } from "next-auth"
import GitHub from "next-auth/providers/github"
import GitLab from "next-auth/providers/gitlab"

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
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    GitLab({
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      allowDangerousEmailAccountLinking: true,
    }),
    Resend({
      apiKey: env.RESEND_KEY,
      from: "auth@danielfullstack.com",
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
