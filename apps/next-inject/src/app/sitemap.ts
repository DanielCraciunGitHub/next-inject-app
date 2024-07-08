import { MetadataRoute } from "next"
import { siteConfig } from "@/config"

export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries = [
    ...siteConfig.navLinks.map((page) => ({
      url: siteConfig.url + page.href,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    })),
  ] as MetadataRoute.Sitemap

  return sitemapEntries
}
