import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { siteConfig } from "@/config"
import { api } from "@/server/server"
import { Callout } from "fumadocs-ui/components/callout"
import { DocsBody, DocsPage } from "fumadocs-ui/page"
import { BsGiftFill } from "react-icons/bs"

import { baseMetadata } from "@/config/metadata"
import { PluginCTA } from "@/components/Buttons/PluginCTA"
import { LoginModal } from "@/components/LoginModal"
import VerifiedSvg from "@/components/SVG/VerifiedSvg"
import { Tooltip } from "@/components/Tooltip"
import FeatureCard from "@/app/(Navigation)/FeatureCard"
import { plugins } from "@/app/source"

export default async function Page({
  params,
}: {
  params: { slug?: string[] }
}) {
  const page = plugins.getPage(params.slug)

  if (page == null) {
    notFound()
  }

  const MDX = page.data.exports.default

  const price = await api.paymentRouter.getPluginPrice({
    priceId: page.data.priceId,
  })
  const session = await api.authRouter.getSession()

  let hasPlugin
  try {
    hasPlugin = await api.pluginRouter.hasPlugin({
      priceId: page.data.priceId,
    })
  } catch (error) {
    hasPlugin = false
  }

  const PaymentButton = () => {
    if (!price) {
      return null
    }
    if (session) {
      return <PluginCTA priceId={page.data.priceId} />
    } else {
      return (
        <LoginModal>
          <PluginCTA priceId={page.data.priceId} />
        </LoginModal>
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
        <div>{page.data.description}</div>
        <MDX />
        {page.data.benefits ? (
          <div className="mb-4 flex w-full">
            <FeatureCard
              title={"Bonus Features"}
              icon={<BsGiftFill size={24} fill="yellow" />}
              features={page.data.benefits}
              className="w-full bg-muted"
            />
          </div>
        ) : null}
        {!hasPlugin && <PaymentButton />}
        <hr />
        <Callout type="info" title={`Any further questions?`}>
          Please do not hesitate to contact us by{" "}
          <Link
            rel="noopener noreferrer"
            className="text-blue-500 underline"
            href={`mailto:${siteConfig.email}`}
          >
            email
          </Link>{" "}
          or{" "}
          <Link
            rel="noopener noreferrer"
            className="text-blue-500 underline"
            // ! My X handle.
            href={siteConfig.socialLinks[3].href}
          >
            twitter
          </Link>
        </Callout>
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return plugins.getPages().map((page) => ({
    slug: page.slugs,
  }))
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = plugins.getPage(params.slug)

  if (page == null) notFound()

  return {
    ...baseMetadata,
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      ...baseMetadata.openGraph,
      title: page.data.title,
      description: page.data.description,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: page.data.title,
      description: page.data.description,
    },
  } satisfies Metadata
}
