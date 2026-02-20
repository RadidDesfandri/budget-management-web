import { Card, CardContent } from "@/src/components/ui/card"
import { Skeleton } from "@/src/components/ui/skeleton"
import { InvitationData } from "@/src/types/invitation"
import CardInvitations from "./card-invitations"
import EmptyInvitation from "./empty-invitation"

interface ListInvitationsProps {
  data?: InvitationData[]
  isLoading: boolean
  isError: boolean
}

function ListInvitations({ data, isLoading, isError }: ListInvitationsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="flex flex-col gap-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (isError) {
    return <p className="text-destructive text-sm">Failed to load invitations. Please try again.</p>
  }

  if (!data?.length) {
    return <EmptyInvitation />
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
      {data.map((invitation) => (
        <CardInvitations key={invitation.id} invitation={invitation} />
      ))}
    </div>
  )
}

export default ListInvitations
