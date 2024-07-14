import path from "path"
import { Command } from "commander"

import { injectGithubFileContent } from "../utils/file-manager"
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

      await injectGithubFileContent(cwd, metadataFile, this.name())
      await injectGithubFileContent(cwd, mainPageFile, this.name())
      await injectGithubFileContent(cwd, mainLayoutFile, this.name())
    } catch (error) {
      handleError(error)
    }
  })
