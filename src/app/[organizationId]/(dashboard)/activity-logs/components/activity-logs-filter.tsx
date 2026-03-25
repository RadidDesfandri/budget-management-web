"use client"

import * as React from "react"
import { CalendarIcon, XIcon } from "lucide-react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/src/components/ui/button"
import { Calendar } from "@/src/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/src/components/ui/select"
import { Badge } from "@/src/components/ui/badge"
import { Separator } from "@/src/components/ui/separator"
import { cn } from "@/src/lib/utils"
import { ActivityLogActionType, ActivityLogsFilters } from "../activity-log.type"
import { useParams } from "next/navigation"
import { useGetMemberInOrganization } from "../../members/member.api"

const filterChipVariants = {
  initial: { opacity: 0, scale: 0.85, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    filter: "blur(4px)",
    transition: { duration: 0.15, ease: "easeIn" }
  }
} as const

const clearButtonVariants = {
  initial: { opacity: 0, x: 8, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 400, damping: 28, delay: 0.05 }
  },
  exit: {
    opacity: 0,
    x: 8,
    filter: "blur(4px)",
    transition: { duration: 0.12, ease: "easeIn" }
  }
} as const

const ACTION_TYPE_OPTIONS: { label: string; value: ActivityLogActionType }[] = [
  { label: "Expense Created", value: "expense_created" },
  { label: "Expense Updated", value: "expense_updated" },
  { label: "Expense Deleted", value: "expense_deleted" },
  { label: "Expense Approved", value: "expense_approved" },
  { label: "Expense Rejected", value: "expense_rejected" },
  { label: "Budget Created", value: "budget_created" },
  { label: "Budget Updated", value: "budget_updated" },
  { label: "Budget Deleted", value: "budget_deleted" },
  { label: "Member Invited", value: "member_invited" },
  { label: "Member Removed", value: "member_removed" },
  { label: "Member Role Updated", value: "member_role_updated" },
  { label: "Invitation Accepted", value: "invitation_accepted" },
  { label: "Invitation Rejected", value: "invitation_rejected" },
  { label: "Category Created", value: "category_created" },
  { label: "Category Updated", value: "category_updated" },
  { label: "Category Deleted", value: "category_deleted" },
  { label: "Organization Updated", value: "organization_updated" },
  { label: "User Login", value: "user_login" },
  { label: "User Logout", value: "user_logout" }
]

interface ActivityLogsFilterProps {
  filters: ActivityLogsFilters
  onFiltersChange: (filters: ActivityLogsFilters) => void
}

export function ActivityLogsFilter({ filters, onFiltersChange }: ActivityLogsFilterProps) {
  const params = useParams()
  const organizationId = params.organizationId as string

  const { data: membersData } = useGetMemberInOrganization({
    organizationId: Number(organizationId),
    page_size: 100
  })

  const dateRange: DateRange | undefined =
    filters.date_from || filters.date_to
      ? {
          from: filters.date_from ? new Date(filters.date_from) : undefined,
          to: filters.date_to ? new Date(filters.date_to) : undefined
        }
      : undefined

  const activeFilterCount = [
    filters.user_id,
    filters.action_type,
    filters.date_from || filters.date_to
  ].filter(Boolean).length

  function handleUserChange(value: string) {
    onFiltersChange({ ...filters, user_id: value === "all" ? undefined : value })
  }

  function handleActionTypeChange(value: string) {
    onFiltersChange({
      ...filters,
      action_type: value === "all" ? undefined : (value as ActivityLogActionType)
    })
  }

  function handleDateRangeChange(range: DateRange | undefined) {
    onFiltersChange({
      ...filters,
      date_from: range?.from ? format(range.from, "yyyy-MM-dd") : undefined,
      date_to: range?.to ? format(range.to, "yyyy-MM-dd") : undefined
    })
  }

  function handleClearAll() {
    onFiltersChange({})
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* User Filter */}
      <motion.div
        key="user-filter"
        variants={filterChipVariants}
        initial="initial"
        animate="animate"
        layout
      >
        <Select value={filters.user_id ?? "all"} onValueChange={handleUserChange}>
          <SelectTrigger
            className={cn(
              "h-9 w-auto min-w-[160px] bg-white",
              filters.user_id && "border-primary text-primary"
            )}
          >
            <SelectValue placeholder="Filter by user" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <Separator className="my-1" />
            {membersData?.members.data.map((m) => (
              <SelectItem key={m.id} value={String(m.user.id)}>
                {m.user.name ?? m.user.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div
        key="action-filter"
        variants={filterChipVariants}
        initial="initial"
        animate="animate"
        layout
      >
        <Select value={filters.action_type ?? "all"} onValueChange={handleActionTypeChange}>
          <SelectTrigger
            className={cn(
              "h-9 w-auto min-w-[180px] bg-white",
              filters.action_type && "border-primary text-primary"
            )}
          >
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <Separator className="my-1" />
            {ACTION_TYPE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Date Range Filter */}
      <motion.div
        key="date-filter"
        variants={filterChipVariants}
        initial="initial"
        animate="animate"
        layout
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-9 justify-start bg-white font-normal",
                dateRange && "border-primary text-primary"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <AnimatePresence mode="wait" initial={false}>
                {dateRange?.from ? (
                  <motion.span
                    key="date-label"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
                    exit={{ opacity: 0, y: 4, transition: { duration: 0.1 } }}
                  >
                    {dateRange.to
                      ? `${format(dateRange.from, "dd MMM")} – ${format(dateRange.to, "dd MMM yyyy")}`
                      : format(dateRange.from, "dd MMM yyyy")}
                  </motion.span>
                ) : (
                  <motion.span
                    key="date-placeholder"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
                    exit={{ opacity: 0, y: 4, transition: { duration: 0.1 } }}
                  >
                    Date range
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
            />
            <AnimatePresence>
              {dateRange && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto", transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, height: 0, transition: { duration: 0.15 } }}
                  style={{ overflow: "hidden" }}
                >
                  <Separator />
                  <div className="flex justify-end p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDateRangeChange(undefined)}
                    >
                      <XIcon className="mr-1 h-3 w-3" />
                      Clear dates
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </PopoverContent>
        </Popover>
      </motion.div>

      {/* Clear All Filters */}
      <AnimatePresence initial={false}>
        {activeFilterCount > 0 && (
          <motion.div
            key="clear-all"
            variants={clearButtonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground h-9 px-2"
              onClick={handleClearAll}
            >
              <XIcon className="mr-1 h-3 w-3" />
              Clear filters
              <motion.span
                key={activeFilterCount}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { type: "spring" as const, stiffness: 400, damping: 20 }
                }}
                className="ml-1.5"
              >
                <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                  {activeFilterCount}
                </Badge>
              </motion.span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
