import { Metadata, Viewport } from "next"

import { baseMetadata, baseViewport } from "@/config/metadata"

export const metadata: Metadata = {
  ...baseMetadata,
  title: { absolute: "Daniel Craciun" },
  openGraph: {
    ...baseMetadata.openGraph,
    title: { absolute: "Daniel Craciun" },
  },
  twitter: {
    ...baseMetadata.twitter,
    title: { absolute: "Daniel Craciun" },
  },
}
export const viewport: Viewport = {
  ...baseViewport,
}

export default async function Home() {
  return (
    <section className="flex flex-col">
      <div className="text-4xl font-extrabold tracking-tight md:text-5xl">
        Hello world
      </div>
    </section>
  )
}
