import DashboardLayout from "@/src/components/shared/layouts/dashboard-layout"
import { SidebarProvider } from "@/src/components/ui/sidebar"

function DashboardRoot({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SidebarProvider>
  )
}

export default DashboardRoot
