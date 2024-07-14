import { Command, Option } from "commander"

import { handleError } from "../utils/handle-error"

import { metadata } from "./metadata"

import { loadUserKey } from "./auth"
import axios from "axios"
import { logger } from "../utils/logger"
import { NEXTJS_APP_URL } from "../utils/config-info"
import ora from "ora"
import { reactEmail } from "./react-email"
import { z } from "zod"
import path from "path"
import { execa } from "execa"

const spinner = ora()

export const optionsSchema = z.object({
  cwd: z.string(),
})

export const add = new Command()
  .name("add")
  .description("add a new plugin")
  .argument("plugin", "the plugin to inject")
  .hook("preSubcommand", async (thisCommand: Command, subCommand: Command) => {
    subCommand.addOption(
      new Option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory."
      ).default(process.cwd())
    )

    try {
      const res = await axios.post("https://next-inject.vercel.app/api/cli", {
        pluginName: cliNameToStripePluginName(subCommand.name()),
        authKey: loadUserKey(),
      })

      if (res.status !== 200) {
        logger.error(
          `Please authenticate and purchase this plugin here:\n${NEXTJS_APP_URL}/plugins/${subCommand.name()}`
        )
        logger.warn(
          `Find configuration instructions at ${NEXTJS_APP_URL}/dashboard`
        )
        handleError(res.statusText)
      }
    } catch (error) {
      logger.error(
        `Please purchase this plugin from here: ${NEXTJS_APP_URL}/plugins/${subCommand.name()}`
      )
      logger.warn(
        `Find configuration instructions at ${NEXTJS_APP_URL}/dashboard\n`
      )
      handleError(error)
    }
  })
  .hook("preAction", async (thisCommand: Command, subCommand: Command) => {
    logger.break()
    spinner.start(`Injecting ${subCommand.name()} plugin...`)
  })
  .hook("postAction", async (thisCommand: Command, subCommand: Command) => {
    const options = optionsSchema.parse({
      ...subCommand.opts(),
    })
    const cwd = path.resolve(options.cwd)

    spinner.succeed(`⚡ Finished injecting the ${subCommand.name()} plugin!`)
    logger.info(`⚡ Injected at ${cwd}`)

    await execa("git add .", { cwd })
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
  .addCommand(reactEmail)

export function cliNameToStripePluginName(name: string): string {
  return (
    name
      .replace("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim() + " Plugin"
  )
}
