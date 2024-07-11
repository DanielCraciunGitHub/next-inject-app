import { ReactNode } from "react"

interface layoutProps {
  children: ReactNode
}

const layout = ({ children }: layoutProps) => {
  return (
    <>
      <div className="w-full max-w-2xl">{children}</div>
    </>
  )
}
export default layout
