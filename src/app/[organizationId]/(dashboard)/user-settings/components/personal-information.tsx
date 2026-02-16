"use client"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Separator } from "@/src/components/ui/separator"
import { useAuth } from "@/src/context/auth-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useEditUser } from "../user-setting.api"
import { editProfileSchema } from "../user-setting.schema"
import { EditProfileData } from "../user-setting.type"

function PersonalInformation() {
  const { user } = useAuth()
  const { mutate, isPending: isEditPending } = useEditUser()

  const form = useForm<EditProfileData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: ""
    }
  })

  useEffect(() => {
    if (user?.name) {
      form.reset({
        name: user.name
      })
    }
  }, [user?.name, form])

  const onSubmit = (values: EditProfileData) => {
    mutate(values, {
      onError: (error) => {
        if (!error.fieldErrors) return

        Object.entries(error.fieldErrors).forEach(([key, message]) => {
          form.setError(key as keyof EditProfileData, {
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
            <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isEditPending}
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <Label>Email Address</Label>
              <Input type="email" disabled placeholder="name@company.com" value={user?.email} />
            </FormItem>
          </CardContent>

          <CardFooter className="justify-end">
            <Button disabled={!form.formState.isDirty || isEditPending} type="submit">
              {isEditPending ? "Saving..." : "Save changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default PersonalInformation
