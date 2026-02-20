"use client"

import {
  useAcceptInvitation,
  useDeclineInvitation
} from "@/src/app/invitation/accept/invitation-accept.api"
import RoleBadge from "@/src/components/shared/role-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { cn } from "@/src/lib/utils"
import { InvitationData } from "@/src/types/invitation"
import { Role } from "@/src/types/member"
import { Loader2 } from "lucide-react"

interface CardInvitationsProps {
  invitation: InvitationData
}

function CardInvitations({ invitation }: CardInvitationsProps) {
  const { mutate: accept, isPending: isAccepting } = useAcceptInvitation()
  const { mutate: decline, isPending: isDeclining } = useDeclineInvitation()

  const isLoading = isAccepting || isDeclining

  const baseClassName = "flex items-center justify-between gap-4"

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className={cn(baseClassName, "justify-start")}>
          <Avatar size="lg" className="rounded-md">
            <AvatarImage src={invitation.organization.full_logo_url ?? undefined} />
            <AvatarFallback className="rounded-md">
              {invitation.organization.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-bold capitalize">{invitation.organization.name}</h3>
        </div>
        <div className={cn(baseClassName)}>
          <p className="text-muted-foreground">Role assigned</p>
          <RoleBadge role={invitation.role as Role} />
        </div>
        <div className={cn(baseClassName)}>
          <p className="text-muted-foreground">Invited by</p>
          <p className="text-neutral-800">{invitation.invited_by.name}</p>
        </div>
        <div className={cn(baseClassName)}>
          <p className="text-muted-foreground">Expires on</p>
          <p className="text-neutral-800">
            {new Date(invitation.expires_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </p>
        </div>

        <div className={cn(baseClassName)}>
          <Button
            variant="outline"
            className="border-destructive text-destructive w-1/2"
            size="lg"
            disabled={isLoading}
            onClick={() => decline(invitation.token)}
          >
            {isDeclining ? <Loader2 className="animate-spin" /> : "Decline"}
          </Button>
          <Button
            className="w-1/2"
            size="lg"
            disabled={isLoading}
            onClick={() => accept(invitation.token)}
          >
            {isAccepting ? <Loader2 className="animate-spin" /> : "Accept"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardInvitations
