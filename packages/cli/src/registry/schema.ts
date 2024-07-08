import { z } from "zod"

export const registryItemSchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  type: z.enum(["plugin:bundle", "plugin:component", "plugin:service"]),

  files: z.array(z.string()),
})
