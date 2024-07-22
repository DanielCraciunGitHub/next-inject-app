import { Metadata } from "next"
import { siteConfig } from "@/config"
import { FAQPageJsonLd } from "next-seo"

import { staticMetadata } from "@/config/metadata"

import { Demo } from "./Demo"
import { FAQ } from "./FAQ"
import { HeroSection } from "./HeroSection"
import { Pricing } from "./Pricing"

export const metadata: Metadata = {
  ...staticMetadata.mainPage,
}

export default async function Home() {
  return (
    <div className="mt-24 w-full">
      <FAQPageJsonLd mainEntity={[...siteConfig.faq]} useAppDir={true} />

      <HeroSection />
      <Demo />
      <Pricing />
      <FAQ />
    </div>
  )
}
