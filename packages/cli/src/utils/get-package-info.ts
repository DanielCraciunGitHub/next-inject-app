import path from "path"
import fs from "fs-extra"
import { type PackageJson } from "type-fest"
import { cwd } from "../commands/add"
import { injectFile } from "./file-injection"
import { replaceInFile } from "replace-in-file"
import { readFileContent } from "./file-extraction"
import { logger } from "./logger"
import { handleError } from "./handle-error"

export function getPackageInfo() {
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

  const json = JSON.parse(data)
  return json
}

export async function initNextInjectConfig(data: { projectName: string }) {
  const configFilePath = path.join(cwd, "next-inject.json")

  const jsonData = JSON.stringify(data, null, 2)

  await renameNextInjectProject(data.projectName)

  injectFile(configFilePath, jsonData)
}
export async function renameNextInjectProject(projectName: string) {
  const config = getNextInjectConfig()

  const configFilePath = path.join(cwd, "next-inject.json")

  const [indexConfig] = await replaceInFile({
    files: [path.join(cwd, "src/config/next-inject.tsx"), configFilePath],
    from: [
      new RegExp(
        `export const projectName = "${config.name ?? "<NEXT-INJECT-NAME>"}"`,
        "g"
      ),
    ],
    to: [`export const projectName = "${projectName}"`],
    glob: {
      windowsPathsNoEscape: true,
    },
    countMatches: true,
  })

  config.name = projectName
  if (!indexConfig.hasChanged) {
    logger.error(`\nRenaming failed!`)

    logger.error(`Copy this line into src/config/next-inject.tsx and retry.`)
    logger.error(`export const projectName = "${config.name}"\n`)

    logger.error(
      `Also make sure the next-inject.json config matches your project name as follows:`
    )
    logger.error(`{ "name": "${config.name}"}`)
    handleError("")
  }
  const json = JSON.stringify(config)
  injectFile(configFilePath, json)
}
