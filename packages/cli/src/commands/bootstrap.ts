import { Command } from "commander"

import {
  injectGithubFiles,
  mergeFileContent,
  searchAndReplaceFileContent,
  injectFile,
} from "../utils/file-injection"
import {
  extractFileContentBetweenLines,
  getLocalAndRemoteFile,
  extractFileContentLines,
} from "../utils/file-extraction"
import { handleError } from "../utils/handle-error"
import { addSpinner, cwd, optionsSchema, setGlobalCwd } from "./add"
import { installDeps } from "../utils/package-management"
import path from "path"
import simpleGit from "simple-git"
import { initNextInjectConfig } from "../utils/get-package-info"
import prompts from "prompts"

export const bootstrap = new Command()
  .name("bootstrap")
  .description("Configure next-inject with your existing Next.js project")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async function (this: Command, opts) {
    try {
      const options = optionsSchema.parse({
        ...opts,
      })
      setGlobalCwd(path.resolve(options.cwd))

      const { projectName } = await prompts([
        {
          type: "text",
          name: "projectName",
          message: "Enter the desired project name:",
        },
      ])

      addSpinner.start("Installing dependencies...\n")
      addSpinner.stopAndPersist()

      await installDeps(["next-themes", "react-icons"])

      addSpinner.text = "Injecting files..."
      const indexConfig = "src/config/next-inject.tsx"
      const providers = "src/components/next-inject-providers.tsx"
      const types = "src/types/next-inject.ts"
      const nextInjectConfig = "next-inject.json"
      await injectGithubFiles({
        filePaths: [indexConfig, providers, nextInjectConfig, types],
      })

      const mainLayoutPath = "src/app/layout.tsx"
      let { rc: remoteLayout, lc: localLayout } =
        await getLocalAndRemoteFile(mainLayoutPath)

      const nextInjectImport = extractFileContentLines({
        fileContent: remoteLayout,
        searchString: "import { NextInjectProvider",
      })!
      localLayout = mergeFileContent(nextInjectImport, localLayout)

      const layoutProvider = extractFileContentBetweenLines({
        fileContent: remoteLayout,
        startString: "<NextInjectProvider",
        endString: "</NextInjectProvider>",
      })

      const finalContent = searchAndReplaceFileContent(
        localLayout,
        "{children}",
        layoutProvider
      )

      injectFile(mainLayoutPath, finalContent)

      initNextInjectConfig({ projectName })

      const git = simpleGit({ baseDir: cwd })
      await git.init()
      git.add([indexConfig, mainLayoutPath, providers, types, nextInjectConfig])

      addSpinner.succeed("Finished bootstrapping next-inject!")
    } catch (error) {
      handleError(error)
    }
  })