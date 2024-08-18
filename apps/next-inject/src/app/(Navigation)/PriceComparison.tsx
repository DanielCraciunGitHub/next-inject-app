import { BsLightningChargeFill } from "react-icons/bs"

import FeatureCard from "./FeatureCard"
import { HoursText } from "./Features"

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
          the cost.
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 px-8 py-8 lg:flex-row lg:items-start lg:gap-20 lg:py-12">
          <div className="space-y-2">
            <FeatureCard
              key={3}
              title={"Next Inject"}
              icon={<BsLightningChargeFill fill="green" size={24} />}
              features={[
                <>
                  Emails ~ <HoursText text="$5" />
                </>,
                <>
                  Payments ~ <HoursText text="$13" />
                </>,
                <>
                  Auth ~ <HoursText text="$10" />
                </>,
                <>
                  Database ~ <HoursText text="$11" />
                </>,
                <>
                  SEO ~ <HoursText text="$0" />
                </>,
                <>
                  Styling ~ <HoursText text="$11" />
                </>,
              ]}
            />
            <div className="text-center text-2xl tracking-tight text-white md:text-4xl">
              = <span className="text-green-600 dark:text-green-500">$50</span>
            </div>
          </div>
          <div className="space-y-2">
            <FeatureCard
              key={3}
              title={"Shipfast"}
              icon={<BsLightningChargeFill fill="yellow" size={24} />}
              features={[
                "Emails",
                "Payments",
                "Auth",
                "Database",
                "SEO",
                "Styling",
              ]}
            />
            <div className="text-center text-2xl tracking-tight text-white md:text-4xl">
              = <span className="text-red-500">$299</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
