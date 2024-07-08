import axios from "axios"

import { handleError } from "./handle-error"

export const GITHUB_BASE_RAW_URL =
  "https://raw.githubusercontent.com/DanielCraciunGitHub/nextjs-template/master/"

export async function fetchRawFileFromGithub(filePath: string) {
  const url = `${GITHUB_BASE_RAW_URL}${filePath}`
  try {
    const response = await axios.get(url)

    return response.data
  } catch (error) {
    handleError(error)
  }
}
export async function fetchRawFilesFromGithub(...filePaths: string[]) {
  let files: string[] = []

  for (let i = 0; i < filePaths.length; i++) {
    const fileContent = await fetchRawFileFromGithub(filePaths[i])
    files.push(fileContent)
  }
  return files
}
