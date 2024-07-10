import { ReactNode } from "react"

import {
  Tooltip as TooltipComponent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button, ButtonProps } from "./ui/button"

interface TooltipProps extends ButtonProps {
  hoverText: string
  children: ReactNode
  className?: string
}

export const Tooltip = ({
  hoverText,
  children,
  ...restProps
}: TooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipComponent>
        <TooltipTrigger asChild>
          <Button {...restProps}>{children}</Button>
        </TooltipTrigger>
        <TooltipContent>{hoverText}</TooltipContent>
      </TooltipComponent>
    </TooltipProvider>
  )
}
