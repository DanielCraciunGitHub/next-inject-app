import path from "path"
import os from "os"

export const HOME_DIR = os.homedir()
export const CONFIG_DIR = path.join(HOME_DIR, ".next-inject")
export const CONFIG_FILE = path.join(CONFIG_DIR, "config")
export const NEXTJS_APP_URL = "https://www.nextinject.pro"
//   "http://localhost:3000"
