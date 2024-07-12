import { siteConfig } from "@/config"

import { NavItem } from "./NavItem"

export const MainNavbar = () => {
  const [firstLink, ...restLinks] = siteConfig.navLinks

  return (
    <div className="hidden md:flex md:justify-center md:p-6">
      <div className="md:flex md:w-2/3 md:justify-between">
        <div>
          <NavItem
            key={firstLink.name}
            page={firstLink.href}
            text={firstLink.name}
            className="text-4xl"
            tabIndex={0}
          />
        </div>
        <div className="flex divide-x-2 divide-primary">
          {restLinks.map((item) => (
            <span key={item.name}>
              <NavItem
                page={item.href}
                text={item.name}
                className="ml-2 mr-2"
                tabIndex={0}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
