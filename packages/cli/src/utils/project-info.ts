import path from "path"
import fs from "fs-extra"
import { type PackageJson } from "type-fest"
import { cwd } from "../commands/add"
import { injectFile } from "./file-injection"
import { renameNextInjectProject } from "../commands/rename"
import { readFileContent } from "./file-fetching"

export function getPackageJsonInfo() {
  const packageJsonPath = path.join("package.json")

  return fs.readJSONSync(packageJsonPath) as PackageJson
}
export function isNextjsProject(): boolean {
  const configFiles = ["next.config.js", "next.config.ts", "next.config.mjs"]

  for (const configFile of configFiles) {
    const configFilePath = path.join(cwd, configFile)
    if (fs.existsSync(configFilePath)) {
      return true
    }
  }

  return false
}
export function isNextInjectProject(): boolean {
  const configFiles = ["next-inject.json"]

  for (const configFile of configFiles) {
    const configFilePath = path.join(cwd, configFile)
    if (fs.existsSync(configFilePath)) {
      return true
    }
  }

  return false
}
export function getNextInjectConfig() {
  const configFilePath = path.join(cwd, "next-inject.json")
  const data = readFileContent(configFilePath)

  const json = data ? JSON.parse(data) : {}
  return json
}

export async function initNextInjectConfig(data: { projectName: string }) {
  const configFilePath = path.join(cwd, "next-inject.json")

  const jsonData = JSON.stringify(data, null, 2)

  await renameNextInjectProject(data.projectName)

  injectFile({ filePath: configFilePath, fileContent: jsonData })
}
