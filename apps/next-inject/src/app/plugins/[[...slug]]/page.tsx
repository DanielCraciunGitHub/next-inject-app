import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DocsBody, DocsPage } from "fumadocs-ui/page"

import StripeButton from "@/components/Buttons/StripeButton"
import { getPluginPrice } from "@/app/_actions/stripe"
import { getPage, getPages } from "@/app/source"

export default async function Page({
  params,
}: {
  params: { slug?: string[] }
}) {
  const page = getPage(params.slug)

  if (page == null) {
    notFound()
  }

  const MDX = page.data.exports.default

  const price = await getPluginPrice(page.data.priceId)

  return (
    <DocsPage toc={page.data.exports.toc} full={page.data.full}>
      <DocsBody>
        <div className="flex items-start justify-between">
          <h1>{page.data.title}</h1>
          {price !== "Free" ? (
            <StripeButton name={price} priceId={page.data.priceId} />
          ) : null}
        </div>
        <MDX />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return getPages().map((page) => ({
    slug: page.slugs,
  }))
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = getPage(params.slug)

  if (page == null) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata
}
