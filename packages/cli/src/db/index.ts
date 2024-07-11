import { createClient, type Client } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

import * as schema from "./schema"

import * as dotenv from "dotenv"
import { expand } from "dotenv-expand"

const config = dotenv.config()
expand(config)

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
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  })

if (process.env.NODE_ENV !== "production") globalForDb.client = turso

export const db = drizzle(turso, { schema })

export type DbClient = typeof db
