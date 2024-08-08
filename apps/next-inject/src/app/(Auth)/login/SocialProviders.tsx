import { BsGithub, BsGitlab } from "react-icons/bs"

import { Button } from "@/components/ui/button"
import { Google } from "@/components/SVG/Google"
import { authenticate } from "@/app/_actions/authenticate"

interface SocialProvidersProps {}

export const SocialProviders = ({}: SocialProvidersProps) => {
  return (
    <>
      <Button
        variant="secondary"
        className="space-x-2"
        onClick={() => authenticate("google")}
      >
        <Google />
        <span>Login with Google</span>
      </Button>
      <Button
        variant="secondary"
        className="space-x-2"
        onClick={() => authenticate("github")}
      >
        <BsGithub size={24} />
        <span>Login with Github</span>
      </Button>
      <Button
        variant="secondary"
        className="space-x-2"
        onClick={() => authenticate("gitlab")}
      >
        <BsGitlab size={24} />
        <span>Login with GitLab</span>
      </Button>
    </>
  )
}
