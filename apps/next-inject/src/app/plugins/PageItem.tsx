"use client"

import { FC } from "react"
import Link from "next/link"
import { PageTree } from "fumadocs-core/server"

import { priceIds } from "@/config/pricing"
import { Badge } from "@/components/ui/badge"

export const Item: FC<{ item: PageTree.Item }> = ({ item }) => {
  const isFree = Object.entries(priceIds).some(
    ([key, value]) =>
      key === item.url.split("/").pop() && value.priceId === "Free"
  )

  const isHot = Object.entries(priceIds).some(
    ([key, value]) => key === item.url.split("/").pop() && value.hot
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
        {isHot ? (
          <Badge className="absolute right-0 bg-orange-500 text-white">
            Hot
          </Badge>
        ) : null}
      </Link>
    </>
  )
}
