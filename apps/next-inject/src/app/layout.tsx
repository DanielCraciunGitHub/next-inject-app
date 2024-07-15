import { Metadata, Viewport } from "next"

import "@/styles/globals.css"

import Script from "next/script"
import NextTopLoader from "nextjs-toploader"

import { baseMetadata, baseViewport } from "@/config/metadata"
import { baseStructuredData } from "@/config/structuredData"
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
      <Script
        id="WebSite Structured Data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(baseStructuredData),
        }}
      />

      <body className="flex min-h-screen flex-col">
        <NextTopLoader showSpinner={false} color="green" />
        <Provider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </Provider>
      </body>
    </html>
  )
}
