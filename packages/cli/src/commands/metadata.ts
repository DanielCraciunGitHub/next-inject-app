import { Command } from "commander"

import {
  injectGithubFiles,
  mergeFileContent,
  injectFile,
} from "../utils/file-injection"
import {
  extractFileContentBetweenLines,
  fileExists,
  getLocalAndRemoteFile,
  extractFileContentLinesRegex,
} from "../utils/file-extraction"
import { handleError } from "../utils/handle-error"
import { addSpinner } from "./add"
import { installDeps } from "../utils/package-management"

export const metadata = new Command()
  .name("metadata")
  .description("Inject metadata into your app")
  .action(async function (this: Command) {
    try {
      addSpinner.start("Installing dependencies...\n")
      addSpinner.stopAndPersist()
      await installDeps(["next-seo"])
      addSpinner.succeed("Dependencies successfully installed!")

      addSpinner.start("Injecting files...")
      const metadataFile = "src/config/metadata.tsx"
      const sitemap = "src/app/sitemap.ts"
      const robots = "src/app/robots.ts"
      const manifest = "src/app/manifest.ts"
      await injectGithubFiles({
        filePaths: [metadataFile, sitemap, robots, manifest],
      })

      const mainLayoutPath = "src/app/layout.tsx"
      let { rc: remoteLayout, lc: localLayout } =
        await getLocalAndRemoteFile(mainLayoutPath)

      const layoutImports = extractFileContentLinesRegex({
        fileContent: remoteLayout,
        regex: /^import\s+\{.*metadata.*/i,
      })
      const layoutMetadataExports = extractFileContentBetweenLines({
        fileContent: remoteLayout,
        startString: "export const metadata",
      })

      localLayout = mergeFileContent(
        layoutImports,
        localLayout,
        layoutMetadataExports
      )

      injectFile(mainLayoutPath, localLayout)

      const mainPagePath = "src/app/(Navigation)/page.tsx"
      if (fileExists(mainPagePath)) {
        let { rc: remotePage, lc: localPage } =
          await getLocalAndRemoteFile(mainPagePath)

        const pageImports = extractFileContentLinesRegex({
          fileContent: remotePage,
          regex: /^import\s+\{.*metadata.*/i,
        })
        const pageMetadataExports = extractFileContentBetweenLines({
          fileContent: remotePage,
          startString: "export const metadata",
        })
        localPage = mergeFileContent(
          pageImports,
          localPage,
          pageMetadataExports
        )

        injectFile(mainPagePath, localPage)
      }
    } catch (error) {
      handleError(error)
    }
  })
