import fs, { existsSync, stat } from "fs"
import path from "path"

import { logger } from "./logger"
import {
  ExtractContentProps,
  fetchRawFileFromGithub,
  GithubFunctionProps,
} from "./file-extraction"
import { handleError } from "./handle-error"
import { readFileContent } from "./file-extraction"

interface InjectContentProps {
  content: string
  insertPoint: string
  direction: "above" | "below"
  filePath: string
  cwd: string
}

export async function injectGithubFile({
  cwd,
  filePath,
  branch,
}: GithubFunctionProps & { cwd: string }) {
  if (!existsSync(cwd)) {
    handleError(`The path ${cwd} does not exist. Please try again.`)
  }

  const targetPath = path.resolve(cwd, filePath)
  const fileContent = await fetchRawFileFromGithub({ filePath, branch })

  fs.writeFileSync(targetPath, fileContent, "utf-8")
}
export async function injectGithubFiles({
  cwd,
  filePaths,
  branch,
}: Omit<GithubFunctionProps, "filePath"> & {
  cwd: string
  filePaths: string[]
}) {
  for (const filePath of filePaths) {
    await injectGithubFile({ cwd, branch, filePath })
  }
}
export async function injectFile(
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

export async function injectContentInner({
  content,
  insertPoint,
  direction = "below",
  filePath,
  cwd = process.cwd(),
}: InjectContentProps) {
  try {
    const fileContent = readFileContent(cwd, filePath)

    const lines = fileContent.split("\n")
    let insertIndex = -1

    // Find the insert point line
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(insertPoint)) {
        insertIndex = i
        break
      }
    }

    insertIndex++
    if (insertIndex === -1) {
      handleError(`Insert point "${insertPoint}" not found in the file.`)
    }

    // Insert new content above or below the insert point
    if (direction === "above") {
      lines.splice(insertIndex - 1, 0, content)
    } else {
      lines.splice(insertIndex, 0, content)
    }

    const modifiedContent = lines.join("\n")
    const targetPath = path.resolve(cwd, filePath)

    fs.writeFileSync(targetPath, modifiedContent, "utf8")
  } catch (error) {
    handleError(error)
  }
}
export async function injectContentOuter({
  content,
  direction = "below",
  filePath,
  cwd = process.cwd(),
}: Omit<InjectContentProps, "insertPoint">) {
  try {
    const fileContent = readFileContent(cwd, filePath)

    const lines = fileContent.split("\n")
    let insertIndex = -1

    // Find the insert point line
    if (direction === "above") {
      insertIndex = 0
    } else {
      insertIndex = lines.length - 1
    }

    lines.splice(insertIndex, 0, content)

    const modifiedContent = lines.join("\n")
    const targetPath = path.resolve(cwd, filePath)

    fs.writeFileSync(targetPath, modifiedContent, "utf8")
  } catch (error) {
    handleError(error)
  }
}
export function omitLinesContent(params: ExtractContentProps): string {
  const { fileContent, searchString } = params

  // Split the content into lines
  const lines = fileContent.split("\n")

  // Filter out lines that contain the search string
  const filteredLines = lines.filter((line) => !line.includes(searchString))

  // Combine the filtered lines into a single string separated by '\n'
  const result = filteredLines.join("\n")

  return result
}
export function omitLinesFile({
  cwd,
  filePath,
  searchString,
}: Pick<ExtractContentProps, "searchString"> & {
  filePath: string
  cwd: string
}) {
  const fileContent = readFileContent(cwd, filePath)

  const parsedFileContent = omitLinesContent({ fileContent, searchString })

  injectFile(cwd, filePath, parsedFileContent)
}
export function mergeFileContent(...filesContent: string[]) {
  let finalFileContent: string = ""
  for (const fileContent of filesContent) {
    finalFileContent += `${fileContent}\n`
  }
  return finalFileContent
}
