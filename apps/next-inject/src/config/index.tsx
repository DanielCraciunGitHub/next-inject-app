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
      name: "Pricing",
      href: "/#pricing",
    },
    {
      name: "Demo",
      href: "/#demo",
    },
    {
      name: "Benefits",
      href: "/#benefits",
    },
    // {
    //   name: "Pricing",
    //   href: "#pricing",
    // },
    {
      name: "FAQ",
      href: "/#faq",
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
      href: "https://medium.com/@dc0",
      name: "Medium.com",
      icon: <BsMedium />,
    },
  ] as const satisfies SocialLink[],
  faq: [
    {
      questionName: "What is Next Inject?",
      acceptedAnswerText:
        "Next Inject is a website that showcases plugins for Next.js applications. Next Inject also comes with a CLI used to inject plugins to configure your Next.js app. (e.g. Stripe, Auth.js)",
    },
    {
      questionName: "How do we compare to shipfast?",
      acceptedAnswerText:
        "Shipfast is a boilerplate repository which contains many useful components but at a hefty price. Next Inject solves the hefty price issue and simultaneously promotes freedom of choice; i.e. you are not forced to use MongoDB!",
    },
    {
      questionName: "How do I install a plugin with Next Inject?",
      acceptedAnswerText:
        "Run `next-inject add [plugin]` to configure the desired plugin in your Next.js application.",
    },
    {
      questionName: "What types of plugins are available on Next Inject?",
      acceptedAnswerText:
        "Next Inject offers a variety of plugins for different integrations such as metadata, SEO, analytics, Stripe, e-commerce, authentication, and more.",
    },
    {
      questionName: "Is Next Inject compatible existing Next.js projects?",
      acceptedAnswerText:
        "Next Inject is 100% compatible with our base Next.js template, and we are incrementally supporting existing Next.js projects.",
    },
  ] as const satisfies FAQ,
  footerText:
    "© 2024 Next Inject. All Rights Reserved" as const satisfies string,
} as const
