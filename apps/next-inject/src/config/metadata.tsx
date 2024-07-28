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

import { plugins } from "@/app/source"

export const baseMetadata: Metadata = {
  title: {
    default: "Next Inject",
    template: `%s | Next Inject`,
  },
  description:
    "Discover Next Inject, the ultimate solution for seamless plugin integration in your Next.js applications. Simplify the setup of essential features with our user-friendly CLI, enabling automatic configuration of metadata, SEO, analytics, and more. Enhance your development workflow and elevate your projects with Next Inject's robust and easy-to-use plugins.",
  keywords: [
    "Next.js",
    "Next Inject",
    "Next.js plugins",
    "Next.js integration",
    "Next.js CLI tools",
    "Next.js automatic setup",
    "Next.js metadata",
    "Next.js SEO",
    "Next.js analytics",
    "Next.js Stripe integration",
    "Next.js e-commerce",
    "Next.js plugin marketplace",
    "Next.js development tools",
    "Next.js feature setup",
    "Next.js project enhancement",
    "Next.js productivity tools",
    "Easy Next.js plugins",
    "Next.js plugin installation",
    "Next.js authentication",
    "Next.js CMS integration",
    "Next.js image optimization",
    "Next.js performance tools",
    "Next.js security plugins",
    "Next.js database integration",
    "Next.js payment gateways",
    "Next.js deployment tools",
    "Next.js API integration",
    "Next.js serverless functions",
    "Next.js headless CMS",
    "Next.js real-time updates",
    "Next.js static site generation",
    "Next.js dynamic routing",
  ],
  applicationName: "Next Inject",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: {
      default: "Next Inject",
      template: `%s | Next Inject`,
    },
    description:
      "Discover Next Inject, the ultimate solution for seamless plugin integration in your Next.js applications. Simplify the setup of essential features with our user-friendly CLI, enabling automatic configuration of metadata, SEO, analytics, and more. Enhance your development workflow and elevate your projects with Next Inject's robust and easy-to-use plugins.",
    url: "/",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/next-inject-og.webp`,
        type: "image/webp",
        width: 1200,
        height: 630,
        alt: "Next Inject",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Next Inject",
      template: `%s | Next Inject`,
    },
    description:
      "Discover Next Inject, the ultimate solution for seamless plugin integration in your Next.js applications. Simplify the setup of essential features with our user-friendly CLI, enabling automatic configuration of metadata, SEO, analytics, and more. Enhance your development workflow and elevate your projects with Next Inject's robust and easy-to-use plugins.",
    creator: "@craciun_07",
    images: [
      {
        url: `${siteConfig.url}/images/next-inject-og.webp`,
        type: "image/webp",
        width: 1200,
        height: 630,
        alt: "Next Inject",
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
    title: { absolute: "Next Inject" },
    openGraph: {
      ...baseMetadata.openGraph,
      title: { absolute: "Next Inject" },
    },
    twitter: {
      ...baseMetadata.twitter,
      title: { absolute: "Next Inject" },
    },
  } satisfies Metadata,
  dashboard: {
    title: "Dashboard",
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Dashboard",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Dashboard",
    },
  },
  // ! Write page-specific static metadata configurations here...
}

export async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries = [
    ...siteConfig.navLinks
      .filter((page) => !page.href.includes("#"))
      .map((page) => ({
        url: siteConfig.url + page.href,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      })),
    ...plugins.getPages().map((page) => ({
      url: siteConfig.url + "/plugins/" + page.slugs.join("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
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
      disallow: "/dashboard",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}

// ! These are the most important manifest properties, make sure to add additional properties as you see fit.
export function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next Inject",
    short_name: "Next Inject",
    description:
      "Discover Next Inject, the ultimate solution for seamless plugin integration in your Next.js applications. Simplify the setup of essential features with our user-friendly CLI, enabling automatic configuration of metadata, SEO, analytics, and more. Enhance your development workflow and elevate your projects with Next Inject's robust and easy-to-use plugins.",
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
        src: "/images/icon-72x72.webp",
        sizes: "72x72",
        type: "image/webp",
      },
      {
        src: "/images/icon-96x96.webp",
        sizes: "96x96",
        type: "image/webp",
      },
      {
        src: "/images/icon-192x192.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/images/icon-512x512.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  }
}
