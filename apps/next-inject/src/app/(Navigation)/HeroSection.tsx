import Link from "next/link"
import { BsLightningChargeFill } from "react-icons/bs"

import { buttonVariants } from "@/components/ui/button"
import { CodeBlock } from "@/components/CodeBlock"

import { AnimatedText } from "./AnimatedText"

interface HeroSectionProps {}

export const HeroSection = ({}: HeroSectionProps) => {
  return (
    <section className="flex flex-col items-center md:grid md:grid-cols-12 md:place-items-center md:items-start">
      <div className="flex max-w-lg flex-col items-center space-y-10 font-mono md:col-span-7 md:items-start">
        <div className="space-y-3 text-5xl font-bold tracking-tight md:text-6xl">
          <div>Ship startups</div>
          <div>
            like a <AnimatedText />
          </div>
        </div>
        <div className="tracking-tight text-muted-foreground md:text-xl">
          A Next.js CLI designed to create apps fast, and feel like a hacker
          while doing it
        </div>
        <Link
          href="/plugins"
          rel="noopener noreferrer"
          className={buttonVariants({ size: "xl" })}
        >
          Start Injecting <BsLightningChargeFill fill="green" />
        </Link>
      </div>
      <div className="max-w-md space-y-10 place-self-start font-mono md:col-span-5">
        <div className="space-y-3 text-4xl font-bold tracking-tight md:text-6xl">
          Try it now
        </div>
        <div className="tracking-tight text-muted-foreground md:text-xl">
          Generate static metadata for new and existing websites in one click
        </div>
        <CodeBlock code="npx next-inject add metadata" lang="bash" />
      </div>
    </section>
  )
}
