"use client"

import { Input } from "@/src/components/ui/input"
import { Skeleton } from "@/src/components/ui/skeleton"
import { useDebounceValue } from "@/src/hooks/use-debounce"
import { AnimatePresence, motion } from "framer-motion"
import { ClipboardList, Search } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { ActivityLogsFilters } from "../activity-log.type"
import { ActivityLogItem } from "./activity-log-item"
import { ActivityLogsFilter } from "./activity-logs-filter"
import { useGetAuditTrails } from "../activity-log.api"

export function ActivityLogsFeed() {
  const [filters, setFilters] = useState<ActivityLogsFilters>({})
  const [search, setSearch] = useState("")

  const debouncedSearch = useDebounceValue(search, 400)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const params = useParams()
  const organizationId = params.organizationId as string

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetAuditTrails({
    organizationId,
    ...filters,
    search: debouncedSearch
  })

  const visibleLogs = data?.pages.flatMap((page) => page?.data || []) || []
  const totalLogs = data?.pages[0]?.total || 0

  const loadMore = useCallback(() => {
    if (isFetchingNextPage || !hasNextPage) return
    fetchNextPage()
  }, [isFetchingNextPage, hasNextPage, fetchNextPage])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  function handleFiltersChange(newFilters: ActivityLogsFilters) {
    setFilters(newFilters)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            id="activity-log-search"
            placeholder="Search by description..."
            className="bg-white pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ActivityLogsFilter filters={filters} onFiltersChange={handleFiltersChange} />
      </div>

      <div className="text-muted-foreground text-sm">
        Showing <span className="font-medium text-gray-700">{visibleLogs.length}</span> of{" "}
        <span className="font-medium text-gray-700">{totalLogs}</span> activity logs
      </div>

      {/* Log List */}
      <AnimatePresence mode="wait">
        {isLoading ? null : visibleLogs.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
              <ClipboardList className="h-7 w-7 text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-gray-700">No activity logs found</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Try adjusting your filters or search term.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="list" className="flex flex-col gap-3">
            {visibleLogs.map((log, index) => (
              <ActivityLogItem key={log.id} log={log} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={sentinelRef} className="h-4" />

      {(isLoading || isFetchingNextPage) && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!hasNextPage && visibleLogs.length > 0 && (
        <p className="text-muted-foreground py-4 text-center text-sm">
          You&apos;ve reached the end of the activity logs.
        </p>
      )}
    </div>
  )
}
