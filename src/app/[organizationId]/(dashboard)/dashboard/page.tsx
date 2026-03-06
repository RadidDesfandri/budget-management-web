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

function DashboardPage() {
  const params = useParams()
  const organizationId = params.organizationId as string
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("30d")
  const [date, setDate] = useState<DateRange | undefined>(undefined)

  const { data, isLoading } = useListExpenses({
    organizationId,
    date_to: format(new Date(), "yyyy-MM-dd"),
    date_from: format(subDays(new Date(), 5), "yyyy-MM-dd"),
    page_size: 10
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

      <DashboardStatsList organizationId={organizationId} />

      <div className="flex w-full flex-col items-center gap-4 md:flex-row">
        <div className="w-full md:w-[60%]">
          <ExpenseLineChart
            title="Montly Expense Trend"
            description="Comparison of expenses and budget"
            data={lineChartData}
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
      />
    </div>
  )
}

export default DashboardPage
