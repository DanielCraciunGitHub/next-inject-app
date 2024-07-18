import { GithubFunctionProps } from "../types"
import axios from "axios"
import { handleError } from "./handle-error"
import { CONFIG_FILE } from "./config-info"

import dotenv from "dotenv"
dotenv.config({ path: CONFIG_FILE })

import { addSpinner, branch, cwd } from "../commands/add"
import path from "path"
import { existsSync } from "fs"
import fs from "fs/promises"
import chalk from "chalk"

export async function fetchLocalAndRemoteFile(filePath: string) {
  const lc = await readFileContent(filePath)
  const rc = await fetchRemoteFile({ filePath })

  return { lc, rc } as { lc: string; rc: string }
}
export async function fetchRemoteFiles({
  filePaths,
}: Omit<GithubFunctionProps, "filePath"> & {
  filePaths: string[]
}) {
  let files: string[] = []

  for (const filePath of filePaths) {
    const fileContent = await fetchRemoteFile({ filePath })
    files.push(fileContent)
  }

  return files
}
export async function fetchRemoteFile({ filePath }: GithubFunctionProps) {
  try {
    addSpinner.start(`Fetching ${filePath}...`)

    const url = `https://${process.env.ACCESS_KEY}@raw.githubusercontent.com/DanielCraciunGitHub/nextjs-base-template/${branch}/${filePath}`
    const response = await axios.get(url)

    addSpinner.succeed(`Fetched ${path.normalize(filePath)}`)
    return response.data as string
  } catch (error) {
    handleError(error)
    return ""
  }
}
export function fileExists(filePath: string) {
  const targetPath = path.resolve(cwd, filePath)

  if (!existsSync(targetPath)) {
    return false
  }
  return true
}
export async function readFileContent(filePath: string) {
  if (!existsSync(cwd)) {
    handleError(`The path ${cwd} does not exist. Please try again.`)
  }

  const targetPath = path.resolve(cwd, filePath)

  const fileContent = await fs.readFile(targetPath, "utf-8")
  return fileContent
}
