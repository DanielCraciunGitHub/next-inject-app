"use client"

import { useEffect, useState } from "react"

export const AnimatedText = () => {
  const words = ["hacker", "10x dev", "pro"]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 1500) // Change the interval duration (in milliseconds) as desired

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="rounded bg-neutral-500 px-1">
      {words[currentWordIndex]}
    </span>
  )
}
