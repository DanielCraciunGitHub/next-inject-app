import { siteConfig } from "@/config"
import { Menu } from "lucide-react"
import { BsLightningChargeFill } from "react-icons/bs"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { NavItem } from "./NavItem"

export function MobileNavbar() {
  const [mainItem, ...navItems] = siteConfig.navLinks

  return (
    <div className="flex items-center bg-background p-4 md:hidden">
      <NavItem
        key={mainItem.name}
        page={mainItem.href}
        text={mainItem.name}
        className="text-2xl font-bold"
        tabIndex={0}
        icon={<BsLightningChargeFill fill={"green"} size={20} />}
      />
      <Sheet>
        <div className="flex w-full justify-end">
          <SheetTrigger className="p-2">
            <Menu />
            <span className="sr-only">Open Mobile Menu</span>
          </SheetTrigger>
        </div>
        <SheetContent className="flex flex-col items-center" side="right">
          <div className="flex w-full flex-col items-center divide-y-2 divide-primary">
            {navItems.map((item) => (
              <div key={item.name} className="w-full">
                <SheetClose asChild>
                  <NavItem
                    page={item.href}
                    text={item.name}
                    className="mb-2 mt-2 flex self-center"
                  />
                </SheetClose>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
