"use client"

import { DataTable } from "@/src/components/shared/data-table"
import PageHeader from "@/src/components/shared/page-header"
import { useDebounceValue } from "@/src/hooks/use-debounce"
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table"
import { useState } from "react"
import { InviteMemberDialog } from "./components/invite-member-dialog"
import { memberColumns } from "./components/member-columns"
import { MembersStats } from "./components/members-stats"
import { useGetMemberInOrganization } from "./member.api"
import { useParams } from "next/navigation"

function MembersPage() {
  const params = useParams()

  const organizationId = params.organizationId as string

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const [sorting, setSorting] = useState<SortingState>([])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const sortBy = sorting[0]?.id
  const sortOrder = sorting[0]?.desc ? "desc" : "asc"

  const searchValue = columnFilters.find((filter) => filter.id === "user")?.value as string

  const debounceSearch = useDebounceValue(searchValue, 500)

  const { data, isLoading } = useGetMemberInOrganization({
    page: pagination.pageIndex + 1,
    page_size: pagination.pageSize,
    search: debounceSearch,
    sort_by: sortBy,
    order_by: sortOrder,
    organizationId: Number(organizationId)
  })

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Team Members"
        description="Manage your team members and their account permissions here."
        action={<InviteMemberDialog />}
      />

      <MembersStats
        totalMembers={data?.stats.total_members ?? 0}
        totalAdmins={data?.stats.total_admins ?? 0}
        pendingInvites={data?.stats.pending_invites ?? 0}
      />

      <DataTable
        columns={memberColumns}
        data={data?.members.data || []}
        manualPagination
        manualSorting
        manualFiltering
        searchKey="user"
        searchPlaceholder="Search by name or email..."
        pageCount={data?.members.last_page ?? 0}
        totalItems={data?.members.total ?? 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        enableRowSelection
        enableColumnVisibility={false}
        isLoading={isLoading}
      />
    </div>
  )
}

export default MembersPage
