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
        <div className="flex w-full flex-col space-y-10 md:items-start">
          <div className="space-y-3 text-4xl font-bold tracking-tight md:text-6xl">
            <div>Ship code</div>
            <div>
              like a <AnimatedText />
            </div>
          </div>
          <div className="max-w-2xl tracking-tight text-muted-foreground md:text-xl">
            Setup payment gateways, metadata, auth in one click with our
            powerful Next.js CLI.
          </div>
          <Link
            href="/plugins"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: "xl",
              className: "bg-primary text-white",
            })}
          >
            Start Injecting <BsLightningChargeFill fill="white" />
          </Link>
        </div>
        <div className="flex w-full flex-col md:w-3/4">
          <Link href="/plugins/payments/stripe" rel="noopener noreferrer">
            <CodeBlock code="npx next-inject add stripe" lang="bash" />
          </Link>
          <Link href="/plugins/misc/metadata" rel="noopener noreferrer">
            <CodeBlock code="npx next-inject add metadata" lang="bash" />
          </Link>
          <Link href="/plugins/auth/next-auth" rel="noopener noreferrer">
            <CodeBlock code="npx next-inject add next-auth" lang="bash" />
          </Link>
          <Link href="/plugins/backend/drizzle-turso" rel="noopener noreferrer">
            <CodeBlock code="npx next-inject add drizzle-turso" lang="bash" />
          </Link>
        </div>
      </section>
      <div className="my-16 animate-bounce self-center text-primary">
        <ChevronDown size={54} />
      </div>
    </div>
  )
}
