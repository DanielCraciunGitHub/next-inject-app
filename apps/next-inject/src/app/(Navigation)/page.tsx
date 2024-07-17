import { Metadata } from "next"
import { siteConfig } from "@/config"
import { FAQPageJsonLd } from "next-seo"

import { staticMetadata } from "@/config/metadata"

export const metadata: Metadata = {
  ...staticMetadata.mainPage,
}

export default async function Home() {
  return (
    <>
      <FAQPageJsonLd mainEntity={[...siteConfig.faq]} useAppDir={true} />
      <section className="flex flex-col">
        <div className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Hello world
        </div>
      </section>
    </>
  )
}
