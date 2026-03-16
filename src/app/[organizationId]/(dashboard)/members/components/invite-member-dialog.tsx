"use client"

import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { InviteMemberInput } from "../member.type"
import { useState } from "react"
import { useInviteMember } from "../member.api"
import { useParams } from "next/navigation"
import { PermissionGuard } from "@/src/components/shared/permission-guard"
import { MemberForm } from "./member-form"

export function InviteMemberDialog() {
  const params = useParams()
  const organizationId = params.organizationId as string

  const { mutate, isPending, error } = useInviteMember(organizationId)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onSubmit = (values: InviteMemberInput) => {
    mutate(values, {
      onSuccess: () => {
        setIsOpen(false)
      }
    })
  }

  return (
    <PermissionGuard action="member:invite">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="lg">
            <PlusIcon /> Invite Member
          </Button>
        </DialogTrigger>

        <DialogContent>
          <MemberForm
            mode="invite"
            onSubmit={onSubmit}
            isPending={isPending}
            fieldErrors={error?.fieldErrors}
            header={
              <DialogHeader>
                <DialogTitle>Invite New Member</DialogTitle>
                <DialogDescription>
                  Enter the email address of the person you would like to invite.
                </DialogDescription>
              </DialogHeader>
            }
          />
        </DialogContent>
      </Dialog>
    </PermissionGuard>
  )
}
