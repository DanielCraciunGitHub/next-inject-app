import {
  BsDiscord,
  BsGithub,
  BsLinkedin,
  BsMedium,
  BsTwitterX,
} from "react-icons/bs"

import { FAQ, NavItem, SocialLink } from "../types"

export const siteConfig = {
  email: "danielcracbusiness@gmail.com",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://next-inject.vercel.app`,
  navLinks: [
    {
      name: "Next Inject",
      href: "/",
    },
    {
      name: "Plugins",
      href: "/plugins",
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
  faq: [
    {
      questionName: "What is Next Inject?",
      acceptedAnswerText:
        "Next Inject is a website that showcases plugins installable into a Next.js application to provide automatic setup of certain features using a CLI.",
    },
    {
      questionName: "How do I install a plugin with Next Inject?",
      acceptedAnswerText:
        "To install a plugin with Next Inject, use our user-friendly CLI tool to automatically configure the desired feature in your Next.js application.",
    },
    {
      questionName: "What types of plugins are available on Next Inject?",
      acceptedAnswerText:
        "Next Inject offers a variety of plugins for different integrations such as metadata, SEO, analytics, Stripe, e-commerce, authentication, and more.",
    },
    {
      questionName: "Is Next Inject compatible existing Next.js projects?",
      acceptedAnswerText:
        "Next Inject is designed to be 100% compatible with our base Next.js template, and we are also integrating support for existing Next.js projects.",
    },
  ] as const satisfies FAQ,
  footerText:
    "© 2024 Next Inject. All Rights Reserved" as const satisfies string,
} as const
