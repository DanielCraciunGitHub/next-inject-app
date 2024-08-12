import Link from "next/link"
import { api } from "@/server/server"
import { Gift } from "lucide-react"

import { Avatars } from "@/components/Avatars"
import { CodeBlock } from "@/components/CodeBlock"
import { FiveStars } from "@/components/FiveStars"
import { StartInjectingCTA } from "@/components/StartInjectingCTA"

interface HeroSectionProps {}

export const HeroSection = async ({}: HeroSectionProps) => {
  const { count, users } = await api.pluginRouter.getPluginPurchases()

  const slotsLeft = calculateSlotsLeft(count)
  return (
    <div className="flex flex-col bg-gray-300 dark:bg-gray-900">
      <section className="mx-auto my-24 flex max-w-7xl flex-col items-center justify-center gap-16 px-8 py-8 lg:flex-row lg:items-start lg:gap-20 lg:py-20">
        <div className="flex w-full flex-col space-y-10 lg:items-start">
          <div className="flex flex-col items-center space-y-3 text-4xl font-bold tracking-tight md:text-6xl lg:items-start">
            <div>Skip the setup.</div>
            <div>
              Code <span className="text-green-500">faster</span>
            </div>
          </div>
          <div className="max-w-2xl text-center tracking-tight text-muted-foreground md:text-xl lg:text-start">
            Inject payments, databases, authentication in just one click with
            our powerful Next.js CLI.
          </div>
          <StartInjectingCTA size="xl" />
          <div className="flex space-x-1 text-sm">
            <div className="flex items-center space-x-0.5">
              <Gift className="text-green-500" />
              <span className="font-bold text-green-500">50% off</span>
            </div>
            <div className="flex items-center">
              your first plugin ({slotsLeft} left)
            </div>
          </div>
          <div>
            {users ? (
              <div className="flex flex-col items-center space-x-0 space-y-5 lg:flex-row lg:items-start lg:space-x-5 lg:space-y-0">
                <Avatars
                  avatar={users.map(({ image, name }) => ({
                    image: image,
                    name: name!,
                  }))}
                />

                <div className="flex flex-col items-center space-y-1 lg:items-start">
                  <FiveStars />
                  <div>
                    <span className="font-extrabold">{count}</span> developers
                    code faster
                  </div>
                </div>
              </div>
            ) : null}
          </div>
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
function calculateSlotsLeft(totalUsers: number): number {
  const maxSlotsPerCycle = 7 // Maximum slots before resetting
  const usersInCurrentCycle = totalUsers % maxSlotsPerCycle // Users in the current cycle

  // Calculate remaining slots
  const slotsLeft = maxSlotsPerCycle - usersInCurrentCycle

  return slotsLeft
}
