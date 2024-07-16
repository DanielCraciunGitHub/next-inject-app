import { existsSync } from "fs"
import fs from "fs-extra"
import path from "path"

import {
  ExtractContentProps,
  fetchRawFileFromGithub,
  GithubFunctionProps,
} from "./file-extraction"
import { handleError } from "./handle-error"
import { readFileContent } from "./file-extraction"
import { cwd } from "../commands/add"

interface InjectContentProps {
  content: string
  insertPoint: string
  direction: "above" | "below"
  filePath: string
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

export async function injectContentInner({
  content,
  insertPoint,
  direction = "below",
  filePath,
}: InjectContentProps) {
  try {
    const fileContent = readFileContent(filePath)

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

    injectFile(targetPath, modifiedContent)
  } catch (error) {
    handleError(error)
  }
}
export function injectContentOuter({
  content,
  direction = "below",
  filePath,
}: Omit<InjectContentProps, "insertPoint">) {
  try {
    const fileContent = readFileContent(filePath)

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

    injectFile(targetPath, modifiedContent)
    return modifiedContent
  } catch (error) {
    handleError(error)
    return ""
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
  filePath,
  searchString,
}: Pick<ExtractContentProps, "searchString"> & {
  filePath: string
}) {
  const fileContent = readFileContent(filePath)

  const parsedFileContent = omitLinesContent({ fileContent, searchString })

  injectFile(filePath, parsedFileContent)
}
export function mergeFileContent(...filesContent: string[]) {
  let finalFileContent: string = ""
  for (const fileContent of filesContent) {
    finalFileContent += `${fileContent}\n`
  }
  return finalFileContent
}

export function searchAndReplaceFileContent(
  fileContent: string,
  targetString: string,
  newContent: string
) {
  // Replace the target string with the new content
  const newFileContent = fileContent.replace(
    new RegExp(targetString, "g"),
    newContent
  )

  return newFileContent
}
