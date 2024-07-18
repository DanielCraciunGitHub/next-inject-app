import { existsSync } from "fs"
import fs from "fs-extra"
import path from "path"

import { fetchRemoteFile } from "@/src/utils/file-fetching"
import { handleError } from "./handle-error"
import { cwd } from "../commands/add"
import {
  GithubFunctionProps,
  InjectFileProps,
  InjectFilesProps,
} from "../types"

export async function injectGithubFile({ filePath }: GithubFunctionProps) {
  if (!existsSync(cwd)) {
    handleError(`The path ${cwd} does not exist. Please try again.`)
  }

  const targetPath = path.resolve(cwd, filePath)
  const fileContent = await fetchRemoteFile({ filePath })

  injectFile({ filePath: targetPath, fileContent })
}
export async function injectGithubFiles({
  filePaths,
}: Omit<GithubFunctionProps, "filePath"> & {
  filePaths: string[]
}) {
  for (const filePath of filePaths) {
    await injectGithubFile({ filePath })
  }
}
export function injectFile({ filePath, fileContent }: InjectFileProps) {
  const targetPath = path.resolve(cwd, filePath)

  fs.ensureDirSync(path.dirname(targetPath))

  fs.writeFileSync(targetPath, fileContent, "utf-8")
}
export async function injectFiles({
  filesContent,
  filePaths,
}: InjectFilesProps) {
  if (filePaths.length !== filesContent.length) {
    handleError("Ensure the injectFiles function takes in equal length arrays!")
  }
  for (let i = 0; i < filePaths.length; i++) {
    injectFile({ filePath: filePaths[i], fileContent: filesContent[i] })
  }
}
