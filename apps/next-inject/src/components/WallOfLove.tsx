import Script from "next/script"

interface WallOfLoveProps {}

export const WallOfLove = ({}: WallOfLoveProps) => {
  return (
    <div id="wol" className="bg-gray-300 dark:bg-gray-900">
      <div className="mt-12 text-center text-4xl font-bold tracking-tight text-white md:text-6xl">
        Real Feedback. Real{" "}
        <span className="text-green-600 dark:text-green-500">Results</span>
      </div>
      <div className="mx-10 mb-12 text-center text-lg text-muted-foreground">
        See how{" "}
        <span className="text-green-600 dark:text-green-500">Next Inject</span>{" "}
        is making life easier for coders just like you.
      </div>
      <div
        className="senja-embed mx-auto max-w-6xl"
        data-id="1515a1c1-9fac-4ec4-92bd-9939a5e2fd07"
        data-mode="shadow"
        data-lazyload="false"
        style={{ display: "block" }}
      ></div>
      <Script
        src="https://widget.senja.io/widget/1515a1c1-9fac-4ec4-92bd-9939a5e2fd07/platform.js"
        type="text/javascript"
        async
      />
    </div>
  )
}
