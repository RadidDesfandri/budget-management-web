"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/components/ui/dialog"
import { UpdateMemberRoleInput } from "../member.type"
import { useState } from "react"
import { useUpdateMemberRole } from "../member.api"
import { useParams } from "next/navigation"
import { MemberData } from "@/src/types/member"
import { MemberForm } from "./member-form"

interface EditMemberDialogProps {
  member: MemberData
  trigger: React.ReactNode
}

function EditMemberDialog({ member, trigger }: EditMemberDialogProps) {
  const params = useParams()
  const organizationId = params.organizationId as string

  const { mutate, isPending, error } = useUpdateMemberRole(organizationId, member.id)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onSubmit = (values: UpdateMemberRoleInput) => {
    mutate(values, {
      onSuccess: () => {
        setIsOpen(false)
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <MemberForm
          mode="edit"
          defaultValues={{ role: member.role }}
          onSubmit={onSubmit}
          isPending={isPending}
          fieldErrors={error?.fieldErrors}
          header={
            <DialogHeader>
              <DialogTitle>Edit Member Role</DialogTitle>
              <DialogDescription>
                Change the role for <span className="font-semibold">{member.user.name}</span>.
              </DialogDescription>
            </DialogHeader>
          }
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditMemberDialog
