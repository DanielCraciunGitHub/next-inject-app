import { MainNavbar } from "./MainNavbar"
import { MobileNavbar } from "./MobileNavbar"

export default function NavBar() {
  return (
    <nav className="top-0 z-50 bg-gray-300 dark:bg-gray-900">
      <MainNavbar />
      <MobileNavbar />
    </nav>
  )
}
