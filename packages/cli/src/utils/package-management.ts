import { detect } from "@antfu/ni"

import { execa } from "execa"

import { handleError } from "./handle-error"
import { cwd } from "../commands/add"
import ora from "ora"

export async function installDeps(packages: string[]) {
  const packageManager = await getPackageManager(cwd)
  const spinner = ora()
  try {
    const installCommand = packageManager
    const installArgs = [packageManager === "npm" ? "i" : "add", ...packages]

    spinner.start(`Installing dependencies...\n`)
    spinner.stopAndPersist()

    await execa(installCommand, installArgs, { cwd, stdio: "inherit" })
    spinner.succeed(`Dependencies successfully installed!...`)
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
