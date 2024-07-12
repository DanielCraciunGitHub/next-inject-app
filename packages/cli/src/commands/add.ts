import { Command } from "commander"
import { z } from "zod"

import { handleError } from "../utils/handle-error"

import { metadata } from "./metadata"

import { db } from "@/src/db"
import { transactions } from "@/src/db/schema"
import { and, eq } from "drizzle-orm"
import { loadKey } from "./auth"

const addOptionsSchema = z.object({
  plugin: z.string().optional(),
  //   yes: z.boolean(),
  //   overwrite: z.boolean(),
  // cwd: z.string(),
  // ?   all: z.boolean(),
  //   path: z.string().optional(),
})

export const add = new Command()
  .name("add")
  .description("add a new plugin")
  .argument("plugin", "the plugin to inject")
  .hook("preSubcommand", async (thisCommand: Command, subCommand: Command) => {
    try {
      await authenticate(subCommand.name())
    } catch (error) {
      handleError(error)
    }
  })
  .action(async (plugin, opts) => {
    try {
      const options = addOptionsSchema.parse({
        plugin,
        ...opts,
      })
    } catch (error) {
      handleError(error)
    }
  })
  // ! Add new commands here
  .addCommand(metadata)

export const authenticate = async (plugin?: string) => {
  if (plugin) {
    const pluginName = cliNameToStripePluginName(plugin)
    const [authenticated] = await db
      .select()
      .from(transactions)
      .where(
        and(
          eq(transactions.productName, pluginName),
          eq(transactions.userId, loadKey())
        )
      )

    if (authenticated) {
      return
    } else {
      throw new Error("Please authenticate with the CLI")
    }
  } else {
    throw new Error("Please enter a plugin name")
  }
}

export function cliNameToStripePluginName(name: string): string {
  return (
    name
      .replace("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim() + " Plugin"
  )
}
