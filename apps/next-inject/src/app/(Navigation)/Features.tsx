import Link from "next/link"
import { DollarSign, Lock } from "lucide-react"
import { BsLightningChargeFill } from "react-icons/bs"

import FeatureCard from "./FeatureCard"

interface FeaturesProps {}

export const Features = ({}: FeaturesProps) => {
  return (
    <div id="benefits" className="bg-gray-400 dark:bg-gray-800">
      <div className="mx-2 my-36 space-y-4">
        <div className="text-center text-4xl font-bold tracking-tight text-white md:text-6xl">
          No Fuss. Only{" "}
          <span className="text-green-600 dark:text-green-500">Benefits</span>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-stretch justify-center gap-16 px-8 py-8 lg:flex-row lg:items-start lg:gap-20 lg:py-12">
          <FeatureCard
            key={1}
            title={"100% Secure"}
            icon={<Lock className="text-blue-500" />}
            features={[
              <>
                The source code is available on{" "}
                <Link
                  href={
                    "https://github.com/DanielCraciunGitHub/next-inject-app"
                  }
                  className="text-blue-500 underline"
                >
                  Github
                </Link>
              </>,
              "The CLI enforces git usage",
              "The CLI can only add code, never delete code",
            ]}
          />
          <FeatureCard
            key={2}
            title={"Lightning Fast"}
            icon={
              <BsLightningChargeFill className="text-yellow-500" size={24} />
            }
            features={[
              "One-click configuration",
              <>
                <HoursText text="2+ hours" /> saved configuring SEO
              </>,
              <>
                <HoursText text="5+ hours" /> saved configuring UI
              </>,
              <>
                <HoursText text="6+ hours" /> saved configuring databases
              </>,
              <>
                <HoursText text="9+ hours" /> saved configuring auth
              </>,
            ]}
          />
          <FeatureCard
            key={3}
            title={"Flexible"}
            icon={<DollarSign className="text-green-400" />}
            features={[
              "Buy once, use forever",
              "Pay-per-plugin model = reduced costs",
              "No confusing boilerplate, only get what you pay for",
            ]}
          />
        </div>
      </div>
    </div>
  )
}
export function HoursText({ text }: { text: string }) {
  return <span className="rounded bg-muted px-0.5 text-green-500">{text}</span>
}
