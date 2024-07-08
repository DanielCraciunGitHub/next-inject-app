import { siteConfig } from "@/config"

import { DarkModeButton } from "@/components/Buttons/DarkModeButton"

export const Footer = () => (
  <footer className="z-20 p-4">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="flex w-full flex-col space-y-3">
        <div className="flex justify-end">
          <DarkModeButton />
        </div>

        <span className="text-end text-sm text-foreground/50">
          {siteConfig.footerText}
        </span>
      </div>
    </div>
  </footer>
)
