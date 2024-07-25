import Link from "next/link"
import { DollarSign, Lock, Pickaxe } from "lucide-react"
import { BsLightningChargeFill } from "react-icons/bs"

import FeatureCard from "./FeatureCard"

interface FeaturesProps {}

export const Features = ({}: FeaturesProps) => {
  return (
    <>
      <div className="text-center text-3xl font-bold tracking-tight md:text-5xl">
        Benefits
      </div>
      <div
        id="features"
        className="mx-auto flex max-w-6xl flex-col gap-10 xl:flex-row"
      >
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
                href={"https://github.com/DanielCraciunGitHub/next-inject-app"}
                className="text-blue-500 underline"
              >
                Github
              </Link>
            </>,
            "The CLI will not run when git is not used.",
            "Our commands can only inject new code, never delete code.",
          ]}
        />
        <FeatureCard
          key={1}
          title={"Lightning-Fast"}
          icon={<BsLightningChargeFill className="text-yellow-500" size={24} />}
          features={[
            "Configure your favorite plugins with a single click",
            <>
              <HoursText text="2+ hours" /> saved configuring SEO and metadata
            </>,
            <>
              <HoursText text="5+ hours" /> saved configuring your UI
            </>,
            <>
              <HoursText text="6+ hours" /> saved configuring database providers
            </>,
            <>
              <HoursText text="9+ hours" /> saved configuring authentication
            </>,
          ]}
        />
        <FeatureCard
          key={1}
          title={"Efficiency"}
          icon={<DollarSign className="text-green-400" />}
          features={[
            "Choose only the plugins you need and pay per plugin",
            "No unnecessary boilerplate, what you see is what you get",
          ]}
        />
      </div>
    </>
  )
}
function HoursText({ text }: { text: string }) {
  return <span className="rounded bg-muted px-0.5 text-green-500">{text}</span>
}
