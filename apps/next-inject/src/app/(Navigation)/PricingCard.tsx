import { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tick } from "@/components/SVG/Tick"

interface PricingCardProps {
  title: string
  price: string
  ogPrice?: string
  features: React.ReactNode[]
  className?: string
  footnote?: string
  hot?: boolean
  cta?: ReactNode
}

export const PricingCard = ({
  features,
  price,
  title,
  className,
  ogPrice,
  footnote,
  cta,
  hot = false,
}: PricingCardProps) => {
  return (
    <Card
      className={cn(
        `relative flex w-full flex-col self-stretch rounded-lg bg-muted ring-1 ring-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:ring-muted ${hot ? " border-yellow-500" : "border-muted-foreground dark:border-muted"}`,
        className
      )}
    >
      {hot && (
        <Badge className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-yellow-500">
          HOT
        </Badge>
      )}
      <CardHeader className="flex space-y-4">
        <div className="flex flex-row items-center justify-between">
          <div className="text-xl">{title}</div>
        </div>
        <div className="space-x-1">
          <span className="text-lg text-muted-foreground line-through">
            {ogPrice}
          </span>
          <span className="text-5xl font-extrabold">{price}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Tick />
            <div>{feature}</div>
          </div>
        ))}
        {cta}
        <p className="text-center text-sm">{footnote}</p>
      </CardContent>
    </Card>
  )
}
