import { Metadata } from "next"
import { siteConfig } from "@/config"
import { FAQPageJsonLd } from "next-seo"

import { staticMetadata } from "@/config/metadata"

import { Demo } from "./Demo"
import { FAQ } from "./FAQ"
import { Features } from "./Features"
import { HeroSection } from "./HeroSection"

export const metadata: Metadata = {
  ...staticMetadata.mainPage,
}

export default async function Home() {
  return (
    <>
      <FAQPageJsonLd mainEntity={[...siteConfig.faq]} useAppDir={true} />
      <div className="mx-auto my-24 flex w-full max-w-7xl flex-col space-y-24">
        <HeroSection />

        <Demo />

        <Features />

        <FAQ />

        {/* <Pricing /> */}
      </div>
    </>
  )
}
