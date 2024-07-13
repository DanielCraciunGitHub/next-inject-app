import { Command } from "commander"

import { handleError } from "../utils/handle-error"

import { metadata } from "./metadata"

import { loadUserKey } from "./auth"
import axios from "axios"
import { logger } from "../utils/logger"

export const add = new Command()
  .name("add")
  .description("add a new plugin")
  .argument("plugin", "the plugin to inject")
  .hook("preSubcommand", async (thisCommand: Command, subCommand: Command) => {
    try {
      const res = await axios.post("https://next-inject.vercel.app/api/cli", {
        pluginName: cliNameToStripePluginName(subCommand.name()),
        authKey: loadUserKey(),
      })

      if (res.status !== 200) {
        logger.error("STATUS ERROR")
        throw new Error(res.statusText)
      }
    } catch (error) {
      logger.error("RESPONSE ERROR")
      handleError(error)
    }
  })
  .action(async (plugin, opts) => {
    try {
      throw new Error("This plugin does not exist")
    } catch (error) {
      handleError(error)
    }
  })
  // ! Add new commands here
  .addCommand(metadata)

export function cliNameToStripePluginName(name: string): string {
  return (
    name
      .replace("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim() + " Plugin"
  )
}
