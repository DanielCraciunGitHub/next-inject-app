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
                The package is publicly listed on the{" "}
                <Link
                  href={"https://www.npmjs.com/package/next-inject"}
                  className="text-blue-500 underline"
                >
                  npm registry
                </Link>
              </>,
              <>
                The source code is also publicly available on{" "}
                <Link
                  href={
                    "https://github.com/DanielCraciunGitHub/next-inject-app"
                  }
                  className="text-blue-500 underline"
                >
                  Github
                </Link>
              </>,
              "The CLI will always enforce git usage",
              "Our commands can only inject new code, never delete code",
            ]}
          />
          <FeatureCard
            key={1}
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
                <HoursText text="5+ hours" /> saved configuring your UI
              </>,
              <>
                <HoursText text="6+ hours" /> saved configuring database
                providers
              </>,
              <>
                <HoursText text="9+ hours" /> saved configuring authentication
              </>,
            ]}
          />
          <FeatureCard
            key={1}
            title={"Flexibility"}
            icon={<DollarSign className="text-green-400" />}
            features={[
              "Buy once, use forever",
              "Pay-per-plugin model leading to reduced costs",
              "No confusing boilerplate, what you see is what you get",
            ]}
          />
        </div>
      </div>
    </div>
  )
}
function HoursText({ text }: { text: string }) {
  return <span className="rounded bg-muted px-0.5 text-green-500">{text}</span>
}
