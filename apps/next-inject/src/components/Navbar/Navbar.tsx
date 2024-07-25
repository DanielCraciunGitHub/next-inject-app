import { MainNavbar } from "./MainNavbar"
import { MobileNavbar } from "./MobileNavbar"

export default function NavBar() {
  return (
    <nav className="top-0 z-50">
      <MainNavbar />
      <MobileNavbar />
    </nav>
  )
}
