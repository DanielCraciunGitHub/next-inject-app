import "@/styles/globals.css"

import { Metadata, Viewport } from "next"
import { siteConfig } from "@/config"
import { GoogleAnalytics } from "@next/third-parties/google"
import { OrganizationJsonLd } from "next-seo"
import NextTopLoader from "nextjs-toploader"

import { baseMetadata, baseViewport } from "@/config/metadata"
import { Provider } from "@/components/providers"

export const metadata: Metadata = {
  ...baseMetadata,
}
export const viewport: Viewport = {
  ...baseViewport,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <NextTopLoader showSpinner={false} color="green" />
        <Provider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </Provider>
        <GoogleAnalytics gaId="G-J8RBM2CRZK" />
        <OrganizationJsonLd
          useAppDir={true}
          type="Corporation"
          id={`${siteConfig.url}`}
          logo={`${siteConfig.url}/images/next-inject.webp`}
          legalName="Next Inject"
          name="Next Inject"
          contactPoint={[
            {
              contactType: "customer service",
              email: siteConfig.email,
            },
          ]}
          sameAs={siteConfig.socialLinks.map((link) => link.href)}
          url={`${siteConfig.url}`}
        />
      </body>
    </html>
  )
}
