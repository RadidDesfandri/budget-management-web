"use client"

import Logo from "@/src/components/shared/logo"
import { useRoutes } from "@/src/hooks/use-routes"
import { cn } from "@/src/lib/utils"
import Link from "next/link"
import { useState } from "react"
import { IoClose } from "react-icons/io5"
import { RiSideBarFill } from "react-icons/ri"
import { Button } from "../ui/button"

function NavigationBar() {
  const { landingRoutes } = useRoutes()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 flex w-full flex-row-reverse items-center justify-between border-b bg-white p-3 px-5 md:flex-row md:px-10">
      <Link href="/">
        <Logo />
      </Link>

      <div className="hidden space-x-7 md:flex">
        {landingRoutes.map((route) => (
          <Link key={route.name} href={route.path} className="text-sm font-medium">
            {route.name}
          </Link>
        ))}
      </div>

      <div className="hidden space-x-2 md:flex">
        <Link href="/login">
          <Button variant="ghost">Login</Button>
        </Link>
        <Link href="/register">
          <Button>Start Free</Button>
        </Link>
      </div>

      <Button variant="secondary" className="block md:hidden" onClick={() => setIsOpen(true)}>
        <RiSideBarFill />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-70 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Link href="/" className="flex items-center justify-between border-b p-5">
          <Logo />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
            <IoClose />
          </Button>
        </Link>

        <div className="flex flex-col space-y-3 px-1 py-5">
          {landingRoutes.map((route) => (
            <Link
              key={route.name}
              href={route.path}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-100"
            >
              {route.name}
            </Link>
          ))}
        </div>

        <div className="mx-5 border-t" />

        <div className="absolute right-0 bottom-0 left-0">
          <div className="flex flex-col gap-2 p-5">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)}>
              <Button className="w-full">Start Free</Button>
            </Link>
          </div>

          <p className="border-t bg-gray-50 p-5 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} BudgetFlow
          </p>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
