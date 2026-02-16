"use client"

import { useForm } from "react-hook-form"
import { ForgotPasswordData } from "../forgot-password.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordSchema } from "../forgot-password.schema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { useForgotPassword } from "../forgot-password.api"

function ForgotPasswordForm() {
  const { mutate, isPending } = useForgotPassword()

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  })

  const onSubmit = (values: ForgotPasswordData) => {
    mutate(values, {
      onError: (error) => {
        if (!error.fieldErrors) return
        Object.entries(error.fieldErrors).forEach(([key, message]) => {
          form.setError(key as keyof ForgotPasswordData, {
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={isPending}
                    placeholder="name@company.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" disabled={isPending} className="w-full">
            {isPending ? "Loading..." : "Send Reset Link"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ForgotPasswordForm
