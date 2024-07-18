import { z } from "zod"
import { nextInjectConfigSchema } from "../validations"

export type InjectContentProps = {
  insertContent: string
  insertPoint: string | RegExp
  direction: "above" | "below"
  fileContent: string
}
export type InjectFileProps = {
  filePath: string
  fileContent: string
}
export type InjectFilesProps = {
  filePaths: string[]
  filesContent: string[]
}

export interface GithubFunctionProps {
  filePath: string
}

export type ExtractContentProps = {
  fileContent: string
  searchString: RegExp | string
}

export type ExtractContentBetweenProps = Omit<
  ExtractContentProps,
  "searchString"
> & {
  startString?: string | RegExp
  endString?: string | RegExp
}
export type NextInjectConfig = z.infer<typeof nextInjectConfigSchema>
