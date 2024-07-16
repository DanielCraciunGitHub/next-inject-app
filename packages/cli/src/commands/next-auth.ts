import { Command } from "commander"

import {
  injectContentOuter,
  injectGithubFiles,
  omitLinesFile,
  mergeFileContent,
} from "../utils/file-injection"
import {
  extractGithubFileContentLines,
  extractFileContentBetweenLines,
} from "../utils/file-extraction"
import { handleError } from "../utils/handle-error"
import { addSpinner } from "./add"
import { installDeps } from "../utils/package-management"

export const metadata = new Command()
  .name("metadata")
  .description("Inject metadata into your app")
  .action(async function (this: Command) {
    try {
      addSpinner.text = "Installing dependencies..."
      await installDeps(["next-seo"])

      addSpinner.text = "Injecting files..."
      const metadataFile = "src/config/metadata.tsx"
      const sitemap = "src/app/sitemap.ts"
      const robots = "src/app/robots.ts"
      const manifest = "src/app/manifest.ts"
      await injectGithubFiles({
        filePaths: [metadataFile, sitemap, robots, manifest],
      })

      const mainLayoutFile = "src/app/layout.tsx"
      omitLinesFile({
        filePath: mainLayoutFile,
        searchString: "import",
      })
      const { og: ogLayout, parsed: layoutImports } =
        await extractGithubFileContentLines({
          filePath: mainLayoutFile,
          searchString: "import",
        })
      const layoutMetadataExports = extractFileContentBetweenLines({
        fileContent: ogLayout,
        startString: "export const metadata",
      })
      injectContentOuter({
        content: mergeFileContent(layoutImports, layoutMetadataExports),
        filePath: mainLayoutFile,
        direction: "above",
      })

      const mainPageFile = "src/app/(Navigation)/page.tsx"
      const { og: ogPage, parsed: pageImports } =
        await extractGithubFileContentLines({
          filePath: mainPageFile,
          searchString: "import",
        })
      const pageMetadataExports = extractFileContentBetweenLines({
        fileContent: ogPage,
        startString: "export const metadata",
      })
      injectContentOuter({
        content: mergeFileContent(pageImports, pageMetadataExports),
        filePath: mainPageFile,
        direction: "above",
      })
    } catch (error) {
      handleError(error)
    }
  })
