"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { changePasswordSchema } from "../user-setting.schema"
import { ChangePasswordData } from "../user-setting.type"
import { Separator } from "@/src/components/ui/separator"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { useChangePassword } from "../user-setting.api"

function PasswordSecurity() {
  const { mutate, isPending } = useChangePassword()

  const form = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: ""
    }
  })

  const onSubmit = (values: ChangePasswordData) => {
    mutate(values, {
      onError: (error) => {
        if (!error.fieldErrors) return

        Object.entries(error.fieldErrors).forEach(([key, message]) => {
          form.setError(key as keyof ChangePasswordData, {
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
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Password & Security</CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isPending}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="row-start-2">
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isPending}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="row-start-2">
              <FormField
                control={form.control}
                name="new_password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isPending}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="justify-end">
            <Button type="submit" disabled={isPending || !form.formState.isDirty}>
              {isPending ? "Saving..." : "Update Password"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default PasswordSecurity
