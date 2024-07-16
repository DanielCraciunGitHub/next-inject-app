import { detect } from "@antfu/ni"

import { execa } from "execa"

import { handleError } from "./handle-error"
import { cwd } from "../commands/add"

export async function installDeps(packages: string[]) {
  const packageManager = await getPackageManager(cwd)

  const parsedPackages = packages.join(" ")
  try {
    await execa(
      `${packageManager} ${packageManager === "npm" ? "i" : "add"} ${parsedPackages}`,
      { cwd, stdin: "inherit" }
    )
  } catch (error) {
    handleError(error)
  }
}
export async function installDevDeps(packages: string[]) {
  const packageManager = await getPackageManager(cwd)

  const parsedPackages = packages.join(" ")
  try {
    await execa(
      `${packageManager} ${packageManager === "yarn" ? "add" : "i"} ${parsedPackages} -D`,
      { cwd, stdin: "inherit" }
    )
  } catch (error) {
    handleError(error)
  }
}

export async function getPackageManager(
  targetDir: string
): Promise<"yarn" | "pnpm" | "bun" | "npm"> {
  const packageManager = await detect({ programmatic: true, cwd: targetDir })

  if (packageManager === "yarn@berry") return "yarn"
  if (packageManager === "pnpm@6") return "pnpm"
  if (packageManager === "bun") return "bun"

  return packageManager ?? "npm"
}
