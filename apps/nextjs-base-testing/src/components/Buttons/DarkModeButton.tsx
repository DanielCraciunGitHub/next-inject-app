"use client"

import { useRef } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { useKeybind } from "@/hooks/useKeybind"
import { Button } from "@/components/ui/button"

export function DarkModeButton() {
  const { theme, setTheme } = useTheme()

  const buttonRef = useRef<HTMLButtonElement>(null)

  useKeybind(buttonRef, { key: "l", ctrlKey: true, shiftKey: true }, () =>
    buttonRef.current?.click()
  )

  return (
    <Button
      variant="outline"
      size="icon"
      ref={buttonRef}
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
    >
      <span className="sr-only">Toggle Dark Mode</span>
      <Sun className="transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
