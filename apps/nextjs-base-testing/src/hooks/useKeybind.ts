"use client"

import { RefObject, useEffect } from "react"

type FocusableElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement
  | HTMLButtonElement
  | HTMLAnchorElement

type Key = string

interface KeyCombination {
  key: Key
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
}

export const useKeybind = (
  ref: RefObject<FocusableElement>,
  keyCombination: KeyCombination,
  callback: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const {
        key,
        ctrlKey = false,
        shiftKey = false,
        altKey = false,
      } = keyCombination
      if (
        event.ctrlKey === ctrlKey &&
        event.shiftKey === shiftKey &&
        event.altKey === altKey &&
        event.key.toLowerCase() === key.toLowerCase()
      ) {
        event.preventDefault()
        callback()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [ref, keyCombination, callback])
}
