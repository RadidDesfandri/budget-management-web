import { Card, CardContent } from "@/src/components/ui/card"
import { Skeleton } from "@/src/components/ui/skeleton"
import { InvitationData } from "@/src/types/invitation"
import CardInvitations from "./card-invitations"
import EmptyInvitation from "./empty-invitation"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/src/components/ui/pagination"

interface ListInvitationsProps {
  data?: InvitationData[]
  isLoading: boolean
  isError: boolean
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

function ListInvitations({
  data,
  isLoading,
  isError,
  page,
  totalPages,
  onPageChange
}: ListInvitationsProps) {
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
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {data.map((invitation) => (
          <CardInvitations key={invitation.id} invitation={invitation} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(page - 1)}
                aria-disabled={page === 0}
                className={page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => {
              const isFirst = i === 0
              const isLast = i === totalPages - 1
              const isNearCurrent = Math.abs(i - page) <= 1

              if (!isFirst && !isLast && !isNearCurrent) {
                if (i === 1 || i === totalPages - 2) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
                return null
              }

              return (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i}
                    onClick={() => onPageChange(i)}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(page + 1)}
                aria-disabled={page === totalPages - 1}
                className={
                  page === totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

export default ListInvitations
