"use client"

import { FC } from "react"
import Link from "next/link"
import { plugins } from "@/config"
import { PageTree } from "fumadocs-core/server"

import { Badge } from "@/components/ui/badge"

export const Item: FC<{ item: PageTree.Item }> = ({ item }) => {
  const isFree = plugins.some(
    (plugin) => item.name === plugin.name && !plugin.paid
  )

  return (
    <>
      <Link
        href={`${item.url}`}
        className={
          "relative flex rounded-lg p-1 px-2 text-muted-foreground hover:bg-muted"
        }
      >
        {item.name}
        {isFree ? (
          <Badge className="absolute right-0 text-white">Free</Badge>
        ) : null}
      </Link>
    </>
  )
}
