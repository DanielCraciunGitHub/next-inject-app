import { useEffect, useState } from "react"

export const useScrollUp = () => {
  const [scrollingUp, setScrollingUp] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY((prevScrollY) => {
        if (currentScrollY - prevScrollY < 0) {
          setScrollingUp(true)
        } else {
          setScrollingUp(false)
        }
        return currentScrollY
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return { scrollingUp, scrollY }
}
