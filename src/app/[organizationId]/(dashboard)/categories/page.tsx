"use client"

import { DataTable } from "@/src/components/shared/data-table"
import PageHeader from "@/src/components/shared/page-header"
import { Badge } from "@/src/components/ui/badge"
import { ArrowUp } from "lucide-react"
import { useParams } from "next/navigation"
import { useGetCategories } from "./category.api"
import AddCategory from "./components/add-category"
import { categoryColumns } from "./components/category-columns"
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table"
import { useState } from "react"
import { useDebounceValue } from "@/src/hooks/use-debounce"

const CategoriesPage = () => {
  const params = useParams()
  const organizationId = params.organizationId as string

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const [sorting, setSorting] = useState<SortingState>([])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const searchValue = columnFilters.find((filter) => filter.id === "name")?.value as string

  const debounceSearch = useDebounceValue(searchValue, 500)

  const sortBy = sorting[0]?.id
  const sortOrder = sorting[0]?.desc ? "asc" : "desc"

  const { isLoading, data } = useGetCategories({
    organizationId,
    page: pagination.pageIndex,
    page_size: pagination.pageSize,
    search: debounceSearch,
    sort_by: sortBy,
    order_by: sortOrder
  })

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Expense Categories"
        description="Manage your organization's spending categories and rules."
        action={<AddCategory />}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-muted-foreground font-medium">Total Categories</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{data?.categories.total ?? 0}</span>
            <Badge variant="secondary" className="rounded-md bg-green-100 text-green-600">
              <ArrowUp className="h-4 w-4" />
              {data?.most_active_category.expenses_count ?? 0}
            </Badge>
          </div>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-muted-foreground font-medium">Most Active</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{data?.most_active_category.name ?? "N/A"}</span>
            <span className="text-muted-foreground text-sm">
              ({data?.most_active_category.expenses_count ?? 0} txns)
            </span>
          </div>
        </div>
      </div>

      <DataTable
        data={data?.categories.data ?? []}
        columns={categoryColumns}
        enableColumnVisibility={false}
        isLoading={isLoading}
        manualPagination
        manualSorting
        manualFiltering
        searchKey="name"
        searchPlaceholder="Search by name..."
        pageCount={data?.categories.last_page ?? 0}
        totalItems={data?.categories.total ?? 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
      />
    </div>
  )
}

export default CategoriesPage
