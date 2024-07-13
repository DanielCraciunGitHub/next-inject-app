// import { exec } from "child_process"
import fs, { existsSync } from "fs"
import path from "path"

import { logger } from "./logger"
import { fetchRawFileFromGithub } from "./nextjs-template"

export async function injectFileContent(
  cwd: string,
  filePath: string,
  fileContent: string
) {
  if (!existsSync(cwd)) {
    logger.error(`The path ${cwd} does not exist. Please try again.`)
    process.exit(1)
  }

  const targetPath = path.resolve(cwd, filePath)

  fs.writeFileSync(targetPath, fileContent, "utf-8")
}
export async function injectGithubFileContent(
  cwd: string,
  filePath: string,
  branch: string
) {
  if (!existsSync(cwd)) {
    logger.error(`The path ${cwd} does not exist. Please try again.`)
    process.exit(1)
  }

  const targetPath = path.resolve(cwd, filePath)
  const fileContent = await fetchRawFileFromGithub(filePath, branch)

  fs.writeFileSync(targetPath, fileContent, "utf-8")
}

export async function readFileContent(
  cwd: string,
  filePath: string,
  fileContent: string
) {
  if (!existsSync(cwd)) {
    logger.error(`The path ${cwd} does not exist. Please try again.`)
    process.exit(1)
  }

  const targetPath = path.resolve(cwd, filePath)

  fs.writeFileSync(targetPath, fileContent, "utf-8")
}

// export function openFileInVSCode(cwd: string, filePath: string) {
//   if (!existsSync(cwd)) {
//     logger.error(`The path ${cwd} does not exist. Please try again.`)
//     process.exit(1)
//   }

//   const targetPath = path.resolve(cwd, filePath)

//   const vscodeCommand = `code ${targetPath}`
//   exec(vscodeCommand, (err, stdout, stderr) => {
//     if (err) {
//       logger.error(`Error opening file in VSCode: ${err.message}`)
//       return
//     }
//     if (stderr) {
//       logger.error(`stderr: ${stderr}`)
//       return
//     }
//     logger.info(`File opened in VSCode: ${targetPath}`)
//   })
// }
