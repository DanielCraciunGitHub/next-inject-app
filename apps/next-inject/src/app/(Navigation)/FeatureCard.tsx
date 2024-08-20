"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tick } from "@/components/SVG/Tick"

interface FeaturesProps {
  title: string
  features: React.ReactNode[]
  icon: React.ReactNode
  className?: string
}

const FeatureCard = ({ title, features, icon, className }: FeaturesProps) => {
  return (
    <Card
      className={cn(
        "relative flex w-full flex-col self-stretch rounded-lg border-muted-foreground bg-muted ring-1 ring-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-muted dark:ring-muted",
        className
      )}
    >
      <CardHeader className="flex flex-col space-y-4">
        <div className="flex flex-row items-center justify-between">
          <div className="text-2xl font-bold">{title}</div>
          <div>{icon}</div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {features.map((feature, i) => (
          <div key={i} className="flex space-x-4">
            <Tick />
            <div>{feature}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
export default FeatureCard
