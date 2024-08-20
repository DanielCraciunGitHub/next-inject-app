import { Metadata } from "next"
import { siteConfig } from "@/config"
import { FAQPageJsonLd } from "next-seo"

import { staticMetadata } from "@/config/metadata"
import { LandingCTA } from "@/components/LandingCTA"
import { WallOfLove } from "@/components/WallOfLove"

import { Demo } from "./Demo"
import { FAQ } from "./FAQ"
import { Features } from "./Features"
import { HeroSection } from "./HeroSection"
import { PriceComparison } from "./PriceComparison"

export const metadata: Metadata = {
  ...staticMetadata.mainPage,
}

export default async function Home() {
  return (
    <>
      <FAQPageJsonLd mainEntity={[...siteConfig.faq]} useAppDir={true} />
      <div className="mx-auto flex w-full flex-col">
        <HeroSection />

        <Demo />

        <Features />

        <PriceComparison />

        <FAQ />

        {/* <WallOfLove /> */}

        <LandingCTA />
      </div>
    </>
  )
}
