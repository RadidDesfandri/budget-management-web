import { IoMdMailUnread } from "react-icons/io"

function EmptyInvitation() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <IoMdMailUnread className="text-muted-foreground mb-8 h-16 w-16" />
      <p className="text-center text-lg font-semibold">No pending invitations</p>
      <p className="text-muted-foreground text-center text-sm">
        You&apos;re all caught up! There are no pending invitations <br /> waiting for your action
        right now.
      </p>
    </div>
  )
}

export default EmptyInvitation
