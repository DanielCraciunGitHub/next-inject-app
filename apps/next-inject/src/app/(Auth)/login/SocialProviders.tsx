"use client"

import { usePathname } from "next/navigation"
import { BsGithub, BsGitlab } from "react-icons/bs"

import { Button } from "@/components/ui/button"
import { Google } from "@/components/SVG/Google"
import { authenticate } from "@/app/_actions/authenticate"

interface SocialProvidersProps {}

export const SocialProviders = ({}: SocialProvidersProps) => {
  const pathname = usePathname()
  return (
    <>
      <Button
        variant="secondary"
        className="space-x-2"
        onClick={() => authenticate("google", pathname)}
      >
        <Google />
        <span>Login with Google</span>
      </Button>
      <Button
        variant="secondary"
        className="space-x-2"
        onClick={() => authenticate("github", pathname)}
      >
        <BsGithub size={24} />
        <span>Login with Github</span>
      </Button>
      <Button
        variant="secondary"
        className="space-x-2"
        onClick={() => authenticate("gitlab", pathname)}
      >
        <BsGitlab size={24} />
        <span>Login with GitLab</span>
      </Button>
    </>
  )
}
