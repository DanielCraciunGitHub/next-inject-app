import Link from "next/link"
import { siteConfig } from "@/config"
import { BsLightningChargeFill } from "react-icons/bs"

import { NavItem } from "./Navbar/NavItem"
import { StartInjectingCTA } from "./StartInjectingCTA"

export const Footer = () => {
  const [mainItem, ...navItems] = siteConfig.navLinks

  return (
    <footer className="z-20 border-t bg-gray-300 p-4 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-8 py-24 ">
        <div className="flex flex-col flex-wrap md:flex-row md:flex-nowrap lg:items-start">
          <div className="mx-auto w-80 max-w-full flex-shrink-0 space-y-1 text-center md:mx-0 md:text-left">
            <NavItem
              key={"Next Inject"}
              page={"/"}
              text={"Next Inject"}
              className="text-xl font-bold"
              tabIndex={0}
              icon={<BsLightningChargeFill fill={"green"} size={20} />}
            />
            <div className="ml-3 text-sm text-foreground/50">
              {siteConfig.footerText}
            </div>
          </div>
          <div className="-mb-10 mt-10 flex flex-grow flex-wrap text-center md:mt-0 md:pl-24 md:text-left lg:pl-48">
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="text-bold text-xl text-muted-foreground">
                Links
              </div>
              <div className="flex flex-col items-center space-y-1 text-center md:items-start">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href} className="flex">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-full px-4 pt-4 md:w-1/2 md:pt-0 lg:w-1/3">
              <div className="text-bold text-xl text-muted-foreground">
                Legal
              </div>
              <div className="flex flex-col items-center space-y-1 text-center md:items-start">
                <Link href="/privacy">Privacy</Link>
                <Link href="/tos">TOS</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
