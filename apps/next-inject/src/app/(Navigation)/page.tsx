import { Metadata } from "next"
import { siteConfig } from "@/config"
import { FAQPageJsonLd } from "next-seo"

import { staticMetadata } from "@/config/metadata"

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
      <div className="mx-auto flex w-full flex-col font-mono">
        <HeroSection />

        <PriceComparison />

        <Demo />

        <Features />

        <FAQ />

        {/* <Pricing /> */}
      </div>
    </>
  )
}
