"use client"

import { CheckCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

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
        "mt-8 flex w-[22rem] flex-col font-mono text-sm",
        className
      )}
    >
      <CardHeader className="space-y-4">
        <div className="flex flex-row items-center justify-between">
          <div className="text-2xl font-bold">{title}</div>
          <div>{icon}</div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {features.map((feature, i) => (
          <div key={i} className="flex space-x-4">
            <CheckCircle className="flex-none text-lime-600 dark:text-lime-400" />
            <div>{feature}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
export default FeatureCard
