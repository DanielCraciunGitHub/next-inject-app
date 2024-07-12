import { siteConfig } from "@/config"

import SocialLink from "@/components/SocialLink"

const socialLinkNames = siteConfig.socialLinks.map((link) => link.name)

interface SocialLinksArrayProps {
  socialLinks: typeof socialLinkNames
}

export const SocialLinksArray = ({ socialLinks }: SocialLinksArrayProps) => {
  const discord = siteConfig.socialLinks.find(
    (link) => link.name === "Discord.gg"
  )!
  const medium = siteConfig.socialLinks.find(
    (link) => link.name === "Medium.com"
  )!
  const x = siteConfig.socialLinks.find((link) => link.name === "X.com")!
  const linkedIn = siteConfig.socialLinks.find(
    (link) => link.name === "Linkedin.com"
  )!
  const github = siteConfig.socialLinks.find(
    (link) => link.name === "Github.com"
  )!

  return (
    <div className="flex space-x-2">
      {socialLinks.includes("Discord.gg") ? (
        <SocialLink
          key={discord.href}
          name={discord.name}
          href={discord.href}
          icon={discord.icon}
          className="bg-blue-800 text-white dark:text-white"
        />
      ) : null}

      {socialLinks.includes("Medium.com") ? (
        <SocialLink
          key={medium.href}
          name={medium.name}
          href={medium.href}
          icon={medium.icon}
          className="bg-yellow-800 text-white dark:text-white"
        />
      ) : null}

      {socialLinks.includes("X.com") ? (
        <SocialLink
          key={x.href}
          name={x.name}
          href={x.href}
          icon={x.icon}
          className="bg-black text-white dark:text-white"
        />
      ) : null}

      {socialLinks.includes("Linkedin.com") ? (
        <SocialLink
          key={linkedIn.href}
          name={linkedIn.name}
          href={linkedIn.href}
          icon={linkedIn.icon}
          className="bg-blue-600 text-white dark:text-white"
        />
      ) : null}

      {socialLinks.includes("Github.com") ? (
        <SocialLink
          key={github.href}
          name={github.name}
          href={github.href}
          icon={github.icon}
          className="bg-black text-white dark:text-white"
        />
      ) : null}
    </div>
  )
}
