import dotenv from "dotenv"
import type { Config } from "drizzle-kit"

import { env } from "./src/env.mjs"

dotenv.config({ path: ".env.local" })

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  driver: "turso",
} satisfies Config
