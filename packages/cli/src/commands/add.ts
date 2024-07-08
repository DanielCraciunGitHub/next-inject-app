import { existsSync } from "fs"
import path from "path"
import { Command } from "commander"
import { z } from "zod"

import { handleError } from "../utils/handle-error"
import { logger } from "../utils/logger"
import { metadata } from "./metadata"

const addOptionsSchema = z.object({
  plugin: z.string().optional(),
  //   yes: z.boolean(),
  //   overwrite: z.boolean(),
  cwd: z.string(),
  // ?   all: z.boolean(),
  //   path: z.string().optional(),
})

export const add = new Command()
  .name("add")
  .description("add a new plugin")
  .argument("plugin", "the plugin to inject")
  .action(async (plugin, opts) => {
    try {
      const options = addOptionsSchema.parse({
        plugin,
        ...opts,
      })

      const cwd = path.resolve(options.cwd)

      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`)
        process.exit(1)
      }
    } catch (error) {
      handleError(error)
    }
  })
  // ! Add new commands here
  .addCommand(metadata)
