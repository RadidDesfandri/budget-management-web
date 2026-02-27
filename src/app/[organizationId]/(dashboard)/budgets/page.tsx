"use client"

import { DataTable } from "@/src/components/shared/data-table"
import PageHeader from "@/src/components/shared/page-header"
import { MonthYearPicker } from "@/src/components/ui/month-year-picker"
import { PaginationState, SortingState } from "@tanstack/react-table"
import { format } from "date-fns"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useGetBudget } from "./budget.api"
import AddBudget from "./components/add-budget"
import { budgetColumns } from "./components/budget-columns"
import BudgetLegend from "./components/budget-legend"
import BudgetStats from "./components/budget-stats"

const BudgetPage = () => {
  const params = useParams()
  const organizationId = params.organizationId as string
  const [date, setDate] = useState<{ year: number; month: number } | undefined>()

  const formatted = date
    ? `${date.year}-${String(date.month + 1).padStart(2, "0")}`
    : format(new Date(), "yyyy-MM")

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const [sorting, setSorting] = useState<SortingState>([])

  const sortBy = sorting[0]?.id
  const sortOrder = sorting[0]?.desc ? "desc" : "asc"

  const { data, isLoading } = useGetBudget({
    organizationId,
    period: formatted,
    page: pagination.pageIndex,
    page_size: pagination.pageSize,
    sort_by: sortBy,
    order_by: sortOrder
  })

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Budgets"
        description="Manage your organization's budgets and allocations."
        action={
          <div className="flex items-center gap-4 rounded-lg border-neutral-700 bg-white p-2 shadow">
            <MonthYearPicker
              value={date}
              onChange={setDate}
              fromYear={2020}
              placeholder={format(new Date(), "MMMM yyyy")}
              toYear={new Date().getFullYear() + 1}
              className="w-44"
            />

            <hr className="h-7 w-px bg-neutral-300" />
            <AddBudget />
          </div>
        }
      />

      <BudgetStats
        totalBudget={data?.total_budget ?? 0}
        totalUsed={data?.total_used ?? 0}
        totalRemaining={data?.total_remaining ?? 0}
        isLoading={isLoading}
      />

      <DataTable
        data={data?.budgets.data ?? []}
        columns={budgetColumns}
        manualPagination
        manualSorting
        pageCount={data?.budgets.last_page ?? 0}
        totalItems={data?.budgets.total ?? 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        enableRowSelection
        enableColumnVisibility={false}
        isLoading={isLoading}
        additionalContent={<BudgetLegend />}
      />
    </div>
  )
}

export default BudgetPage
