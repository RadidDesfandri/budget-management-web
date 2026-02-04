import { IoSearch } from "react-icons/io5"
import { SidebarTrigger } from "../ui/sidebar"
import { Input } from "../ui/input"
import { FaBell } from "react-icons/fa"

function DashboardHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b px-6 md:justify-end">
      <SidebarTrigger className="block md:hidden" />
      <div className="flex items-center gap-4 md:gap-8">
        <div className="relative md:w-80">
          <IoSearch className="absolute top-1/2 left-3 -translate-y-1/2" />
          <Input placeholder="Search..." className="border-0 bg-blue-50 pl-9" />
        </div>
        <FaBell />
      </div>
    </header>
  )
}

export default DashboardHeader
