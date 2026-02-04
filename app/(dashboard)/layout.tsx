import DashboardLayout from "@/components/shared/layouts/dashboard-layout"
import { SidebarProvider } from "@/components/ui/sidebar"

function DashboardRoot({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SidebarProvider>
  )
}

export default DashboardRoot
