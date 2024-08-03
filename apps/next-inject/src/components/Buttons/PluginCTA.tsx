import { BsLightningChargeFill } from "react-icons/bs"

import StripeButton from "./StripeButton"

interface PluginCTAProps {
  priceId: string
}

export const PluginCTA = ({ priceId }: PluginCTAProps) => {
  return (
    <StripeButton
      priceId={priceId}
      className="space-x-1 bg-yellow-500 text-white"
    >
      <BsLightningChargeFill size={16} />
      <div className="text-lg">Unlock Plugin</div>
    </StripeButton>
  )
}
