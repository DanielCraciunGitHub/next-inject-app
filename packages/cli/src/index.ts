#!/usr/bin/env node
import chalk from "chalk"
import { Command } from "commander"
import figlet from "figlet"

import { add } from "./commands/add"
import { auth } from "./commands/auth"
import { init } from "./commands/init"
import { bootstrap } from "./commands/bootstrap"
import { rename } from "./commands/rename"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

console.log(chalk.yellow(figlet.textSync("Next Inject")))

async function main() {
  const program = new Command()
    .name("next-inject")
    .description("Inject plugins into your next.js project")
    .version("1.2.4", "-v, --version", "display the version number")

  program
    .addCommand(add)
    .addCommand(auth)
    .addCommand(init)
    .addCommand(bootstrap)
    .addCommand(rename)

  program.parse()
}

main()
