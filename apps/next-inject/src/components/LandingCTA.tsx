import { StartInjectingCTA } from "./StartInjectingCTA"

interface LandingCTAProps {}

export const LandingCTA = ({}: LandingCTAProps) => {
  return (
    <div className="bg-gray-300 dark:bg-gray-900">
      <div className="my-12 mt-24">
        <div className="text-center text-4xl font-bold tracking-tight text-white md:text-6xl">
          Save Hours. Become a{" "}
          <span className="text-green-600 dark:text-green-500">Hacker</span>
        </div>
        <StartInjectingCTA size="xl" className="my-12" />
      </div>
    </div>
  )
}
