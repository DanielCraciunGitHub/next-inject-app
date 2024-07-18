import { Command, Option } from "commander"

import { handleError } from "../utils/handle-error"

import { metadata } from "./plugins/metadata"

import { loadUserKey } from "./auth"
import axios from "axios"
import { logger } from "../utils/logger"
import { NEXTJS_APP_URL } from "../utils/config-info"
import ora from "ora"
import { reactEmail } from "./plugins/react-email"
import { z } from "zod"
import path from "path"
import { isNextInjectProject, isNextjsProject } from "../utils/project-info"
import prompts from "prompts"
import { bootstrap } from "./bootstrap"
import { init } from "./init"
import chalk from "chalk"
import { nextAuth } from "./plugins/next-auth"

export const addSpinner = ora()
export let branch: string = "master"

export let cwd: string = process.cwd()
export function setGlobalCwd(inputCwd: string) {
  cwd = inputCwd
}

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
      addSpinner.start(
        `Checking for permission to install the ${subCommand.name()} plugin...`
      )
      const res = await axios.post(`${NEXTJS_APP_URL}/api/cli`, {
        pluginName: cliNameToStripePluginName(subCommand.name()),
        authKey: loadUserKey(),
      })

      if (res.status !== 200) {
        logger.error(
          `\nERROR: Please authenticate and purchase this plugin here:\n${NEXTJS_APP_URL}/plugins/${subCommand.name()}`
        )
        logger.warn(
          `Also, find configuration instructions at ${NEXTJS_APP_URL}/dashboard`
        )
        handleError(res.statusText)
      }

      addSpinner.succeed("Permission Granted!")
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
    const options = optionsSchema.parse({
      ...subCommand.opts(),
    })
    cwd = path.resolve(options.cwd)
    branch = subCommand.name()

    if (!isNextjsProject()) {
      const { createProject } = await prompts([
        {
          name: "createProject",
          type: "confirm",
          message:
            "Next.js project has not been detected, should we create one for you?",
        },
      ])
      if (createProject) {
        await init.parseAsync()
      } else {
        process.exit(1)
      }
    } else if (!isNextInjectProject()) {
      const { bootstrapProject } = await prompts([
        {
          name: "bootstrapProject",
          type: "confirm",
          message:
            "Next Inject has not been bootstrapped to this application, should we do this for you?",
        },
      ])
      if (bootstrapProject) {
        await bootstrap.parseAsync()
      } else {
        process.exit(1)
      }
    }

    logger.break()
    addSpinner.start(`Injecting ${chalk.green(subCommand.name())} plugin...`)
    addSpinner.stopAndPersist()
  })
  .hook("postAction", async (thisCommand: Command, subCommand: Command) => {
    logger.break()
    addSpinner.succeed(
      `⚡ Finished injecting the ${chalk.green(subCommand.name())} plugin!`
    )
    logger.success(
      `Please review the documentation for this plugin here:\n${NEXTJS_APP_URL}/plugins/${subCommand.name()}`
    )
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
  .addCommand(nextAuth)

export function cliNameToStripePluginName(name: string): string {
  return (
    name
      .replace("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim() + " Plugin"
  )
}
