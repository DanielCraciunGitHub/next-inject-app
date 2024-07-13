import path from "path"
import { Command } from "commander"
import ora from "ora"
import { z } from "zod"

import { injectGithubFileContent } from "../utils/file-manager"
import { handleError } from "../utils/handle-error"
import { logger } from "../utils/logger"

const optionsSchema = z.object({
  cwd: z.string(),
})

export const metadata = new Command()
  .name("metadata")
  .description("Inject metadata into your app")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async function (this: Command, opts) {
    const spinner = ora(`Injecting ${this.name()} plugin...`).start()

    try {
      const options = optionsSchema.parse({
        ...opts,
      })

      const cwd = path.resolve(options.cwd)

      const metadataFile = "src/config/metadata.tsx"
      const mainPageFile = "src/app/(Navigation)/page.tsx"
      const mainLayoutFile = "src/app/layout.tsx"

      await injectGithubFileContent(cwd, metadataFile, this.name())
      await injectGithubFileContent(cwd, mainPageFile, this.name())
      await injectGithubFileContent(cwd, mainLayoutFile, this.name())

      spinner.stopAndPersist()
      logger.success(`Successfully Injected the ${this.name()} plugin!`)
    } catch (error) {
      handleError(error)
    } finally {
      spinner.stop()
    }
  })
