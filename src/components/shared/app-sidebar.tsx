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
import { cn, getInitialUsername } from "@/src/lib/utils"
import Link from "next/link"
import { MdOutlineLogout } from "react-icons/md"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import Logo from "./logo"
import { useLogout } from "@/src/hooks/use-logout"
import { useMe } from "@/src/hooks/use-me"

export function AppSidebar() {
  const { dashboardRoutes } = useRoutes()
  const { mutate: logout, isPending: isLogoutPending } = useLogout()
  const { data: me, isLoading: isMeLoading } = useMe()

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
              <AvatarImage src={me?.data?.avatar_url ?? ""} />
              <AvatarFallback>{getInitialUsername(me?.data?.name ?? "B F")}</AvatarFallback>
            </Avatar>
            <div className="-space-y-1.5">
              <p className="text-lg font-bold">{isMeLoading ? "..." : me?.data?.name}</p>
              <p className="text-xs">{isMeLoading ? "..." : me?.data?.email}</p>
            </div>
          </div>
          <Button disabled={isLogoutPending} onClick={() => logout()} size="icon" variant="ghost">
            <MdOutlineLogout size={50} />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
