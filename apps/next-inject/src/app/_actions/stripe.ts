"use server"

import { api } from "@/server/server"

export async function getStripeUrl(priceId: string) {
  const url = await api.paymentRouter.getStripeUrl({ priceId })
  return url
}
export async function getPluginPrice(priceId: string) {
  const price = await api.paymentRouter.getPluginPrice({ priceId })
  return price
}
