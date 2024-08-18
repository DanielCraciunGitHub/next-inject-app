"use server"

import { api } from "@/server/server"

export async function getStripeUrl(priceIds: string[], pathname: string) {
  const url = await api.paymentRouter.getStripeUrl({ priceIds, pathname })
  return url
}
export async function getPluginPrice(priceId: string) {
  const price = await api.paymentRouter.getPluginPrice({ priceId })
  return price
}
