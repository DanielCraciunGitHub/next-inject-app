import axios from "axios"

import dotenv from "dotenv"
dotenv.config()

import { handleError } from "./handle-error"

export async function fetchRawFileFromGithub(
  filePath: string,
  branch: string = "master"
) {
  const url = `https://${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}@raw.githubusercontent.com/DanielCraciunGitHub/nextjs-base-template/${branch}/${filePath}`

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
