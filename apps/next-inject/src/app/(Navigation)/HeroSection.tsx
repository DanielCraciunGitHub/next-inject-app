import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { BsLightningChargeFill } from "react-icons/bs"

import { buttonVariants } from "@/components/ui/button"
import { CodeBlock } from "@/components/CodeBlock"

import { AnimatedText } from "./AnimatedText"

interface HeroSectionProps {}

export const HeroSection = ({}: HeroSectionProps) => {
  return (
    <div className="flex flex-col">
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 px-8 py-8 font-mono lg:flex-row lg:items-start lg:gap-20 lg:py-20">
        <div className="flex max-w-lg flex-col space-y-10 md:items-start">
          <div className="space-y-3 text-5xl font-bold tracking-tight md:text-6xl">
            <div>Ship code</div>
            <div>
              like a <AnimatedText />
            </div>
          </div>
          <div className="tracking-tight text-muted-foreground md:text-xl">
            A Next.js CLI designed for you to create apps fast, and feel like a
            hacker at the same time
          </div>
          <Link
            href="/plugins"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: "xl",
              className: "bg-primary",
            })}
          >
            Start Injecting <BsLightningChargeFill fill="green" />
          </Link>
        </div>
        <div className="max-w-lg space-y-10">
          <div className="space-y-3 text-4xl font-bold tracking-tight md:text-6xl">
            Try our metadata plugin
          </div>
          <div className="tracking-tight text-muted-foreground md:text-xl">
            Fully configure static metadata for new and existing websites in one
            click
          </div>
          <CodeBlock code="npx next-inject add metadata" lang="bash" />
        </div>
      </section>
      <div className="mt-48 animate-bounce self-center text-primary">
        <ChevronDown size={54} />
      </div>
    </div>
  )
}
