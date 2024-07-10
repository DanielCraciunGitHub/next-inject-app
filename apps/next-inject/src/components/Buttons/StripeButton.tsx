// Rendered inside page.tsx
"use client"

import { ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { api } from "@/server/client"

import { Button, ButtonProps } from "@/components/ui/button"

interface StripeButtonProps extends ButtonProps {
  children: ReactNode
  priceId: string
}

const StripeButton = ({
  className,
  children,
  priceId,
  ...restProps
}: StripeButtonProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const { data: url } = api.paymentRouter.getStripeUrl.useQuery(
    { priceId, pathname },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  const onSubmit = async () => {
    if (url) {
      router.push(url)
    } else {
      router.refresh()
    }
  }
  return (
    <Button
      type="submit"
      onClick={onSubmit}
      className={className}
      {...restProps}
    >
      {children}
    </Button>
  )
}

export default StripeButton
