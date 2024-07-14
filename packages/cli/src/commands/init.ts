import { Command } from "commander"
import { handleError } from "../utils/handle-error"
import prompts from "prompts"
import { logger } from "../utils/logger"
import path from "path"
import fs from "fs"
import simpleGit from "simple-git"
import ora from "ora"
import { z } from "zod"
import { execa } from "execa"

import dotenv from "dotenv"
import { CONFIG_FILE } from "../utils/config-info"
dotenv.config({ path: CONFIG_FILE })

const optionsSchema = z.object({
  cwd: z.string(),
})

export const init = new Command()
  .name("init")
  .description(
    "initialize the base nextjs template compatible with all plugins"
  )
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async (opts) => {
    const spinner = ora()

    try {
      const options = optionsSchema.parse({
        ...opts,
      })
      const cwd = path.resolve(options.cwd)

      const { projectName, packageManager } = await prompts([
        {
          type: "text",
          name: "projectName",
          message: "Enter the desired project name:",
        },
        {
          type: "select",
          name: "packageManager",
          message: "Choose your package manager:",
          choices: [
            { title: "pnpm", value: "pnpm" },
            { title: "npm", value: "npm" },
            { title: "bun", value: "bun" },
            { title: "yarn", value: "yarn" },
          ],
          initial: 0,
        },
      ])

      spinner.text = `Creating project ${projectName}...\n`
      spinner.start()

      if (!projectName) {
        throw new Error("Project name cannot be empty.")
      }

      const projectPath = path.join(cwd, projectName)

      if (fs.existsSync(projectPath)) {
        throw new Error(`Directory "${projectName}" already exists.`)
      }
      fs.mkdirSync(projectPath)

      spinner.text = `Cloning github repository...`
      const git = simpleGit()
      await git.clone(
        `https://${process.env.ACCESS_KEY}@github.com/DanielCraciunGitHub/nextjs-base-template.git`,
        projectPath,
        ["--branch", "master"]
      )

      process.chdir(projectPath)
      fs.rmSync(".git", {
        force: true,
        recursive: true,
      })
      fs.renameSync(".env.example", ".env.local")
      
      await execa("git init", { cwd: projectPath })
      await execa("git add .", { cwd: projectPath })
      await execa(`git commit -m "init"`, { cwd: projectPath })

      logger.info("Repository cloned successfully")

      let installCommand: string = "pnpm i"
      switch (packageManager) {
        case "pnpm":
          installCommand = "pnpm i"
          break
        case "npm":
          installCommand = "npm i"
          break
        case "yarn":
          installCommand = "yarn add"
          break
        case "bun":
          installCommand = "bun i"
          break
        default:
          break
      }

      try {
        spinner.text = `Installing Dependencies...\n`
        spinner.stopAndPersist()
        await execa(installCommand, { cwd: projectPath, stdio: "inherit" })

        logger.info("Dependencies installed successfully.")
      } catch (error: any) {
        throw new Error(error.message)
      }

      spinner.succeed(`Project "${projectName}" created successfully.\n`)
      logger.info(
        `Run the following command to start the application:\n\n${packageManager} run dev`
      )
    } catch (error) {
      handleError(error)
    }
  })
