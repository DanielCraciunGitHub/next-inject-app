import Link from "next/link"
import { BsLightningChargeFill } from "react-icons/bs"

import { buttonVariants } from "./ui/button"

interface StartInjectingCTAProps {
  size: "lg" | "xl" | "default"
}

export const StartInjectingCTA = ({
  size = "default",
}: StartInjectingCTAProps) => {
  return (
    <div className="flex justify-center pt-2">
      <Link
        href="/plugins"
        rel="noopener noreferrer"
        className={buttonVariants({
          size,
          className: "bg-primary text-white",
        })}
      >
        Start Injecting <BsLightningChargeFill fill="white" />
      </Link>
    </div>
  )
}
