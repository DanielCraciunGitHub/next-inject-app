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
            Save{" "}
            <span className="text-green-600 dark:text-green-500">$250</span>.
            Get the same result.
          </div>
        </div>
        <div className="mx-10 text-center text-lg text-muted-foreground">
          Using our pay-per-plugin model, you save{" "}
          <span className="font-bold text-green-600 dark:text-green-500">
            5x
          </span>{" "}
          the cost compared to{" "}
          <Link
            href={"https://shipfa.st/#pricing"}
            className="text-blue-500 underline"
          >
            Shipfast.
          </Link>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-stretch justify-center gap-16 px-8 py-8 lg:flex-row lg:items-start lg:gap-20 lg:py-12">
          <PricingCard
            key={1}
            ogPrice="$299"
            price="$50"
            title={"Next Inject Pro"}
            hot
            features={[
              <>
                Emails with <HoursText text="Resend" />
              </>,
              <>
                Payments with <HoursText text="Stripe" />
              </>,
              <>
                Auth with <HoursText text="Next Auth" />
              </>,
              <>
                Databases with <HoursText text="Drizzle + Turso" />
              </>,
              <>
                CMS with <HoursText text="Sanity" />
              </>,
              <>Plugin documentation included</>,
              <>SEO included</>,
              <>Styling included</>,
            ]}
            cta={
              <BundleCTA
                priceIds={Object.entries(priceIds)
                  .filter(([key, value]) => value.bundle === "pro")
                  .map(([key, value]) => value.priceId as string)}
              />
            }
            footnote="Save $250. Get the same result."
          />
          <PricingCard
            key={2}
            price="$0"
            title={"Explore"}
            features={[
              <>Emails</>,
              <>Payments</>,
              <>Auth</>,
              <>Databases</>,
              <>CMS</>,
              <>Plugin documentation</>,
              <>SEO </>,
              <>Styling</>,
            ]}
            cta={<StartInjectingCTA size="lg" className="w-full" />}
            footnote="Inject individual plugins. Get the same result."
          />
        </div>
      </div>
    </div>
  )
}
