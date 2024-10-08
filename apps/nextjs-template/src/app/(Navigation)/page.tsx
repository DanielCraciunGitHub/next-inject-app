import { Metadata } from "next"

import { staticMetadata } from "@/config/metadata"

export default async function Home() {
  return (
    <section className="flex flex-col">
      <div className="text-4xl font-extrabold tracking-tight md:text-5xl">
        Hello world
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  ...staticMetadata.mainPage,
}
