"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/src/components/ui/drawer"
import { Label } from "@/src/components/ui/label"
import { Separator } from "@/src/components/ui/separator"
import { getInitialUsername } from "@/src/lib/utils"
import { MemberData } from "@/src/types/member"
import { IoClose } from "react-icons/io5"
import RoleBadge from "@/src/components/shared/role-badge"
import { Pencil, Trash } from "lucide-react"
import { PermissionGuard } from "@/src/components/shared/permission-guard"
import EditMemberDialog from "./edit-member-dialog"
import DeleteMemberDialog from "./delete-member-dialog"
import { format } from "date-fns"

interface MemberDetailDrawerProps {
  member: MemberData
  trigger: React.ReactNode
}

function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <Label className="text-muted-foreground tracking-wider uppercase">{label}</Label>
      <div className="text-sm font-medium capitalize">{value}</div>
    </div>
  )
}

function MemberDetailDrawer({ member, trigger }: MemberDetailDrawerProps) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle>Member Profile</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <IoClose />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="scrollbar-thin flex flex-col gap-7 overflow-y-auto px-4 py-4">
          <div className="flex flex-col items-center gap-3">
            <Avatar size="lg" className="data-[size=lg]:size-20">
              <AvatarImage src={member.user.full_avatar_url ?? ""} />
              <AvatarFallback>{getInitialUsername(member.user.name ?? "B F")}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-xl font-semibold">{member.user.name}</p>
              <p className="text-muted-foreground text-sm">{member.user.email}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-5">
            <DetailItem label="Member ID" value={`#${member.user.id}`} />

            <DetailItem label="Role" value={<RoleBadge role={member.role} />} />

            <DetailItem
              label="Joined At"
              value={format(new Date(member.joined_at), "MMM dd, yyyy")}
            />
          </div>
        </div>

        <PermissionGuard action={["member:invite", "member:remove"]}>
          {member.role !== "owner" && (
            <DrawerFooter className="border-t bg-neutral-50">
              <div className="grid grid-cols-2 gap-2">
                <EditMemberDialog
                  member={member}
                  trigger={
                    <Button variant="outline" className="w-full">
                      <Pencil /> Change Role
                    </Button>
                  }
                />
                <DeleteMemberDialog
                  member={member}
                  trigger={
                    <Button variant="destructive" className="w-full">
                      <Trash /> Remove From Team
                    </Button>
                  }
                />
              </div>
            </DrawerFooter>
          )}
        </PermissionGuard>
      </DrawerContent>
    </Drawer>
  )
}

export default MemberDetailDrawer
