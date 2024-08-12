"use client"

import YouTube from "react-youtube"

import { CurlyArrow } from "@/components/SVG/Arrows"

interface DemoProps {}

export const Demo = ({}: DemoProps) => {
  return (
    <div id="demo" className="w-full bg-gray-500 dark:bg-gray-800/30">
      <div className="relative mx-auto my-44 flex max-w-5xl flex-col items-center space-y-6">
        <div className="absolute -left-4 top-1/4 flex -translate-x-full flex-col items-center gap-1 text-sm text-white/70 max-lg:hidden">
          <p>Next Inject in 1 minute</p>
          <CurlyArrow />
        </div>

        <YoutubeDemo />
      </div>
    </div>
  )
}
const YoutubeDemo = () => {
  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }
  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <YouTube
        iframeClassName="absolute h-full w-full"
        videoId="bF0WCDBd5x0"
        opts={opts}
      />
    </div>
  )
}
