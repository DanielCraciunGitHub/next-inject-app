import type { ReactNode } from "react"
import Link from "next/link"
import { siteConfig } from "@/config"
import { DocsLayout } from "fumadocs-ui/layout"
import { BsLightningChargeFill } from "react-icons/bs"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { plugins } from "@/app/source"

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={plugins.pageTree}
      nav={{ title: <BsLightningChargeFill fill={"green"} size={16} /> }}
      links={siteConfig.socialLinks.map((link) => ({
        url: link.href,
        text: link.name,
        icon: link.icon,
      }))}
      sidebar={{
        banner: (
          <Link
            href={"/dashboard"}
            className={cn(
              "font-bold",
              buttonVariants({
                className: "text-white",
              })
            )}
          >
            Dashboard
          </Link>
        ),
      }}
    >
      {children}
    </DocsLayout>
  )
}
