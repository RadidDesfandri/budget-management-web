"use client"

import { DataTable } from "@/src/components/shared/data-table"
import PageHeader from "@/src/components/shared/page-header"
import { Button } from "@/src/components/ui/button"
import { useDebounceValue } from "@/src/hooks/use-debounce"
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { expenseColumns } from "./components/expense-columns"
import { ExpenseFilters, ExpensesFilter } from "./components/expenses-filter"
import { useListExpenses } from "./expense.api"

function ExpensesPage() {
  const params = useParams()
  const organizationId = params.organizationId as string

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const [sorting, setSorting] = useState<SortingState>([])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [expenseFilters, setExpenseFilters] = useState<ExpenseFilters>({})

  function handleFiltersChange(newFilters: ExpenseFilters) {
    setExpenseFilters(newFilters)
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

  const searchValue = columnFilters.find((filter) => filter.id === "title")?.value as string

  const debounceSearch = useDebounceValue(searchValue, 500)

  const sortBy = sorting[0]?.id
  const sortOrder = sorting[0]?.desc ? "asc" : "desc"

  const { data, isLoading } = useListExpenses({
    organizationId,
    page: pagination.pageIndex,
    page_size: pagination.pageSize,
    sort_by: sortBy,
    order_by: sortOrder,
    search: debounceSearch,
    status: expenseFilters.status,
    date_from: expenseFilters.date_from,
    date_to: expenseFilters.date_to,
    category: expenseFilters.category
  })

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Expenses"
        description="Manage and track your team's spending."
        action={
          <Button asChild size="lg">
            <Link href={`/${organizationId}/expenses/create`}>
              <Plus />
              Add Expense
            </Link>
          </Button>
        }
      />

      <DataTable
        data={data?.data ?? []}
        columns={expenseColumns}
        manualPagination
        manualSorting
        manualFiltering
        searchKey="title"
        searchPlaceholder="Search by title, description, amount..."
        pageCount={data?.last_page ?? 0}
        totalItems={data?.total ?? 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        enableRowSelection
        enableColumnVisibility={false}
        isLoading={isLoading}
        additionalContent={
          <ExpensesFilter filters={expenseFilters} onFiltersChange={handleFiltersChange} />
        }
      />
    </div>
  )
}

export default ExpensesPage
