import { useParams, usePathname } from "next/navigation"
import { useMemo } from "react"
import { FaUsers, FaWallet } from "react-icons/fa"
import { IoIosPaper, IoMdMail, IoMdSettings } from "react-icons/io"
import { MdCategory, MdDashboard, MdHistory } from "react-icons/md"
import { RiUserSettingsFill } from "react-icons/ri"

const useRoutes = () => {
  const pathname = usePathname()
  const params = useParams()
  const organizationId = params.organizationId as string

  const dashboardRoutes = useMemo(
    () => [
      {
        path: `/${organizationId}/dashboard`,
        name: "Dashboard",
        icon: MdDashboard,
        isActive: pathname.startsWith(`/${organizationId}/dashboard`)
      },
      {
        path: `/${organizationId}/expenses`,
        name: "Expenses",
        icon: IoIosPaper,
        isActive: pathname.startsWith(`/${organizationId}/expenses`)
      },
      {
        path: `/${organizationId}/budgets`,
        name: "Budgets",
        icon: FaWallet,
        isActive: pathname.startsWith(`/${organizationId}/budgets`)
      },
      {
        path: `/${organizationId}/categories`,
        name: "Categories",
        icon: MdCategory,
        isActive: pathname.startsWith(`/${organizationId}/categories`)
      },
      {
        path: `/${organizationId}/members`,
        name: "Members",
        icon: FaUsers,
        isActive: pathname.startsWith(`/${organizationId}/members`)
      },
      {
        path: `/${organizationId}/invitations`,
        name: "Invitations",
        icon: IoMdMail,
        isActive: pathname.startsWith(`/${organizationId}/invitations`)
      },
      {
        path: `/${organizationId}/activity-logs`,
        name: "Activity Logs",
        icon: MdHistory,
        isActive: pathname.startsWith(`/${organizationId}/activity-logs`)
      },
      {
        path: `/${organizationId}/organization-settings`,
        name: "Organization Settings",
        icon: IoMdSettings,
        isActive: pathname.startsWith(`/${organizationId}/organization-settings`)
      },
      {
        path: `/${organizationId}/user-settings`,
        name: "User Settings",
        icon: RiUserSettingsFill,
        isActive: pathname.startsWith(`/${organizationId}/user-settings`)
      }
    ],
    [pathname, organizationId]
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
