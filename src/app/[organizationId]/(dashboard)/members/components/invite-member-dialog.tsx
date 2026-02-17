"use client"

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
import { useForm } from "react-hook-form"
import { IoMdSend } from "react-icons/io"
import { InviteMemberInput } from "../member.type"
import { inviteMemberSchema } from "../member.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/src/components/ui/select"
import { Mail, UserCog } from "lucide-react"
import { useState } from "react"
import { useInviteMember } from "../member.api"
import { useParams } from "next/navigation"
import { PermissionGuard } from "@/src/components/shared/permission-guard"

const roleDescriptions = {
  admin: "Admins have full access to manage organization settings and members",
  finance: "Finance members can approve transactions and manage budgets",
  member: "Members can view budgets but cannot approve transactions"
} as const

export function InviteMemberDialog() {
  const params = useParams()
  const organizationId = params.organizationId as string

  const { mutate, isPending } = useInviteMember(organizationId)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const form = useForm<InviteMemberInput>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: "",
      role: ""
    }
  })

  const selectedRole = form.watch("role")

  const onSubmit = (values: InviteMemberInput) => {
    mutate(values, {
      onSuccess: () => {
        setIsOpen(false)
        form.reset()
      },
      onError: (error) => {
        if (!error.fieldErrors) return
        Object.entries(error.fieldErrors).forEach(([key, message]) => {
          form.setError(key as keyof InviteMemberInput, {
            type: "server",
            message
          })
        })
      }
    })
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      form.reset()
    }
  }

  return (
    <PermissionGuard action="member:invite">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button size="lg">
            <PlusIcon /> Invite Member
          </Button>
        </DialogTrigger>

        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Invite New Member</DialogTitle>
                <DialogDescription>
                  Enter the email address of the person you would like to invite.
                </DialogDescription>
              </DialogHeader>

              <div className="my-6 space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                          <Input
                            type="email"
                            disabled={isPending}
                            placeholder="name@company.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Role</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <div className="flex items-center">
                              <UserCog className="text-muted-foreground mr-2 h-4 w-4" />
                              <SelectValue placeholder="Select a role" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper">
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                        </SelectContent>
                      </Select>
                      {selectedRole && (
                        <FormDescription>
                          {roleDescriptions[selectedRole as keyof typeof roleDescriptions]}
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button disabled={isPending} type="submit">
                  <IoMdSend /> {isPending ? "Sending..." : "Send Invite"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PermissionGuard>
  )
}
