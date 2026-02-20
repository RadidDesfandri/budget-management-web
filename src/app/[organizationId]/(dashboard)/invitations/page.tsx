"use client"

import PageHeader from "@/src/components/shared/page-header"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { History } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import ListInvitations from "./components/list-invitations"
import { useGetInvitations } from "./invitation.api"

function Invitations() {
  const params = useParams()
  const organizationId = params.organizationId as string

  const { data: mainData, isLoading, isError } = useGetInvitations({ status: "pending" })

  const pendingCount = mainData?.total ?? 0

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Pending invitations"
        titleSuffix={
          <Badge className="border-blue-600 bg-blue-100 text-blue-600">{pendingCount} New</Badge>
        }
        description="Manage your pending invitations to join organization."
        action={
          <Button asChild variant="secondary" className="border bg-white">
            <Link href={`/${organizationId}/invitations/history`}>
              <History /> History
            </Link>
          </Button>
        }
      />

      <ListInvitations data={mainData?.data} isLoading={isLoading} isError={isError} />
    </div>
  )
}

export default Invitations
