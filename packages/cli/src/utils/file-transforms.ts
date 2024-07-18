import { InjectContentProps, ExtractContentProps } from "../types"
import { handleError } from "./handle-error"
import { logger } from "./logger"

export function injectInner({
  insertContent,
  insertPoint,
  direction = "below",
  fileContent,
}: InjectContentProps) {
  try {
    const lines = fileContent.split("\n")
    let insertIndex = -1

    // Find the insert point line
    const regex = new RegExp(insertPoint)
    for (let i = 0; i < lines.length; i++) {
      if (regex.test(lines[i])) {
        insertIndex = i
        break
      }
    }

    insertIndex++
    if (insertIndex === -1) {
      logger.error(
        `Error inserting content in the correct location. Content inserted at the bottom of the file.`
      )
      const modifiedContent = merge(
        fileContent,
        "\n====================",
        insertContent
      )
      return modifiedContent
    }

    // Insert new content above or below the insert point
    if (direction === "above") {
      lines.splice(insertIndex - 1, 0, insertContent)
    } else {
      lines.splice(insertIndex, 0, insertContent)
    }

    const modifiedContent = lines.join("\n")

    return modifiedContent
  } catch (error) {
    handleError(error)
    return ""
  }
}

// export function omitLines({
//   fileContent,
//   searchStrings,
// }: ExtractContentProps): string {
//   // Split the content into lines
//   const lines = fileContent.split("\n")

//   const regex = new RegExp(searchStrings)

//   // Filter out lines that contain the search string
//   const filteredLines = lines.filter((line) => regex.test(line))

//   // Combine the filtered lines into a single string separated by '\n'
//   const result = filteredLines.join("\n")

//   return result
// }

export function merge(...filesContent: string[]) {
  let finalFileContent: string = ""
  for (const fileContent of filesContent) {
    finalFileContent += `${fileContent}\n`
  }
  return finalFileContent
}

export function searchAndReplace({
  fileContent,
  targetString,
  newContent,
}: {
  fileContent: string
  targetString: string | RegExp
  newContent: string
}) {
  // Replace the target string with the new content
  const newFileContent = fileContent.replace(
    new RegExp(targetString),
    newContent
  )

  return newFileContent
}

export function injectOuter({
  insertContent,
  direction = "below",
  fileContent,
}: Omit<InjectContentProps, "insertPoint">) {
  try {
    const lines = fileContent.split("\n")
    let insertIndex = -1

    // Find the insert point line
    if (direction === "above") {
      if (lines[0].includes("use client")) {
        insertIndex = 1
      } else {
        insertIndex = 0
      }
    } else {
      insertIndex = lines.length - 1
    }

    lines.splice(insertIndex, 0, insertContent)

    const modifiedContent = lines.join("\n")

    return modifiedContent
  } catch (error) {
    handleError(error)
    return ""
  }
}
