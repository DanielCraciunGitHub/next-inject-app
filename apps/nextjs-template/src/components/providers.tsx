"use client"

import { useState } from "react"
import { siteConfig } from "@/config"
import { env } from "@/env.mjs"
import { AppRouter } from "@/server"
import { api } from "@/server/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  unstable_httpBatchStreamLink as httpBatchStreamLink,
  loggerLink,
} from "@trpc/client"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import SuperJSON from "superjson"

const createQueryClient = () => new QueryClient()

let clientQueryClientSingleton: QueryClient | undefined = undefined

const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient()
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient())
}

export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>

export function Provider({ children, ...props }: ThemeProviderProps) {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: siteConfig.url + "/api/trpc",
          headers(opts) {
            const headers = new Headers()
            headers.set("x-trpc-source", "nextjs-react")
            return headers
          },
        }),
      ],
    })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <SessionProvider refetchOnWindowFocus={false}>
          <NextThemesProvider {...props}>
            <GoogleReCaptchaProvider
              reCaptchaKey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            >
              {children}
            </GoogleReCaptchaProvider>
          </NextThemesProvider>
        </SessionProvider>
      </api.Provider>
    </QueryClientProvider>
  )
}
