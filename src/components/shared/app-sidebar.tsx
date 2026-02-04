"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/src/components/ui/sidebar"
import { useRoutes } from "@/src/hooks/use-routes"
import { cn } from "@/src/lib/utils"
import Link from "next/link"
import { MdOutlineLogout } from "react-icons/md"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import Logo from "./logo"

export function AppSidebar() {
  const { dashboardRoutes } = useRoutes()

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MAIN</SidebarGroupLabel>
          <SidebarMenu>
            {dashboardRoutes.slice(0, 5).map((route) => (
              <Link key={route.name} href={route.path}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={cn(
                      "cursor-pointer",
                      route.isActive &&
                        "text-primary/70 hover:text-primary bg-blue-50/50 hover:bg-blue-50"
                    )}
                  >
                    {route.icon && <route.icon />}
                    <span className="font-medium">{route.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>SYSTEM</SidebarGroupLabel>
          <SidebarMenu>
            {dashboardRoutes.slice(5, 7).map((route) => (
              <Link key={route.name} href={route.path}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={cn(
                      "cursor-pointer",
                      route.isActive &&
                        "text-primary/70 hover:text-primary bg-blue-50 hover:bg-blue-100"
                    )}
                  >
                    {route.icon && <route.icon />}
                    <span className="font-medium">{route.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between rounded-xl border bg-gray-100 p-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="-space-y-1.5">
              <p className="text-lg font-bold">John Doe</p>
              <p className="text-xs">jhondoe@gmail.com</p>
            </div>
          </div>
          <Button size="icon" variant="ghost">
            <MdOutlineLogout size={50} />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
