import axios from "axios"

import dotenv from "dotenv"
dotenv.config({ path: CONFIG_FILE })

import { handleError } from "./handle-error"
import { CONFIG_FILE } from "./config-info"

import fs, { existsSync } from "fs"

import path from "path"
import { omitLinesContent } from "./file-injection"
import { branch, cwd } from "../commands/add"

export interface GithubFunctionProps {
  filePath: string
}

export type ExtractContentProps = {
  fileContent: string
  searchString: string
}

export type ExtractContentBetweenProps = Omit<
  ExtractContentProps,
  "searchString"
> & {
  startString?: string
  endString?: string
}

export async function fetchRawFileFromGithub({
  filePath,
}: GithubFunctionProps) {
  try {
    const url = `https://${process.env.ACCESS_KEY}@raw.githubusercontent.com/DanielCraciunGitHub/nextjs-base-template/${branch}/${filePath}`
    const response = await axios.get(url)

    return response.data
  } catch (error) {
    handleError(error)
  }
}

export async function fetchRawFilesFromGithub({
  filePaths,
}: Omit<GithubFunctionProps, "filePath"> & {
  filePaths: string[]
}) {
  let files: string[] = []

  for (const filePath of filePaths) {
    const fileContent = await fetchRawFileFromGithub({ filePath })
    files.push(fileContent)
  }

  return files
}

export function extractFileContentLines({
  searchString,
  fileContent,
}: ExtractContentProps) {
  try {
    // Split the content into lines
    const lines = fileContent.split("\n")

    // Filter lines that contain the search string
    const filteredLines = lines.filter((line) => line.includes(searchString))

    // Combine the filtered lines into a single string separated by '\n'
    const result = filteredLines.join("\n")

    return result
  } catch (error) {
    handleError(error)
    return ""
  }
}
export function extractFileContentLinesRegex({
  regex,
  fileContent,
}: {
  regex: RegExp
  fileContent: string
}) {
  try {
    return fileContent
      .split(/\r?\n/)
      .filter((line) => regex.test(line))
      .join("\n")
  } catch (error) {
    handleError(error)
    return ""
  }
}
export function extractFileContentBetweenLines({
  fileContent,
  startString,
  endString,
}: ExtractContentBetweenProps) {
  // Split the content into lines
  const lines = fileContent.split("\n")

  // Find the index of the start and end strings

  if (!startString && !endString) {
    handleError("Please specify a start or end search string")
  }

  let startIndex
  let endIndex
  if (!startString) {
    startIndex = 0
  } else {
    startIndex = lines.findIndex((line) => line.includes(startString))
  }

  if (!endString) {
    endIndex = lines.length - 1
  } else {
    endIndex = lines.findIndex((line) => line.includes(endString))
  }

  // Ensure both strings are found and start index is before end index
  if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
    // Extract the lines between (inclusive) the start and end indices
    const extractedLines = lines.slice(startIndex, endIndex + 1)

    // Combine the extracted lines into a single string separated by '\n'
    return extractedLines.join("\n")!
  } else {
    handleError("Start string or end string not found, or out of order.")
  }
  return ""
}

export async function extractGithubFileContentLines({
  searchString,
  filePath,
}: GithubFunctionProps & Pick<ExtractContentProps, "searchString">) {
  const fileContent = await fetchRawFileFromGithub({ filePath })

  const parsedFileContent = extractFileContentLines({
    searchString,
    fileContent,
  })

  return { og: fileContent as string, parsed: parsedFileContent! }
}
export async function extractGithubFileContentOmitLines({
  searchString,
  filePath,
}: GithubFunctionProps & Pick<ExtractContentProps, "searchString">) {
  const fileContent = await fetchRawFileFromGithub({ filePath })

  const parsedFileContent = omitLinesContent({
    searchString,
    fileContent,
  })

  return { og: fileContent as string, parsed: parsedFileContent }
}
export async function extractGitHubFileContentBetweenLines({
  filePath,
  startString,
  endString,
}: GithubFunctionProps &
  Pick<ExtractContentBetweenProps, "endString" | "startString">) {
  const fileContent: string = await fetchRawFileFromGithub({ filePath })

  const parsedFileContent = extractFileContentBetweenLines({
    fileContent,
    startString,
    endString,
  })

  return parsedFileContent!
}

export function readFileContent(filePath: string) {
  if (!existsSync(cwd)) {
    handleError(`The path ${cwd} does not exist. Please try again.`)
  }

  const targetPath = path.resolve(cwd, filePath)

  const fileContent = fs.readFileSync(targetPath)

  return fileContent.toString("utf-8")!
}
export function fileExists(filePath: string) {
  const targetPath = path.resolve(cwd, filePath)

  if (!existsSync(targetPath)) {
    return false
  }
  return true
}
export function fileContentToLines(fileContent: string): string[] {
  return fileContent.split(/\r?\n/)
}
export async function getLocalAndRemoteFile(filePath: string) {
  const lc = readFileContent(filePath)
  const rc = await fetchRawFileFromGithub({ filePath })

  return { lc, rc } as { lc: string; rc: string }
}
