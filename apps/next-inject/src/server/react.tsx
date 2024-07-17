"use client"

import { useState } from "react"
import { siteConfig } from "@/config"
import { type AppRouter } from "@/server"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  unstable_httpBatchStreamLink as httpBatchStreamLink,
  loggerLink,
} from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { ThemeProviderProps } from "next-themes/dist/types"
import SuperJSON from "superjson"

export const api = createTRPCReact<AppRouter>()

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

export function TrpcProvider({ children }: ThemeProviderProps) {
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
        {children}
      </api.Provider>
    </QueryClientProvider>
  )
}