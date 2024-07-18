import path from "path"
import fs from "fs-extra"
import { type PackageJson } from "type-fest"
import { cwd } from "../commands/add"
import { injectFile } from "./file-injection"
import { renameNextInjectProject } from "../commands/rename"
import { readFileContent } from "./file-fetching"
import { NextInjectConfig } from "../types"

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
export async function getNextInjectConfig() {
  const configFilePath = path.join(cwd, "next-inject.json")
  const data = await readFileContent(configFilePath)
  const cleanedData = data
    .split("\n") // Split the file content into lines
    .map((line) => line.trim()) // Trim each line
    .filter((line) => line.length > 0) // Remove empty lines
    .join("") // Join lines back into a single string

  const json = cleanedData ? JSON.parse(cleanedData) : {}
  return json as NextInjectConfig
}

export async function initNextInjectConfig(data: { projectName: string }) {
  const configFilePath = path.join(cwd, "next-inject.json")

  const jsonData = JSON.stringify(data, null, 2)

  await renameNextInjectProject(data.projectName)

  await injectFile({ filePath: configFilePath, fileContent: jsonData })
}
export async function registerNextInjectPlugin(plugin: string) {
  const config = await getNextInjectConfig()
  const configFilePath = path.join(cwd, "next-inject.json")

  if (!config.plugins) {
    config.plugins = [plugin]
  } else {
    if (!config.plugins.includes(plugin)) config.plugins.push(plugin)
  }

  await injectFile({
    filePath: configFilePath,
    fileContent: JSON.stringify(config, null, 2),
  })
}
export function isValidConfig(
  config: NextInjectConfig | {}
): config is NextInjectConfig {
  return "name" in config
}
export async function isPluginInstalled(plugin: string) {
  const config = await getNextInjectConfig()

  if (config.plugins?.includes(plugin)) {
    return true
  }
  return false
}
