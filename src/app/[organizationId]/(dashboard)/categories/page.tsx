"use client"

import { DataTable } from "@/src/components/shared/data-table"
import PageHeader from "@/src/components/shared/page-header"
import { Badge } from "@/src/components/ui/badge"
import { ArrowUp } from "lucide-react"
import { useParams } from "next/navigation"
import { useGetCategories } from "./category.api"
import AddCategory from "./components/add-category"
import { categoryColumns } from "./components/category-columns"

const CategoriesPage = () => {
  const params = useParams()
  const organizationId = params.organizationId as string

  const { isLoading, data } = useGetCategories(organizationId)

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
            <span className="text-2xl font-bold">{data?.length ?? 0}</span>
            <Badge variant="secondary" className="rounded-md bg-green-100 text-green-600">
              <ArrowUp className="h-4 w-4" />1
            </Badge>
          </div>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-muted-foreground font-medium">Most Active</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">Marketing</span>
            <span className="text-muted-foreground text-sm">(142 txns)</span>
          </div>
        </div>
      </div>

      <DataTable
        data={data ?? []}
        columns={categoryColumns}
        enableColumnVisibility={false}
        isLoading={isLoading}
      />
    </div>
  )
}

export default CategoriesPage
