import { env } from "@/env.mjs"
import { createClient, type Client } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

import * as schema from "./schema"

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined
}

export const turso =
  globalForDb.client ??
  createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  })

if (process.env.NODE_ENV !== "production") globalForDb.client = turso

export const db = drizzle(turso, { schema })

export type DbClient = typeof db
