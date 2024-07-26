import { YouTubeEmbed } from "@next/third-parties/google"

interface DemoProps {}

export const Demo = ({}: DemoProps) => {
  return (
    <div id="demo" className="mx-auto w-full max-w-2xl space-y-6">
      <div className="space-y-3 text-center text-4xl font-bold tracking-tight md:text-6xl">
        Plugin Demo
      </div>

      <YoutubeDemo />
    </div>
  )
}
const YoutubeDemo = () => {
  return <YouTubeEmbed videoid="bF0WCDBd5x0" />
}
