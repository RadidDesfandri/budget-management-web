"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/components/ui/dialog"
import { MemberData } from "@/src/types/member"
import { useRemoveMember } from "../member.api"
import { useParams } from "next/navigation"

interface DeleteMemberDialogProps {
  member: MemberData
  trigger: React.ReactNode
}

function DeleteMemberDialog({ member, trigger }: DeleteMemberDialogProps) {
  const params = useParams()
  const organizationId = params.organizationId as string
  const { mutate: removeMember, isPending } = useRemoveMember(organizationId)
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Member</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove{" "}
            <span className="font-semibold">{member.user.name}</span> from this organization? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" disabled={isPending} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() =>
              removeMember(member.user.id, {
                onSuccess: () => setOpen(false)
              })
            }
          >
            {isPending ? "Removing..." : "Remove"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteMemberDialog
