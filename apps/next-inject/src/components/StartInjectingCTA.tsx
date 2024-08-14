import Link from "next/link"
import { BsLightningChargeFill } from "react-icons/bs"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/button"

interface StartInjectingCTAProps {
  size: "lg" | "xl" | "default"
  className?: string
}

export const StartInjectingCTA = ({
  size = "default",
  className,
}: StartInjectingCTAProps) => {
  return (
    <div className="flex justify-center pt-2">
      <Link
        href="/plugins"
        rel="noopener noreferrer"
        className={buttonVariants({
          size,
          className: cn("bg-primary text-white", className),
        })}
      >
        Start Injecting <BsLightningChargeFill fill="white" />
      </Link>
    </div>
  )
}
