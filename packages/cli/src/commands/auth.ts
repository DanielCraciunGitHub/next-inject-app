#!/usr/bin/env node

import { Command } from "commander"

import { logger } from "../utils/logger"

import { z } from "zod"
import fs from "fs"

import dotenv from "dotenv"
import axios from "axios"
import { CONFIG_DIR, CONFIG_FILE, NEXTJS_APP_URL } from "../utils/config-info"
import { handleError } from "../utils/handle-error"

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
      configKeys(options.key)
    } else {
      logger.error("Please provide a key using -k or --key option.")
    }
  })
async function configKeys(key: string) {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true })
  }
  const res = await axios.get(`${NEXTJS_APP_URL}/api/cli`, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  })

  if (res.status === 200) {
    const { accessKey }: { accessKey: string } = res.data
    fs.writeFileSync(CONFIG_FILE, `USER_KEY=${key}\nACCESS_KEY=${accessKey}`)
    logger.info("Key saved successfully.")
  } else {
    handleError(res.statusText)
  }
}
function deleteKey() {
  if (fs.existsSync(CONFIG_FILE)) {
    fs.unlinkSync(CONFIG_FILE)
    logger.info("Key deleted successfully.")
  } else {
    logger.error("No key found to delete.")
  }
}
export function loadUserKey(): string {
  if (fs.existsSync(CONFIG_FILE)) {
    dotenv.config({ path: CONFIG_FILE })

    return process.env.USER_KEY!
  } else {
    logger.error("No key found. Please authenticate first.")
  }
  return "undefined"
}
