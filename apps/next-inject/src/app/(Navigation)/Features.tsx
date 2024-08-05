import Link from "next/link"
import { DollarSign, Lock } from "lucide-react"
import { BsLightningChargeFill } from "react-icons/bs"

import FeatureCard from "./FeatureCard"

interface FeaturesProps {}

export const Features = ({}: FeaturesProps) => {
  return (
    <div id="benefits" className="bg-gray-500 dark:bg-gray-600">
      <div className="my-24 space-y-4">
        <div className="text-center text-3xl tracking-tight text-white md:text-5xl">
          Benefits
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:items-stretch xl:flex-row">
          <FeatureCard
            key={1}
            title={"100% Secure"}
            icon={<Lock className="text-blue-500" />}
            features={[
              <>
                The CLI is listed on the{" "}
                <Link
                  href={"https://www.npmjs.com/package/next-inject"}
                  className="text-blue-500 underline"
                >
                  npm registry
                </Link>
              </>,
              <>
                The source code is also available on{" "}
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
              "The CLI will only inject code, never delete code",
            ]}
          />
          <FeatureCard
            key={2}
            title={"Lightning-Fast"}
            icon={
              <BsLightningChargeFill className="text-yellow-500" size={24} />
            }
            features={[
              "One-click configuration for all plugins",
              <>
                <HoursText text="2+ hours" /> saved configuring SEO and metadata
              </>,
              <>
                <HoursText text="5+ hours" /> saved configuring UI
              </>,
              <>
                <HoursText text="6+ hours" /> saved configuring databases
              </>,
              <>
                <HoursText text="9+ hours" /> saved configuring authentication
              </>,
            ]}
          />
          <FeatureCard
            key={3}
            title={"Flexibility"}
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
