import { z } from "zod"

export const emailAuthSchema = z.object({
  email: z.string().email(),
})
