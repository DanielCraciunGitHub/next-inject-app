// Rendered inside page.tsx
"use client"

import { ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { api } from "@/server/react"

import { Button, ButtonProps } from "@/components/ui/button"

interface StripeButtonProps extends ButtonProps {
  children: ReactNode
  priceIds: string[]
}

const StripeButton = ({
  className,
  children,
  priceIds,
  ...restProps
}: StripeButtonProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const { data: url } = api.paymentRouter.getStripeUrl.useQuery(
    { priceIds, pathname },
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
