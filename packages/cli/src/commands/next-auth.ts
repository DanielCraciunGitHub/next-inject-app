import { Command } from "commander"

import {
  injectContentOuter,
  injectFile,
  injectGithubFiles,
  searchAndReplace,
} from "../utils/file-injection"

import { handleError } from "../utils/handle-error"
import { addSpinner } from "./add"
import { installDeps } from "../utils/package-management"
import {
  extractBetweenMatchedLines,
  extractMatchedLines,
  fileExists,
  getLocalAndRemoteFile,
} from "../utils/file-extraction"
import { injectContentInner, mergeFileContent } from "../utils/file-injection"

export const nextAuth = new Command()
  .name("next-auth")
  .description("Integrate next-auth into your app")
  .action(async function (this: Command) {
    try {
      addSpinner.text = "Installing dependencies..."
      addSpinner.stopAndPersist()
      await installDeps(["next-auth@beta", "@auth/core"])

      addSpinner.succeed("Dependencies successfully installed!")

      addSpinner.start("Injecting files...")
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

      const mainPage = "src/app/(Navigation)/page.tsx"
      if (fileExists(mainPage)) {
        let { rc: remotePage, lc: localPage } =
          await getLocalAndRemoteFile(mainPage)

        const remotePageImports = extractMatchedLines({
          fileContent: remotePage,
          searchString: /import/,
        })
        localPage = injectContentOuter({
          fileContent: localPage,
          direction: "above",
          insertContent: remotePageImports,
        })

        const demoAuth = extractMatchedLines({
          fileContent: remotePage,
          searchString: "<DemoAuthButton />",
        })

        localPage = injectContentInner({
          insertContent: demoAuth,
          direction: "above",
          fileContent: localPage,
          insertPoint: "</section",
        })

        const demoAuthFunction = extractBetweenMatchedLines({
          fileContent: remotePage,
          startString: "async function DemoAuthButton()",
        })
        localPage = injectContentOuter({
          fileContent: localPage,
          direction: "below",
          insertContent: demoAuthFunction,
        })

        injectFile(mainPage, localPage)
      }
      const providers = "src/components/next-inject-providers.tsx"
      if (fileExists(providers)) {
        let { rc: remoteProvider, lc: localProvider } =
          await getLocalAndRemoteFile(providers)

        const sessionImport = extractMatchedLines({
          fileContent: remoteProvider,
          searchString: "import { SessionProvider",
        })!
        localProvider = injectContentOuter({
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

        injectFile(providers, localProvider)
      } else {
        handleError(`The file path ${providers} does not exist!`)
      }
    } catch (error) {
      handleError(error)
    }
  })
