import path from "path"
import fs from "fs-extra"
import { type PackageJson } from "type-fest"
import { cwd } from "../commands/add"

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
