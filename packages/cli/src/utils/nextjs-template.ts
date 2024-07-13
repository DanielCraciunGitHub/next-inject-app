import axios from "axios"

import dotenv from "dotenv"
dotenv.config({ path: CONFIG_FILE })

import { handleError } from "./handle-error"
import { CONFIG_FILE } from "./config-info"

export async function fetchRawFileFromGithub(
  filePath: string,
  branch: string = "master"
) {
  try {
    const url = `https://${process.env.ACCESS_KEY}@raw.githubusercontent.com/DanielCraciunGitHub/nextjs-base-template/${branch}/${filePath}`
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
