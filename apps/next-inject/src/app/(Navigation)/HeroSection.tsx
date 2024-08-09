import Link from "next/link"
import { BsLightningChargeFill } from "react-icons/bs"

import { buttonVariants } from "@/components/ui/button"
import { CodeBlock } from "@/components/CodeBlock"

interface HeroSectionProps {}

export const HeroSection = ({}: HeroSectionProps) => {
  return (
    <div className="flex flex-col bg-gray-300 dark:bg-gray-900">
      <section className="mx-auto my-24 flex max-w-7xl flex-col items-center justify-center gap-16 px-8 py-8 lg:flex-row lg:items-start lg:gap-20 lg:py-20">
        <div className="flex w-full flex-col space-y-10 md:items-start">
          <div className="space-y-3 text-4xl font-bold tracking-tight md:text-6xl">
            <div>Skip the setup.</div>
            <div>
              Code <span className="text-green-500">faster</span>
            </div>
          </div>
          <div className="max-w-2xl tracking-tight text-muted-foreground md:text-xl">
            Inject payments, databases, authentication in just one click with
            our powerful Next.js CLI.
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
    </div>
  )
}
