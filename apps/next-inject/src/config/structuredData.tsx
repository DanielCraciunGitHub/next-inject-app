import type { WebPage, WithContext } from "schema-dts"

import { siteConfig } from "."

export const baseStructuredData: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@id": `${siteConfig.url}/#root`,
  "@type": "WebPage",
  name: "Next Inject",
  url: siteConfig.url,
  thumbnailUrl: `${siteConfig.url}/favicon.ico`,
  inLanguage: "en-GB",
  author: {
    "@type": "Person",
  },
  creator: {
    "@type": "Person",
  },
  maintainer: {
    "@type": "Person",
  },
  mainEntity: {
    "@type": "Person",
    "@id": `${siteConfig.url}/#entity`,
  },

  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.url}/#breadcrumb`,
    itemListElement: siteConfig.navLinks.map(({ name, href }, position) => ({
      "@type": "ListItem",
      position: position + 1,
      name,
      item: `${siteConfig.url}${href}`,
    })),
  },
  isPartOf: {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
  },
}

export const staticStructuredData = {} satisfies {
  [key: string]: WithContext<WebPage>
}
