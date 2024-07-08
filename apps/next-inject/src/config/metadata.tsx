import { Metadata, Viewport } from "next"
import { siteConfig } from "@/config"

export const baseMetadata: Metadata = {
  title: {
    default: "Next Inject",
    template: `%s | Next Inject`,
  },
  description: "",
  keywords: [],
  openGraph: {
    title: {
      default: "Next Inject",
      template: `%s | Next Inject`,
    },
    description: "",
    url: "/",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/IMAGE-og.png`,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Next Inject",
      template: `%s | Next Inject`,
    },
    description: "",
    creator: "@TWITTER",
    images: [
      {
        url: `${siteConfig.url}/images/IMAGE-og.png`,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },

  applicationName: "Next Inject",
  manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL(siteConfig.url),

  alternates: {
    canonical: "./",
  },
}
export const staticMetadata = {
  ...baseMetadata,
}
export const baseViewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "white",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "black",
    },
  ],
  colorScheme: "dark light",
}
