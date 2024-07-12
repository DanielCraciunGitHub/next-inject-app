import {
  BsDiscord,
  BsGithub,
  BsLinkedin,
  BsMedium,
  BsTwitterX,
} from "react-icons/bs"

import { NavItem, SocialLink } from "../types"

export const siteConfig = {
  email: "johndoe@gmail.com",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://<APPNAME>.vercel.app`,
  navLinks: [
    {
      name: "APP",
      href: "/",
    },
  ] satisfies NavItem[],
  socialLinks: [
    {
      href: "https://discord.gg/C2PXBMqpuV",
      name: "Discord.gg",
      icon: <BsDiscord />,
    },
    {
      href: "https://github.com/DanielCraciunGitHub",
      name: "Github.com",
      icon: <BsGithub />,
    },
    {
      href: "https://www.linkedin.com/in/dcraciun07/",
      name: "Linkedin.com",
      icon: <BsLinkedin />,
    },
    {
      href: "https://x.com/craciun_07",
      name: "X.com",
      icon: <BsTwitterX />,
    },
    {
      href: "https://medium.com/@danielcracbusiness",
      name: "Medium.com",
      icon: <BsMedium />,
    },
  ] as const satisfies SocialLink[],
  footerText:
    "© 2024 <APPNAME>. All Rights Reserved" as const satisfies string,
} as const
