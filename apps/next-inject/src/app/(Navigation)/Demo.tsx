import { YouTubeEmbed } from "@next/third-parties/google"

interface DemoProps {}

export const Demo = ({}: DemoProps) => {
  return (
    <div>
      <div className="space-y-3 text-5xl font-bold tracking-tight md:text-6xl">
        Demo
      </div>
      <YouTubeEmbed videoid="bF0WCDBd5x0" />
    </div>
  )
}
