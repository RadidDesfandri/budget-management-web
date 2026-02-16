"use client"

import { Button } from "@/src/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { useResetPassword } from "./reset-password.api"
import { resetPasswordSchema } from "./reset-password.schema"
import { ResetPasswordData } from "./reset-password.type"

function ResetPasswordForm() {
  const { id, hash } = useParams()
  const searchParams = useSearchParams()

  const { mutate, isPending } = useResetPassword()

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = (values: ResetPasswordData) => {
    const payload = {
      password: values.password,
      id: id as string,
      hash: hash as string,
      query: searchParams.toString()
    }

    mutate(payload, {
      onError: (error) => {
        if (!error.fieldErrors) return
        Object.entries(error.fieldErrors).forEach(([key, message]) => {
          form.setError(key as keyof ResetPasswordData, {
            type: "server",
            message
          })
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={isPending}
                    placeholder="Re-enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" disabled={isPending} className="w-full">
            Reset Password
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ResetPasswordForm
