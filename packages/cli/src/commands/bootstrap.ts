import { Command } from "commander"

import { injectGithubFiles, injectFile } from "../utils/file-injection"
import { merge, searchAndReplace } from "../utils/file-transforms"
import {
  extractBetweenMatchedLines,
  extractMatchedLines,
} from "../utils/file-extraction"
import { fetchLocalAndRemoteFile } from "../utils/file-fetching"
import { handleError } from "../utils/handle-error"
import { addSpinner, cwd, optionsSchema, setGlobalCwd } from "./add"
import { installDeps } from "../utils/package-management"
import path from "path"
import simpleGit from "simple-git"
import { initNextInjectConfig } from "../utils/project-info"
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
        await fetchLocalAndRemoteFile(mainLayoutPath)

      const nextInjectImport = extractMatchedLines({
        fileContent: remoteLayout,
        searchString: "import { NextInjectProvider",
      })!
      localLayout = merge(nextInjectImport, localLayout)

      const layoutProvider = extractBetweenMatchedLines({
        fileContent: remoteLayout,
        startString: "<NextInjectProvider",
        endString: "</NextInjectProvider>",
      })

      const finalContent = searchAndReplace({
        fileContent: localLayout,
        targetString: "{children}",
        newContent: layoutProvider,
      })

      injectFile({ filePath: mainLayoutPath, fileContent: finalContent })

      initNextInjectConfig({ projectName })

      const git = simpleGit({ baseDir: cwd })
      await git.init()
      git.add([indexConfig, mainLayoutPath, providers, types, nextInjectConfig])

      addSpinner.succeed("Finished bootstrapping next-inject!")
    } catch (error) {
      handleError(error)
    }
  })
