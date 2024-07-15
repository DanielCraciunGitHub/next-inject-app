/**
 * All config-based metadata is located here.
 * This includes:
 * @baseMetadata shared metadata for all pages
 * @staticMetadata metadata for specific static pages
 * @baseViewport viewport options for all pages
 * @sitemap the generated sitemap for static and dynamic pages.
 * @robots the generated robots.txt file
 * @manifest the generated manifest file
 *
 * For dynamic metadata, we recommend using the generateMetadata function from Next.js inside
 * Individual pages:
 *
 * And as for structured data (JSON-LD) we installed `next-seo` and we recommend using it
 * on individual page/layout files.
 *
 * Here are the docs: https://www.npmjs.com/package/next-seo#json-ld
 */

import { Metadata, MetadataRoute, Viewport } from "next"
import { siteConfig } from "@/config"

export const baseMetadata: Metadata = {
  title: {
    default: "<APPNAME>",
    template: `%s | <APPNAME>`,
  },
  description: "<APPNAME> - Amazing Product",
  keywords: [],
  applicationName: "<APPNAME>",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: {
      default: "<APPNAME>",
      template: `%s | <APPNAME>`,
    },
    description: "<APPNAME> - Amazing product",
    url: "/",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/<APPNAME>-og.png`,
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
      default: "<APPNAME>",
      template: `%s | <APPNAME>`,
    },
    description: "<APPNAME> - Amazing product",
    creator: "@<APPNAME> - TWITTER",
    images: [
      {
        url: `${siteConfig.url}/images/<APPNAME>-og.png`,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
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

export const staticMetadata = {
  ...baseMetadata,
  mainPage: {
    title: { absolute: "<APPNAME>" },
    openGraph: {
      ...baseMetadata.openGraph,
      title: { absolute: "<APPNAME>" },
    },
    twitter: {
      ...baseMetadata.twitter,
      title: { absolute: "<APPNAME>" },
    },
  } satisfies Metadata,
  // ! Write page-specific static metadata configurations here...
}

export async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries = [
    ...siteConfig.navLinks.map((page) => ({
      url: siteConfig.url + page.href,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    })),
    // ! Render dynamic sitemap entries here...
  ] as MetadataRoute.Sitemap

  return sitemapEntries
}
// ! These are the base robots.txt properties, make sure to change/add additional properties as you see fit.
export function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}

// ! These are the most important manifest properties, make sure to add additional properties as you see fit.
export function manifest(): MetadataRoute.Manifest {
  return {
    name: "<APPNAME>",
    short_name: "<APPNAME>",
    description: "<APPNAME> - A Great Product",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    display: "standalone",
    start_url: "/",
    orientation: "portrait-primary",
    lang: "en-US",
    scope: "/",

    // ! Feel free to remove the icon sizes you don't need.
    icons: [
      {
        src: "/images/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/images/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/images/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/images/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/images/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "/images/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/images/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
