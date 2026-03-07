"use client"

import { DataTable } from "@/src/components/shared/data-table"
import PageHeader from "@/src/components/shared/page-header"
import { Button } from "@/src/components/ui/button"
import { format, subDays } from "date-fns"
import { DownloadIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import { DateRange } from "react-day-picker"
import { useExpenseLineChart, useExpensePieChart, useListExpenses } from "../expenses/expense.api"
import { ExpenseLineChart } from "./components/charts/expense-line-chart"
import { ExpensePieChart } from "./components/charts/expense-pie-chart"
import DashboardFilter from "./components/dashboard-filter"
import DashboardStatsList from "./components/dashboard-stats-list"
import { recentExpenseColumn } from "./components/recent-expense-column"
import { LINE_CHART_SERIES, PIE_COLORS } from "@/src/config/data"
import { PaginationState } from "@tanstack/react-table"

function DashboardPage() {
  const params = useParams()
  const organizationId = params.organizationId as string
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("30d")
  const [date, setDate] = useState<DateRange | undefined>(undefined)

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const dateRange = date
    ? `${format(date.from!, "yyyy-MM-dd")} - ${format(date.to!, "yyyy-MM-dd")}`
    : ""

  const filterMap: Record<string, string> = {
    "7d": "7d",
    "30d": "30d",
    last_month: "last_month",
    custom: dateRange
  }

  const { data, isLoading } = useListExpenses({
    organizationId,
    date_to: format(new Date(), "yyyy-MM-dd"),
    date_from: format(subDays(new Date(), 5), "yyyy-MM-dd"),
    page_size: pagination.pageSize,
    page: pagination.pageIndex,
    sort_by: "created_at",
    order_by: "desc"
  })

  const { data: lineChartData } = useExpenseLineChart(organizationId)
  const { data: pieChartData } = useExpensePieChart(organizationId)

  const pieData = useMemo(() => {
    return (pieChartData ?? []).map((item, index) => ({
      ...item,
      color: PIE_COLORS[index % PIE_COLORS.length]
    }))
  }, [pieChartData])

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Dashboard Overview"
        description="Welcome back, here's what's happening in your finance today."
        action={
          <DashboardFilter
            selectedTimeRange={selectedTimeRange}
            date={date}
            setDate={setDate}
            setSelectedTimeRange={setSelectedTimeRange}
          />
        }
      />

      <DashboardStatsList organizationId={organizationId} filter={filterMap[selectedTimeRange]} />

      <div className="flex w-full flex-col items-center gap-4 md:flex-row">
        <div className="w-full md:w-[60%]">
          <ExpenseLineChart
            title="Montly Expense Trend"
            description="Comparison of expenses and budget"
            data={lineChartData || []}
            series={LINE_CHART_SERIES}
          />
        </div>
        <div className="w-full md:w-[40%]">
          <ExpensePieChart
            title="Expense Breakdown"
            description="Distribution of expenses this month"
            data={pieData}
          />
        </div>
      </div>

      <DataTable
        data={data?.data || []}
        columns={recentExpenseColumn}
        isLoading={isLoading}
        enableColumnVisibility={false}
        enablePageSizeOptions={false}
        title="Recent Expenses"
        titleAction={
          <Button variant="outline">
            <DownloadIcon /> Export
          </Button>
        }
        manualPagination
        pageCount={data?.last_page ?? 0}
        totalItems={data?.total ?? 0}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    </div>
  )
}

export default DashboardPage
