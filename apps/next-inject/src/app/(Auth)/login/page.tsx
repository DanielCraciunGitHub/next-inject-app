import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

import { LoginForm } from "./LoginForm"

interface pageProps {}

const page = async ({}: pageProps) => {
  const session = await auth()
  if (session) redirect("/plugins")
  return (
    <div className="flex items-center justify-center">
      <LoginForm />
    </div>
  )
}
export default page
