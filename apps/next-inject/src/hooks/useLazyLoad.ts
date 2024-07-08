// useLazyLoad.ts
import { useEffect, useState } from "react"

type ImportFunction = () => Promise<any>

function useLazyLoad(importFunction: ImportFunction): boolean {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    importFunction().then(() => {
      setLoaded(true)
    })
  }, [importFunction])

  return loaded
}

export default useLazyLoad
