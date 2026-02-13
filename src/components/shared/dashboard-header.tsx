"use client"

import { FaBell } from "react-icons/fa"
import { IoSearch } from "react-icons/io5"
import { Input } from "../ui/input"
import { SidebarTrigger } from "../ui/sidebar"
import OrganizationOptions from "./organization-options"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { PlusIcon } from "lucide-react"
import OrganizationCreateForm from "./organization-create-form"
import { useState } from "react"

function DashboardHeader() {
  const [isOpenNewOrganization, setIsOpenNewOrganization] = useState(false)

  return (
    <header className="flex h-14 items-center justify-between border-b px-6">
      <SidebarTrigger className="block md:hidden" />

      <div className="flex w-full flex-row-reverse items-center gap-3 md:flex-row md:gap-5">
        <OrganizationOptions />
        <div className="h-6 border-r-2" />
        <Dialog open={isOpenNewOrganization} onOpenChange={setIsOpenNewOrganization}>
          <DialogTrigger asChild>
            <Button variant="secondary" size="icon">
              <PlusIcon />
            </Button>
          </DialogTrigger>

          <OrganizationCreateForm onClose={() => setIsOpenNewOrganization(false)} />
        </Dialog>
      </div>

      <div className="hidden items-center gap-4 md:flex md:gap-8">
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
