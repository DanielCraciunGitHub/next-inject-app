import { defineConfig } from "drizzle-kit"

import { env } from "./src/env.mjs"

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  driver: "turso",
  verbose: true,
})