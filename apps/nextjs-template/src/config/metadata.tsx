import { Metadata, Viewport } from "next"
import { siteConfig } from "@/config"

export const baseMetadata: Metadata = {
  title: {
    default: "APPNAME",
    template: `%s | APPNAME`,
  },
  description: "",
  keywords: [
    // ! Main keywords here
  ],
  openGraph: {
    title: {
      default: "APPNAME",
      template: `%s | APPNAME`,
    },
    description: "",
    url: "/",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/<META-IMAGE>-og.png`,
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
      default: "APPNAME",
      template: `%s | APPNAME`,
    },
    description: "",
    creator: "@TWITTER",
    images: [
      {
        url: `${siteConfig.url}/images/<META-IMAGE>-og.png`,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },

  applicationName: "APPNAME",
  manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL(siteConfig.url),

  alternates: {
    canonical: "./",
  },
}
export const staticMetadata = {
  ...baseMetadata,
  mainPage: {
    title: { absolute: "Daniel Craciun" },
    openGraph: {
      ...baseMetadata.openGraph,
      title: { absolute: "Daniel Craciun" },
    },
    twitter: {
      ...baseMetadata.twitter,
      title: { absolute: "Daniel Craciun" },
    },
  } satisfies Metadata,
  // ! Write page-specific static metadata configurations here
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
