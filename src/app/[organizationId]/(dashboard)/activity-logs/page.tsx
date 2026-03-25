"use client"

import PageHeader from "@/src/components/shared/page-header"
import { ActivityLogsFeed } from "./components/activity-logs-feed"
import { usePermission } from "@/src/hooks/use-permission"
import { forbidden } from "next/navigation"

function ActivityLogsPage() {
  const { role } = usePermission()

  if (!["owner", "admin"].includes(role)) {
    forbidden()
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Activity Logs"
        description="Track and audit all financial and team actions within the platform."
      />

      <ActivityLogsFeed />
    </div>
  )
}

export default ActivityLogsPage
