import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"
import { expand } from "dotenv-expand"

const config = dotenv.config()
expand(config)

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  driver: "turso",
} satisfies Config
