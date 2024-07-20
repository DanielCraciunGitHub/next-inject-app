import { Command } from "commander"

import { injectFile, injectGithubFiles } from "../../utils/file-injection"
import { injectOuter, searchAndReplace } from "@/src/utils/file-transforms"

import { handleError } from "../../utils/handle-error"

import { installDeps } from "../../utils/package-management"
import {
  extractBetweenMatchedLines,
  extractMatchedLines,
} from "../../utils/file-extraction"
import { fileExists } from "@/src/utils/file-fetching"

import { fetchLocalAndRemoteFile } from "@/src/utils/file-fetching"
import { injectInner } from "@/src/utils/file-transforms"
import { patchPeerPlugin } from "@/src/utils/project-info"
import { patchNextAuthDrizzleTurso } from "../patches/next-auth_drizzle-turso"

export const nextAuth = new Command()
  .name("next-auth")
  .description("Inject next-auth into your app")
  .action(async function (this: Command) {
    try {
      await installDeps(["next-auth@beta", "@auth/core"])

      const authAction = "src/app/_actions/authenticate.ts"

      const authRoute = "src/app/api/auth/[...nextauth]/route.ts"

      const loginForm = "src/components/NextAuth/LoginForm.tsx"
      const loginModal = "src/components/NextAuth/LoginModal.tsx"
      const authButton = "src/components/NextAuth/AuthButton.tsx"

      const authConfig = "src/lib/auth.ts"

      await injectGithubFiles({
        filePaths: [
          authAction,
          authRoute,
          loginForm,
          loginModal,
          authButton,
          authConfig,
        ],
      })

      const mainPagePath = "src/app/(Navigation)/page.tsx"
      if (fileExists(mainPagePath)) {
        let { rc: remotePage, lc: localPage } =
          await fetchLocalAndRemoteFile(mainPagePath)

        const remotePageImports = extractMatchedLines({
          fileContent: remotePage,
          searchStrings: [/import/],
        })
        localPage = injectOuter({
          fileContent: localPage,
          direction: "above",
          insertContent: remotePageImports,
        })

        const demoAuth = extractMatchedLines({
          fileContent: remotePage,
          searchStrings: ["<DemoAuthButton />"],
        })

        localPage = injectInner({
          insertContent: demoAuth,
          direction: "above",
          fileContent: localPage,
          insertPoint: "</section",
        })

        const demoAuthFunction = extractBetweenMatchedLines({
          fileContent: remotePage,
          startString: "async function DemoAuthButton()",
        })
        localPage = injectOuter({
          fileContent: localPage,
          direction: "below",
          insertContent: demoAuthFunction,
        })

        await injectFile({
          filePath: mainPagePath,
          fileContent: localPage,
          successColor: "yellow",
        })
      }
      const providersPath = "src/components/next-inject-providers.tsx"
      if (fileExists(providersPath)) {
        let { rc: remoteProvider, lc: localProvider } =
          await fetchLocalAndRemoteFile(providersPath)

        const sessionImport = extractMatchedLines({
          fileContent: remoteProvider,
          searchStrings: ["import { SessionProvider"],
        })!
        localProvider = injectOuter({
          insertContent: sessionImport,
          fileContent: localProvider,
          direction: "above",
        })

        const sessionProvider = extractBetweenMatchedLines({
          fileContent: remoteProvider,
          startString: "<SessionProvider",
          endString: "</SessionProvider>",
        })

        localProvider = searchAndReplace({
          targetString: "{children}",
          fileContent: localProvider,
          newContent: sessionProvider,
        })

        await injectFile({
          filePath: providersPath,
          fileContent: localProvider,
        })
      } else {
        handleError(`The file path ${providersPath} does not exist!`)
      }

      await patchPeerPlugin("drizzle-turso", patchNextAuthDrizzleTurso)
    } catch (error) {
      handleError(error)
    }
  })
