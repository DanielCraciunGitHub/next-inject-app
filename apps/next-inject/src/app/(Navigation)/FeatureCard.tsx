"use client"

import { CheckCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FeaturesProps {
  title: string
  features: React.ReactNode[]
  icon: React.ReactNode
}

const FeatureCard = ({ title, features, icon }: FeaturesProps) => {
  return (
    <Card className="flex w-[22rem] flex-col font-mono">
      <CardHeader className="space-y-4">
        <div className="flex flex-row items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div>{icon}</div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {features.map((feature, i) => (
          <div key={i} className="flex space-x-4">
            <CheckCircle className="flex-none text-lime-400" />
            <div>{feature}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
export default FeatureCard
