"use client"

import { DataTable } from "@/src/components/shared/data-table"
import PageHeader from "@/src/components/shared/page-header"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"
import { IoArrowBack } from "react-icons/io5"
import { useGetInvitations } from "../invitation.api"
import { invitationHistoryColumns } from "./components/invitation-history.columns"
import { useState } from "react"
import { InvitationStatus } from "@/src/types/invitation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/src/components/ui/select"
import { PaginationState } from "@tanstack/react-table"

const INVITATION_FILTERS: { label: string; value: InvitationStatus }[] = [
  { label: "History", value: "history" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
  { label: "Expired", value: "expired" }
]

function InvitationHistory() {
  const params = useParams()
  const organizationId = params.organizationId as string

  const [status, setStatus] = useState<InvitationStatus>("history")

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const { data, isLoading } = useGetInvitations({
    status,
    page: pagination.pageIndex,
    page_size: pagination.pageSize
  })

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Invitation History"
        description="View the history of your past invitation actions."
        action={
          <div className="flex items-center gap-4">
            <Button asChild variant="secondary" className="border bg-white">
              <Link href={`/${organizationId}/invitations`}>
                <IoArrowBack /> Back to pending
              </Link>
            </Button>

            <Select value={status} onValueChange={(val) => setStatus(val as InvitationStatus)}>
              <SelectTrigger className="w-36 bg-white">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent position="popper">
                {INVITATION_FILTERS.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
      />

      <DataTable
        columns={invitationHistoryColumns}
        data={data?.data || []}
        isLoading={isLoading}
        manualPagination
        manualSorting
        manualFiltering
        enableRowSelection
        pageCount={data?.last_page ?? 0}
        totalItems={data?.total ?? 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        enableColumnVisibility={false}
      />
    </div>
  )
}

export default InvitationHistory
