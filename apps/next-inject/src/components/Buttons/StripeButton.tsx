// Rendered inside page.tsx
"use client"

import { useRouter } from "next/navigation"

import { Button, ButtonProps } from "@/components/ui/button"
import { getStripeUrl } from "@/app/_actions/stripe"

interface StripeButtonProps extends ButtonProps {
  name: string
  priceId: string
}

const StripeButton = ({ className, name, priceId }: StripeButtonProps) => {
  const router = useRouter()

  const onSubmit = async () => {
    // calling our server action to retrieve the checkout session url
    const url = await getStripeUrl(priceId)

    if (url) {
      router.push(url)
    } else {
      router.refresh()
    }
  }
  return (
    <Button type="submit" onClick={onSubmit} className={className}>
      {name}
    </Button>
  )
}

export default StripeButton
