import { Command } from "commander"

import {
  injectGithubFiles,
  mergeFileContent,
  injectFile,
} from "../utils/file-injection"
import {
  extractBetweenMatchedLines,
  fileExists,
  getLocalAndRemoteFile,
  extractMatchedLines,
  fetchRawFileFromGithub,
  readFileContent,
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
      const metadataPath = "src/config/metadata.tsx"
      let metadataFile = await fetchRawFileFromGithub({
        filePath: metadataPath,
      })

      // ! THE order here matters, because we search and replace content from start-EOF.
      const manifest = "src/app/manifest.ts"
      if (fileExists(manifest)) {
        const manifestContent = readFileContent(manifest)
        metadataFile = mergeFileContent(
          metadataFile,
          `// MOVED FROM ${manifest}`,
          manifestContent
        )
      } else {
        await injectGithubFiles({
          filePaths: [manifest],
        })
      }

      const robots = "src/app/robots.ts"
      if (fileExists(robots)) {
        const robotsContent = readFileContent(robots)
        metadataFile = mergeFileContent(
          metadataFile,
          `// MOVED FROM ${robots}`,
          robotsContent
        )
      } else {
        await injectGithubFiles({
          filePaths: [robots],
        })
      }

      const sitemap = "src/app/sitemap.ts"
      if (fileExists(sitemap)) {
        const sitemapContent = readFileContent(sitemap)
        metadataFile = mergeFileContent(
          metadataFile,
          `// MOVED FROM ${sitemap}`,
          sitemapContent
        )
      } else {
        await injectGithubFiles({
          filePaths: [sitemap],
        })
      }

      injectFile(metadataPath, metadataFile)

      const mainLayoutPath = "src/app/layout.tsx"
      let { rc: remoteLayout, lc: localLayout } =
        await getLocalAndRemoteFile(mainLayoutPath)

      const layoutImports = extractMatchedLines({
        fileContent: remoteLayout,
        searchString: /^import\s+\{.*metadata.*/i,
      })
      const layoutMetadataExports = extractBetweenMatchedLines({
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

        const pageImports = extractMatchedLines({
          fileContent: remotePage,
          searchString: /^import\s+\{.*metadata.*/i,
        })
        const pageMetadataExports = extractBetweenMatchedLines({
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
