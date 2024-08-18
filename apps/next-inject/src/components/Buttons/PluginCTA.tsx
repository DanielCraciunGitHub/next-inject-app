import { BsLightningChargeFill } from "react-icons/bs"

import StripeButton from "./StripeButton"

interface PluginCTAProps {
  priceIds: string[]
}

export const PluginCTA = ({ priceIds }: PluginCTAProps) => {
  return (
    <StripeButton
      priceIds={priceIds}
      className="space-x-1 bg-yellow-500 text-white"
    >
      <BsLightningChargeFill size={16} />
      <div className="text-lg">Unlock Plugin</div>
    </StripeButton>
  )
}
export const BundleCTA = ({ priceIds }: PluginCTAProps) => {
  return (
    <StripeButton
      priceIds={priceIds}
      className="space-x-1 bg-yellow-500 text-white"
      size={"lg"}
    >
      <BsLightningChargeFill size={16} />
      <div className="text-lg">Get Bundle</div>
    </StripeButton>
  )
}
