import { Command } from "commander"

import { handleError } from "../utils/handle-error"

import { metadata } from "./metadata"

import { loadKey } from "./auth"

export const add = new Command()
  .name("add")
  .description("add a new plugin")
  .argument("plugin", "the plugin to inject")
  .hook("preSubcommand", async (thisCommand: Command, subCommand: Command) => {
    try {
      const res = await fetch("http://next-inject.vercel.app/api/cli", {
        method: "POST",
        body: JSON.stringify({
          pluginName: cliNameToStripePluginName(subCommand.name()),
          authKey: loadKey(),
        }),
      })

      if (res.status !== 200) {
        throw new Error(res.statusText)
      }
    } catch (error) {
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
