import path from "path"
import { Command } from "commander"

import { injectGithubFile } from "../utils/file-injection"
import { handleError } from "../utils/handle-error"
import { optionsSchema } from "./add"

export const reactEmail = new Command()
  .name("react-email")
  .description("Inject metadata into your app")
  .action(async function (this: Command, opts) {
    try {
      const options = optionsSchema.parse({
        ...opts,
      })

      const cwd = path.resolve(options.cwd)

      const metadataFile = "src/config/metadata.tsx"
      const mainPageFile = "src/app/(Navigation)/page.tsx"
      const mainLayoutFile = "src/app/layout.tsx"

      // await injectGithubFile(cwd, metadataFile, this.name())
      // await injectGithubFile(cwd, mainPageFile, this.name())
      // await injectGithubFile(cwd, mainLayoutFile, this.name())
    } catch (error) {
      handleError(error)
    }
  })
