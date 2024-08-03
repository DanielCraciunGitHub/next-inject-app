import { YouTubeEmbed } from "@next/third-parties/google"

interface DemoProps {}

export const Demo = ({}: DemoProps) => {
  return (
    <div id="demo" className="w-full bg-gray-400 dark:bg-gray-700">
      <div className="mx-auto my-44 max-w-2xl space-y-6">
        <div className="space-y-3 text-center text-4xl tracking-tight text-white md:text-6xl">
          Plugin Demo
        </div>

        <YoutubeDemo />
      </div>
    </div>
  )
}
const YoutubeDemo = () => {
  return <YouTubeEmbed videoid="bF0WCDBd5x0" />
}
