import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { IoMdSend } from "react-icons/io"

export function InviteMemberDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          <PlusIcon /> Invite Member
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite New Member</DialogTitle>
          <DialogDescription>
            Enter the email address of the person you would like to invite.
          </DialogDescription>
        </DialogHeader>

        {/* <InviteForm /> */}
        <div>Form here</div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">
            <IoMdSend /> Send Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
