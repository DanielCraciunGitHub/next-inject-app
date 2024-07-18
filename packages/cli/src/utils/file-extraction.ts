import { handleError } from "./handle-error"

import { ExtractContentBetweenProps, ExtractContentProps } from "../types"

export function extractMatchedLines({
  searchString,
  fileContent,
}: ExtractContentProps) {
  try {
    // Split the content into lines
    const lines = fileContent.split("\n")

    const regex = new RegExp(searchString)

    // Filter lines that contain the search string
    const filteredLines = lines.filter((line) => regex.test(line))

    // Combine the filtered lines into a single string separated by '\n'
    const result = filteredLines.join("\n")

    return result
  } catch (error) {
    handleError(error)
    return ""
  }
}
export function extractBetweenMatchedLines({
  fileContent,
  startString,
  endString,
}: ExtractContentBetweenProps) {
  // Split the content into lines
  const lines = fileContent.split("\n")

  // Find the index of the start and end strings

  if (!startString && !endString) {
    handleError("Please specify a start or end search string")
  }

  let startIndex
  let endIndex
  if (!startString) {
    startIndex = 0
  } else {
    const regex = new RegExp(startString)
    startIndex = lines.findIndex((line) => regex.test(line))
  }

  if (!endString) {
    endIndex = lines.length - 1
  } else {
    const regex = new RegExp(endString)
    endIndex = lines.findIndex((line) => regex.test(line))
  }

  // Ensure both strings are found and start index is before end index
  if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
    // Extract the lines between (inclusive) the start and end indices
    const extractedLines = lines.slice(startIndex, endIndex + 1)

    // Combine the extracted lines into a single string separated by '\n'
    return extractedLines.join("\n")!
  } else {
    handleError("Start string or end string not found, or out of order.")
  }
  return ""
}
export function extractAllLines(fileContent: string): string[] {
  return fileContent.split(/\r?\n/)
}
