import path from "path"
import fs from "fs-extra"
import { type PackageJson } from "type-fest"
import { cwd } from "../commands/add"
import { injectFile } from "./file-injection"
import { replaceInFileSync } from "replace-in-file"

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
  const data = fs.readFileSync(configFilePath, "utf8")

  const json = JSON.parse(data)
  return json
}

export function initNextInjectConfig(data: { projectName: string }) {
  const configFilePath = path.join(cwd, "next-inject.json")

  const jsonData = JSON.stringify(data, null, 2)

  replaceInFileSync({
    files: [path.join(cwd, "*"), path.join(cwd, "src/**")],
    from: [new RegExp(`<NEXT-INJECT-NAME>`, "g")],
    to: [data.projectName],
    ignore: [path.join(cwd, "node_modules/**/*")],
    glob: {
      windowsPathsNoEscape: true,
    },
  })

  injectFile(configFilePath, jsonData)
}
