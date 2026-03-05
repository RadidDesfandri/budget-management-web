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
import { ExpenseStatus } from "@/src/types/expense"
import { useGetCategories } from "../../categories/category.api"
import { useParams } from "next/navigation"

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

export interface ExpenseFilters {
  status?: ExpenseStatus
  date_from?: string
  date_to?: string
  category?: string
}

interface ExpensesFilterProps {
  filters: ExpenseFilters
  onFiltersChange: (filters: ExpenseFilters) => void
}

const STATUS_OPTIONS: { label: string; value: ExpenseStatus }[] = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" }
]

const STATUS_BADGE_STYLE: Record<ExpenseStatus, string> = {
  pending: "bg-yellow-500",
  approved: "bg-green-500",
  rejected: "bg-red-500"
}

export function ExpensesFilter({ filters, onFiltersChange }: ExpensesFilterProps) {
  const params = useParams()
  const organizationId = params.organizationId as string

  const { data: categories } = useGetCategories(organizationId)

  const dateRange: DateRange | undefined =
    filters.date_from || filters.date_to
      ? {
          from: filters.date_from ? new Date(filters.date_from) : undefined,
          to: filters.date_to ? new Date(filters.date_to) : undefined
        }
      : undefined

  const activeFilterCount = [
    filters.status,
    filters.date_from || filters.date_to,
    filters.category
  ].filter(Boolean).length

  function handleStatusChange(value: string) {
    onFiltersChange({
      ...filters,
      status: value === "all" ? undefined : (value as ExpenseStatus)
    })
  }

  function handleDateRangeChange(range: DateRange | undefined) {
    onFiltersChange({
      ...filters,
      date_from: range?.from ? format(range.from, "yyyy-MM-dd") : undefined,
      date_to: range?.to ? format(range.to, "yyyy-MM-dd") : undefined
    })
  }

  function handleCategoryChange(value: string) {
    onFiltersChange({
      ...filters,
      category: value === "all" ? undefined : value
    })
  }

  function handleClearAll() {
    onFiltersChange({})
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
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

      <AnimatePresence initial={false}>
        {categories && categories.length > 0 && (
          <motion.div
            key="category-filter"
            variants={filterChipVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
          >
            <Select value={filters.category ?? "all"} onValueChange={handleCategoryChange}>
              <SelectTrigger
                className={cn(
                  "h-9 w-auto min-w-[140px] bg-white capitalize transition-colors duration-200",
                  filters.category && "border-primary text-primary"
                )}
              >
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <Separator className="my-1" />
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.name} className="capitalize">
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key="status-filter"
        variants={filterChipVariants}
        initial="initial"
        animate="animate"
        layout
      >
        <Select value={filters.status ?? "all"} onValueChange={handleStatusChange}>
          <SelectTrigger
            className={cn(
              "h-9 w-auto min-w-[130px] bg-white",
              filters.status && "border-primary text-primary"
            )}
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <Separator className="my-1" />
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <div className="flex items-center gap-2">
                  <Badge
                    className={cn("h-2 w-2 rounded-full p-0", STATUS_BADGE_STYLE[opt.value])}
                  />
                  {opt.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

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
