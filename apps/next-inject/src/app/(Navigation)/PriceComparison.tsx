import Link from "next/link"

import { priceIds } from "@/config/pricing"
import { BundleCTA } from "@/components/Buttons/PluginCTA"
import { StartInjectingCTA } from "@/components/StartInjectingCTA"

import { HoursText } from "./Features"
import { PricingCard } from "./PricingCard"

interface PriceComparisonProps {}

export const PriceComparison = ({}: PriceComparisonProps) => {
  return (
    <div id="pricing" className="bg-gray-400 dark:bg-gray-800">
      <div className="mx-auto my-12 max-w-6xl space-y-4">
        <div className="space-y-3 text-center text-4xl font-bold tracking-tight md:text-6xl">
          <div>
            Skip the boring stuff. Code{" "}
            <span className="text-green-600 dark:text-green-500">faster!</span>
          </div>
        </div>
        <div className="mx-10 text-center text-lg text-muted-foreground">
          Enjoy modular plugins, zero confusing boilerplate, and save{" "}
          <span className="font-bold text-green-600 dark:text-green-500">
            5x
          </span>{" "}
          the cost compared to{" "}
          <Link
            href={"https://shipfa.st/#pricing"}
            className="text-blue-500 underline"
          >
            Shipfast!
          </Link>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-stretch justify-center gap-16 px-8 py-8 lg:flex-row lg:items-start lg:gap-20 lg:py-12">
          <PricingCard
            key={2}
            price="$0"
            title={"Explore"}
            features={[
              <>
                Unlimited access to our collection of <HoursText text="FREE" />{" "}
                plugins
              </>,
              <>Inject plugins into new and existing projects seamlessly</>,
              <>
                <HoursText text="Detailed documentation" /> for all plugins
              </>,
            ]}
            cta={<StartInjectingCTA size="lg" className="w-full" />}
            footnote="Create your dream app. One piece at a time."
          />
          <PricingCard
            key={1}
            ogPrice="$299"
            price="$50"
            title={"Next Inject PRO"}
            hot
            features={[
              <>
                <HoursText text="Resend PRO Plugin" /> for emails
              </>,
              <>
                <HoursText text="Stripe PRO Plugin" /> for payment handling
              </>,
              <>
                <HoursText text="Next Auth PRO Plugin" /> for user
                authentication
              </>,
              <>
                <HoursText text="Drizzle + Turso PRO Plugin" /> for database
                configuration
              </>,
              <>
                <HoursText text="Sanity PRO Plugin" /> for content management
              </>,
              <>
                <HoursText text="Metadata PRO Plugin" /> to fully configure SEO
              </>,
              <>
                <HoursText text="100% modular plugins" /> to keep your codebase
                clean
              </>,
              <>
                <HoursText text="Zero abstraction" />. You get exactly what you
                pay for
              </>,
              <>
                <HoursText text="Detailed documentation" /> for all plugins
              </>,
              <>Built-in Styling</>,
            ]}
            cta={
              <BundleCTA
                priceIds={Object.entries(priceIds)
                  .filter(([key, value]) => value.bundle === "pro")
                  .map(([key, value]) => value.priceId as string)}
              />
            }
            footnote="Pay once. Enjoy forever!"
          />
        </div>
      </div>
    </div>
  )
}
