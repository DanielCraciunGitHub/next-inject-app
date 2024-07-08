import type { ReactNode } from "react"
import { siteConfig } from "@/config"
import { DocsLayout } from "fumadocs-ui/layout"

import { pageTree } from "@/app/source"

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={pageTree}
      nav={{ title: "Home" }}
      links={siteConfig.socialLinks.map((link) => ({
        url: link.href,
        text: link.name,
        icon: link.icon,
      }))}
    >
      {children}
    </DocsLayout>
  )
}
