import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { api } from "@/server/server"
import { DocsBody, DocsPage } from "fumadocs-ui/page"
import { BsLightningChargeFill } from "react-icons/bs"

import StripeButton from "@/components/Buttons/StripeButton"
import VerifiedSvg from "@/components/SVG/VerifiedSvg"
import { Tooltip } from "@/components/Tooltip"
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

  const price = await api.paymentRouter.getPluginPrice({
    priceId: page.data.priceId,
  })
  console.log("PRICE ID: " + page.data.priceId)

  const hasPlugin = await api.pluginRouter.hasPlugin({
    priceId: page.data.priceId,
  })

  const PaymentButton = () => {
    switch (price) {
      case "Undefined":
        break
      default:
        return (
          <StripeButton
            priceId={page.data.priceId}
            className="space-x-1 bg-muted-foreground"
          >
            <BsLightningChargeFill fill={"yellow"} size={16} />
            <div>
              Get Plugin |{" "}
              <span className="font-bold italic text-green-400 dark:text-green-700">
                {price}
              </span>
            </div>
          </StripeButton>
        )
    }
  }

  return (
    <DocsPage toc={page.data.exports.toc} full={page.data.full}>
      <DocsBody>
        <div className="flex flex-col-reverse items-start md:flex-row md:justify-between">
          <h1 className="mt-4 md:mt-0">{page.data.title}</h1>
          {!hasPlugin ? (
            <PaymentButton />
          ) : (
            <Tooltip
              variant={"ghost"}
              size={"icon"}
              hoverText="You own this plugin! 🥳"
            >
              <VerifiedSvg />
            </Tooltip>
          )}
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
