import { clsx, type ClassValue } from "clsx"
import { formatDistanceToNowStrict } from "date-fns"
import locale from "date-fns/locale/en-GB"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function nameToPath(name: string): string {
  return `/${name.toLowerCase().replaceAll(" ", "_")}`
}

export function pathToName(path: string | undefined): string | undefined {
  const cleanedPath = path?.replace(/^\//, "")

  const nameWithSpaces = cleanedPath?.replace(/_/g, " ")

  const words = nameWithSpaces?.split(" ")
  const capitalizedWords = words?.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )

  return capitalizedWords?.join(" ")
}

export function getInitials(name?: string | null): string | undefined {
  // Split the name into words
  const words = name?.trim().split(/\s+/)

  // Get the first letter of each word and capitalize it
  const initials = words?.map((word) => word.charAt(0).toUpperCase()).join("")

  return initials
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result
    } else {
      if (result === "just now") return result
      return result + " ago"
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}
export function sqliteTimestampNow(): string {
  // Get the current date
  const currentDate = new Date()

  // Format the date as "YYYY-MM-DD HH:MM:SS"
  const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ")

  return formattedDate
}
export const formatPluginPrice = (currency: string, price: number) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
    currencyDisplay: "narrowSymbol",
    // You can adjust these options if needed:
    // minimumFractionDigits: 0, // (for whole numbers)
    // maximumFractionDigits: 0, // (to round decimals)
  })
  return formatter.format(price)
}
