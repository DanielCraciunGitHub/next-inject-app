import { Command } from "commander"

import { handleError } from "../utils/handle-error"
import { cwd, optionsSchema, setGlobalCwd } from "./add"

import path from "path"
import replaceInFile from "replace-in-file"
import prompts from "prompts"
import {
  getNextInjectConfig,
  isNextInjectProject,
} from "../utils/get-package-info"
import ora from "ora"

export const rename = new Command()
  .name("rename")
  .description("Globally change the name of your Next Inject project")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async function (this: Command, opts) {
    const spinner = ora()

    try {
      const options = optionsSchema.parse({
        ...opts,
      })
      setGlobalCwd(path.resolve(options.cwd))

      if (!isNextInjectProject()) {
        handleError(
          "You haven't created a next inject project yet.\nRun the `init` or `bootstrap` commands to get started!"
        )
      }

      const { projectName } = await prompts([
        {
          name: "projectName",
          type: "text",
          message: "Enter your new project name:",
        },
      ])
      const config = getNextInjectConfig()

      spinner.start(`Renaming...`)

      await replaceInFile({
        files: [path.join(cwd, "*"), path.join(cwd, "src/**")],
        from: [new RegExp(`${config.name}`, "g")],
        to: [projectName],
        ignore: [path.join(cwd, "node_modules/**/*")],
        glob: {
          windowsPathsNoEscape: true,
        },
      })
      spinner.succeed(`Done!`)
    } catch (error) {
      handleError(error)
    }
  })
