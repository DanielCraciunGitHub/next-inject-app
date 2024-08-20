import Link from "next/link"
import { BsLightningChargeFill } from "react-icons/bs"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/button"

interface StartInjectingCTAProps {
  size?: "lg" | "xl" | "default"
  className?: string
}

export const StartInjectingCTA = ({
  size = "default",
  className,
}: StartInjectingCTAProps) => {
  return (
    <div className="flex justify-center">
      <Link
        href="/plugins/bundles/pro"
        rel="noopener noreferrer"
        className={buttonVariants({
          size,
          className: cn("space-x-1 bg-primary text-white", className),
        })}
      >
        <BsLightningChargeFill size={16} fill="white" />
        <div className="text-lg">Start Injecting</div>{" "}
      </Link>
    </div>
  )
}
