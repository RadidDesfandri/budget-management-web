"use client"

import PageHeader from "@/src/components/shared/page-header"
import { MonthYearPicker } from "@/src/components/ui/month-year-picker"
import { format } from "date-fns"
import { useState } from "react"
import AddBudget from "./components/add-budget"

const BudgetPage = () => {
  const [date, setDate] = useState<{ year: number; month: number } | undefined>()

  // Format output: "2026-02"
  const formatted = date
    ? `${date.year}-${String(date.month + 1).padStart(2, "0")}`
    : format(new Date(), "yyyy-MM")

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
    </div>
  )
}

export default BudgetPage
