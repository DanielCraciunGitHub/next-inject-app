#!/usr/bin/env node

import { Command } from "commander"

import { logger } from "../utils/logger"

import { z } from "zod"
import fs from "fs"
import path from "path"
import os from "os"
import dotenv from "dotenv"

const HOME_DIR = os.homedir()
const CONFIG_DIR = path.join(HOME_DIR, ".next-inject")
const CONFIG_FILE = path.join(CONFIG_DIR, "config")

const optionsSchema = z.object({
  key: z.string().optional(),
  delete: z.boolean().optional(),
})

export const auth = new Command()
  .name("auth")
  .description("authenticate with the next-inject cli")
  .option("-k, --key <key>", "store your personal api key for this cli")
  .option("-d, --delete", "delete your saved api key")
  .action(async (opts) => {
    const options = optionsSchema.parse({
      ...opts,
    })

    if (options.delete) {
      deleteKey()
    } else if (options.key) {
      saveKey(options.key)
    } else {
      logger.error("Please provide a key using -k or --key option.")
    }
  })
function saveKey(key: string) {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true })
  }
  fs.writeFileSync(CONFIG_FILE, `USER_KEY=${key}`)
  logger.info("Key saved successfully.")
}
function deleteKey() {
  if (fs.existsSync(CONFIG_FILE)) {
    fs.unlinkSync(CONFIG_FILE)
    logger.info("Key deleted successfully.")
  } else {
    logger.error("No key found to delete.")
  }
}
function loadKey() {
  if (fs.existsSync(CONFIG_FILE)) {
    dotenv.config({ path: CONFIG_FILE })
    logger.info("Loaded user key:", process.env.USER_KEY)
  } else {
    logger.error("No key found. Please authenticate first.")
  }
}
