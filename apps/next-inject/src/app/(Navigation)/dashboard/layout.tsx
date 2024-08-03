import { ReactNode } from "react"
import { Metadata } from "next"
import { api } from "@/server/server"

import { staticMetadata } from "@/config/metadata"
import { LogoutButton } from "@/components/LogoutButton"

interface layoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  ...staticMetadata.dashboard,
}

const layout = async ({ children }: layoutProps) => {
  const session = await api.authRouter.getSession()

  return (
    <div className="mt-2 flex w-full max-w-2xl flex-col items-center font-mono">
      <div className="mb-1 flex items-center justify-center space-x-2 self-end rounded bg-muted p-2">
        <h1 className="tracking-tight text-muted-foreground">Logout</h1>
        <LogoutButton session={session} />
      </div>
      <h1 className="text-xl font-bold tracking-tight md:text-2xl xl:text-3xl">
        Welcome <span className="text-primary">{session?.user.name}</span>
      </h1>

      {/*  */}
      <div className="w-full">{children}</div>
    </div>
  )
}
export default layout
