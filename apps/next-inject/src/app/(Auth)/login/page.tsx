import Link from "next/link"
import { redirect } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { auth } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"

import { LoginForm } from "./LoginForm"

interface pageProps {}

const page = async ({}: pageProps) => {
  const session = await auth()
  if (session) redirect("/plugins")
  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center space-y-2">
      <Link
        href={`/plugins`}
        className={cn(buttonVariants({ variant: "outline" }), "self-start")}
        tabIndex={0}
      >
        <ChevronLeft />
      </Link>
      <LoginForm />
      <Toaster />
    </div>
  )
}
export default page
