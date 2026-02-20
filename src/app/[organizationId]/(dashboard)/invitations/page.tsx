"use client"

import PageHeader from "@/src/components/shared/page-header"
import ListInvitations from "./components/list-invitations"
import { InvitationStatus } from "@/src/types/invitation"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/src/components/ui/select"
import { Badge } from "@/src/components/ui/badge"
import { useGetInvitations } from "./invitation.api"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"
import { History } from "lucide-react"

const INVITATION_FILTERS: { label: string; value: InvitationStatus }[] = [
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
  { label: "Expired", value: "expired" }
]

function Invitations() {
  const params = useParams()
  const organizationId = params.organizationId as string

  const [status, setStatus] = useState<InvitationStatus>("pending")

  const { data: mainData, isLoading, isError } = useGetInvitations({ status })

  const { data: pendingData } = useGetInvitations({
    status: "pending",
    page_size: 1,
    enabled: status !== "pending"
  })

  const pendingCount = status === "pending" ? (mainData?.total ?? 0) : (pendingData?.total ?? 0)

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Pending invitations"
        titleSuffix={
          <Badge className="border-blue-600 bg-blue-100 text-blue-600">{pendingCount} New</Badge>
        }
        description="Manage your pending invitations to join organization."
        action={
          <div className="flex items-center gap-4">
            <Button asChild variant="secondary" className="border bg-white">
              <Link href={`/${organizationId}/invitations/history`}>
                <History /> History
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

      <ListInvitations data={mainData?.data} isLoading={isLoading} isError={isError} />
    </div>
  )
}

export default Invitations
