"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
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
import { Mail, UserCog, Save } from "lucide-react"
import { IoMdSend } from "react-icons/io"
import { inviteMemberSchema, updateMemberRoleSchema } from "../member.schema"
import { InviteMemberInput } from "../member.type"
import { Button } from "@/src/components/ui/button"
import { DialogClose, DialogFooter } from "@/src/components/ui/dialog"

const roleDescriptions = {
  admin: "Admins have full access to manage organization settings and members",
  finance: "Finance members can approve transactions and manage budgets",
  member: "Members can view budgets but cannot approve transactions"
} as const

interface MemberFormProps {
  mode: "invite" | "edit"
  defaultValues?: Partial<InviteMemberInput>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => void
  isPending: boolean
  fieldErrors?: Record<string, string>
  header: React.ReactNode
}

export function MemberForm({
  mode,
  defaultValues,
  onSubmit,
  isPending,
  fieldErrors,
  header
}: MemberFormProps) {
  const isInvite = mode === "invite"

  const form = useForm<InviteMemberInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(isInvite ? inviteMemberSchema : updateMemberRoleSchema) as any,
    defaultValues: {
      email: defaultValues?.email ?? "",
      role: defaultValues?.role ?? ""
    }
  })

  useEffect(() => {
    if (!fieldErrors) return
    Object.entries(fieldErrors).forEach(([key, message]) => {
      form.setError(key as keyof InviteMemberInput, { type: "server", message })
    })
  }, [fieldErrors, form])

  const selectedRole = form.watch("role")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {header}

        <div className="space-y-6">
          {isInvite && (
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
          )}

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Role</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  value={field.value}
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
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending} type="submit">
            {isInvite ? (
              <>
                <IoMdSend className="mr-2 h-4 w-4" /> {isPending ? "Sending..." : "Send Invite"}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> {isPending ? "Saving..." : "Save Changes"}
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
