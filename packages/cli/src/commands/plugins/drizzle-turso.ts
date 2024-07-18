import { Command } from "commander"

import { injectFile, injectGithubFiles } from "../../utils/file-injection"

import { handleError } from "../../utils/handle-error"

import { installDeps, installDevDeps } from "../../utils/package-management"
import { extractMatchedLines } from "../../utils/file-extraction"

import { fetchLocalAndRemoteFile } from "@/src/utils/file-fetching"
import { injectInner } from "@/src/utils/file-transforms"
import { isPluginInstalled } from "@/src/utils/project-info"
import { patchNextAuthDrizzleTurso } from "../patches/next-auth_drizzle-turso"

export const drizzleTurso = new Command()
  .name("drizzle-turso")
  .description("Integrate drizzle and turso into your app")
  .action(async function (this: Command) {
    try {
      await installDeps(["@libsql/client", "drizzle-orm"])
      await installDevDeps(["drizzle-kit"])

      const drizzleConfig = "drizzle.config.ts"
      const index = "src/db/index.ts"
      const schema = "src/db/schema.ts"

      await injectGithubFiles({
        filePaths: [drizzleConfig, index, schema],
      })

      const packageJson = "package.json"

      let { rc: remotePackage, lc: localPackage } =
        await fetchLocalAndRemoteFile(packageJson)

      const scripts = extractMatchedLines({
        fileContent: JSON.stringify(remotePackage, null, 2),
        searchStrings: [/drizzle-kit /],
      })

      localPackage = injectInner({
        direction: "below",
        insertPoint: /"scripts": {/,
        insertContent: scripts,
        fileContent: localPackage,
      })

      await injectFile({ filePath: packageJson, fileContent: localPackage })

      const nextAuthInstalled = await isPluginInstalled("next-auth")
      if (nextAuthInstalled) {
        await patchNextAuthDrizzleTurso()
      }
    } catch (error) {
      handleError(error)
    }
  })
