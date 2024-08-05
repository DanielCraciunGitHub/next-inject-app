import { BsLightningChargeFill } from "react-icons/bs"

import FeatureCard from "./FeatureCard"
import { HoursText } from "./Features"

interface PriceComparisonProps {}

export const PriceComparison = ({}: PriceComparisonProps) => {
  return (
    <div id="pricing" className="bg-neutral-400 dark:bg-neutral-800">
      <div className="my-12 space-y-4">
        <div className="text-center text-3xl tracking-tight text-white md:text-5xl">
          Price Comparison
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 px-8 py-8 lg:flex-row lg:items-start lg:gap-20 lg:py-20">
          <div className="space-y-2">
            <FeatureCard
              key={3}
              title={"Next Inject"}
              icon={<BsLightningChargeFill fill="green" />}
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
                  Styling ~ <HoursText text="$10" />
                </>,
              ]}
            />
            <div className="text-center text-2xl tracking-tight text-white md:text-3xl">
              Total: <span className="text-green-500">$50</span>
            </div>
          </div>
          <div className="space-y-2">
            <FeatureCard
              key={3}
              title={"Shipfast"}
              icon={<BsLightningChargeFill fill="yellow" />}
              features={[
                "Emails",
                "Payments",
                "Auth",
                "Database",
                "SEO",
                "Styling",
              ]}
            />
            <div className="text-center text-2xl tracking-tight text-white md:text-3xl">
              Total: <span className="text-red-500">$299</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
