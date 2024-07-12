import "@/styles/globals.css"

import NextTopLoader from "nextjs-toploader"

import ScrollToTopButton from "@/components/Buttons/ScrollToTopButton"
import { Provider } from "@/components/providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <NextTopLoader showSpinner={false} color="green" />
        <Provider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </Provider>
        <ScrollToTopButton />
      </body>
    </html>
  )
}
