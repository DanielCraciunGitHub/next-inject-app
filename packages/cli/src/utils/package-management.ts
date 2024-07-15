import { detect } from "@antfu/ni"

import { execa } from "execa"

import { handleError } from "./handle-error"

export async function installDeps(packages: string[], cwd: string) {
  const packageManager = await getPackageManager(cwd)

  const parsedPackages = packages.join(" ")
  try {
    await execa(
      `${packageManager} ${packageManager === "yarn" ? "add" : "i"} ${parsedPackages}`,
      { cwd }
    )
  } catch (error) {
    handleError(error)
  }
}
export async function installDevDeps(packages: string[], cwd: string) {
  const packageManager = await getPackageManager(cwd)

  const parsedPackages = packages.join(" ")
  try {
    await execa(
      `${packageManager} ${packageManager === "yarn" ? "add" : "i"} ${parsedPackages} -D`,
      { cwd }
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
