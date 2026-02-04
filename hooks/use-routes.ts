import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { FaUsers, FaWallet } from "react-icons/fa"
import { IoIosPaper, IoMdSettings } from "react-icons/io"
import { MdCategory, MdDashboard, MdHistory } from "react-icons/md"

const useRoutes = () => {
  const pathname = usePathname()

  const dashboardRoutes = useMemo(
    () => [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: MdDashboard,
        isActive: pathname === "/dashboard"
      },
      {
        path: "/expenses",
        name: "Expenses",
        icon: IoIosPaper,
        isActive: pathname === "/expenses"
      },
      {
        path: "/budgets",
        name: "Budgets",
        icon: FaWallet,
        isActive: pathname === "/budgets"
      },
      {
        path: "/categories",
        name: "Categories",
        icon: MdCategory,
        isActive: pathname === "/categories"
      },
      {
        path: "/members",
        name: "Members",
        icon: FaUsers,
        isActive: pathname === "/members"
      },
      {
        path: "/activity-logs",
        name: "Activity Logs",
        icon: MdHistory,
        isActive: pathname === "/activity-logs"
      },
      {
        path: "/organization-settings",
        name: "Organization Settings",
        icon: IoMdSettings,
        isActive: pathname === "/organization-settings"
      }
    ],
    [pathname]
  )

  const landingRoutes = useMemo(
    () => [
      { path: "/features", name: "Features", isActive: pathname === "/features" },
      { path: "/how-it-works", name: "How It Works", isActive: pathname === "/how-it-works" },
      { path: "/pricing", name: "Pricing", isActive: pathname === "/pricing" },
      { path: "/contact", name: "Contact", isActive: pathname === "/contact" }
    ],
    [pathname]
  )

  return {
    dashboardRoutes,
    landingRoutes
  }
}

export { useRoutes }
