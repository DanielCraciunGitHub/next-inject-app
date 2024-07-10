#!/usr/bin/env node
import chalk from "chalk"
import { Command } from "commander"
import figlet from "figlet"

import { add } from "./commands/add"
import { auth } from "./commands/auth"
import { getPackageInfo } from "./utils/get-package-info"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

console.log(chalk.red(figlet.textSync("Next Inject")))

async function main() {
  const packageInfo = getPackageInfo()

  const program = new Command()
    .name("next-inject")
    .description("Inject plugins into your next.js project")
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version",
      "display the version number"
    )

  program.addCommand(add).addCommand(auth)

  program.parse()
}

main()
