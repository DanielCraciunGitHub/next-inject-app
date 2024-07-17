import { existsSync } from "fs"
import fs from "fs-extra"
import path from "path"

import {
  ExtractContentProps,
  fetchRawFileFromGithub,
  GithubFunctionProps,
} from "./file-extraction"
import { handleError } from "./handle-error"
import { cwd } from "../commands/add"

interface InjectContentProps {
  insertContent: string
  insertPoint: string | RegExp
  direction: "above" | "below"
  fileContent: string
}

export async function injectGithubFile({ filePath }: GithubFunctionProps) {
  if (!existsSync(cwd)) {
    handleError(`The path ${cwd} does not exist. Please try again.`)
  }

  const targetPath = path.resolve(cwd, filePath)
  const fileContent = await fetchRawFileFromGithub({ filePath })

  injectFile(targetPath, fileContent)
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
export async function injectFile(filePath: string, fileContent: string) {
  const targetPath = path.resolve(cwd, filePath)

  fs.ensureDirSync(path.dirname(targetPath))

  fs.writeFileSync(targetPath, fileContent, "utf-8")
}

export function injectContentInner({
  insertContent,
  insertPoint,
  direction = "below",
  fileContent,
}: InjectContentProps) {
  try {
    const lines = fileContent.split("\n")
    let insertIndex = -1

    // Find the insert point line
    const regex = new RegExp(insertPoint)
    for (let i = 0; i < lines.length; i++) {
      if (regex.test(lines[i])) {
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
      lines.splice(insertIndex - 1, 0, insertContent)
    } else {
      lines.splice(insertIndex, 0, insertContent)
    }

    const modifiedContent = lines.join("\n")

    return modifiedContent
  } catch (error) {
    handleError(error)
    return ""
  }
}

export function omitLinesContent({
  fileContent,
  searchString,
}: ExtractContentProps): string {
  // Split the content into lines
  const lines = fileContent.split("\n")

  const regex = new RegExp(searchString)

  // Filter out lines that contain the search string
  const filteredLines = lines.filter((line) => regex.test(line))

  // Combine the filtered lines into a single string separated by '\n'
  const result = filteredLines.join("\n")

  return result
}

export function mergeFileContent(...filesContent: string[]) {
  let finalFileContent: string = ""
  for (const fileContent of filesContent) {
    finalFileContent += `${fileContent}\n`
  }
  return finalFileContent
}

export function searchAndReplace({
  fileContent,
  targetString,
  newContent,
}: {
  fileContent: string
  targetString: string | RegExp
  newContent: string
}) {
  // Replace the target string with the new content
  const newFileContent = fileContent.replace(
    new RegExp(targetString),
    newContent
  )

  return newFileContent
}

export function injectContentOuter({
  insertContent,
  direction = "below",
  fileContent,
}: Omit<InjectContentProps, "insertPoint">) {
  try {
    const lines = fileContent.split("\n")
    let insertIndex = -1

    // Find the insert point line
    if (direction === "above") {
      if (lines[0].includes("use client")) {
        insertIndex = 1
      } else {
        insertIndex = 0
      }
    } else {
      insertIndex = lines.length - 1
    }

    lines.splice(insertIndex, 0, insertContent)

    const modifiedContent = lines.join("\n")

    return modifiedContent
  } catch (error) {
    handleError(error)
    return ""
  }
}
