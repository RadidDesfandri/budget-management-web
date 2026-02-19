"use client"

import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card"
import { getExpiresInLabel, getInitialUsername, isExpiringSoon } from "@/src/lib/utils"
import { FaArrowRight } from "react-icons/fa"
import { FaCircleCheck } from "react-icons/fa6"
import { IoWarning } from "react-icons/io5"
import { MdWork } from "react-icons/md"
import { useAcceptInvitation } from "../invitation-accept.api"
import { usePathname, useRouter } from "next/navigation"

interface InvitationSuccessProps {
  email: string
  organizationLogoUrl: string
  organizationName: string
  role: string
  token: string
  expiresAt: string
}

function InvitationSuccess({
  email,
  organizationLogoUrl,
  organizationName,
  role,
  token,
  expiresAt
}: InvitationSuccessProps) {
  const { mutate, isPending } = useAcceptInvitation()
  const pathname = usePathname()
  const router = useRouter()

  const handleAcceptInvitation = () => {
    if (!token) return

    mutate(token, {
      onError: (error) => {
        if (error.message === "Unauthorized") {
          router.push(`/login?redirect=${pathname}&token=${token}`)
        }
      }
    })
  }

  return (
    <Card className="w-full md:max-w-md">
      <CardHeader className="flex flex-col items-center gap-3 border-b">
        <Avatar className="size-20 rounded-md">
          <AvatarImage src={organizationLogoUrl} alt={organizationName} />
          <AvatarFallback className="rounded-md">
            {getInitialUsername(organizationName)}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-center text-2xl font-bold">
          You&apos;re invited to join{" "}
          <span className="text-primary capitalize">{organizationName}</span>
        </h1>
        <p className="text-muted-foreground text-center text-xs md:text-sm">
          BudgetFlow workspace for finance and operations team.
        </p>
        <Badge className="border-blue-600 bg-blue-50 text-blue-600 uppercase">
          <MdWork /> {role}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <Alert className="flex items-center justify-between bg-green-50/60 text-green-500">
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarFallback>{getInitialUsername(email)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="text-muted-foreground text-sm leading-none uppercase">Invited as</p>
              <p className="text-sm font-medium text-neutral-950">{email}</p>
            </div>
          </div>

          <FaCircleCheck />
        </Alert>
        {isExpiringSoon(expiresAt) && (
          <Alert variant="warning">
            <IoWarning />
            <AlertTitle>Expires Soon</AlertTitle>
            <AlertDescription>{getExpiresInLabel(expiresAt)}</AlertDescription>
          </Alert>
        )}

        <Button size="lg" className="w-full" disabled={isPending} onClick={handleAcceptInvitation}>
          {isPending ? "Accepting..." : "Accept Invitation"} <FaArrowRight />
        </Button>
      </CardContent>

      <CardFooter>
        <p className="text-muted-foreground text-center text-xs md:text-sm">
          By accepting, yo agree to BudgetFlow&apos;s{" "}
          <span className="underline">Terms of Service</span> and{" "}
          <span className="underline">Privacy Policy</span>
        </p>
      </CardFooter>
    </Card>
  )
}

export default InvitationSuccess
