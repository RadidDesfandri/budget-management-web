"use client"

import {
  useAcceptInvitation,
  useDeclineInvitation
} from "@/src/app/invitation/accept/invitation-accept.api"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { cn } from "@/src/lib/utils"
import { InvitationData } from "@/src/types/invitation"
import { Loader2 } from "lucide-react"

interface CardInvitationsProps {
  invitation: InvitationData
}

function CardInvitations({ invitation }: CardInvitationsProps) {
  const baseClassName = "flex items-center justify-between gap-4"
  const { mutate: accept, isPending: isAccepting } = useAcceptInvitation()
  const { mutate: decline, isPending: isDeclining } = useDeclineInvitation()

  const isLoading = isAccepting || isDeclining

  const colorClasses: Record<InvitationData["role"], string> = {
    admin: "bg-blue-50 text-blue-600",
    member: "bg-neutral-100 text-neutral-600",
    finance: "bg-yellow-50 text-yellow-600",
    owner: "bg-red-50 text-red-600"
  }

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
          <Badge className={cn("capitalize", colorClasses[invitation.role])}>
            {invitation.role}
          </Badge>
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
