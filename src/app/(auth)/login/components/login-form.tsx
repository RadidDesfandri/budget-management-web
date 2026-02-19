"use client"

import { useForm } from "react-hook-form"
import { LoginData } from "../login.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../login.schema"
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
import Link from "next/link"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Label } from "@/src/components/ui/label"
import { useState } from "react"
import { useLogin } from "../login.api"
import { useSearchParams } from "next/navigation"
import { useGetVerifyTokenInvitation } from "@/src/app/invitation/accept/invitation-accept.api"

function LoginForm() {
  const { mutate, isPending } = useLogin()
  const [checkedPassword, setCheckedPassword] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const tokenInvitation = searchParams.get("token")
  const redirectPath = searchParams.get("redirect")

  const { data: invitationData, isLoading: isVerifyingToken } = useGetVerifyTokenInvitation(
    tokenInvitation || ""
  )

  const invitation = invitationData?.data

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: LoginData) => {
    mutate(
      {
        ...values,
        redirectTo:
          redirectPath && tokenInvitation ? `${redirectPath}?token=${tokenInvitation}` : undefined
      },
      {
        onError: (error) => {
          if (!error.fieldErrors) return

          Object.entries(error.fieldErrors).forEach(([key, message]) => {
            form.setError(key as keyof LoginData, {
              type: "server",
              message
            })
          })
        }
      }
    )
  }

  return (
    <Form {...form}>
      {tokenInvitation && (
        <div className="mb-6">
          {isVerifyingToken ? (
            <div className="bg-muted flex items-center gap-2 rounded-lg px-4 py-3">
              <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
              <p className="text-muted-foreground text-sm">Verifying invitation...</p>
            </div>
          ) : invitation ? (
            <div className="bg-primary/5 border-primary/20 rounded-lg border px-4 py-3">
              <p className="text-primary text-sm font-semibold">You have a pending invitation!</p>
              <p className="text-muted-foreground mt-1 text-sm">
                <span className="text-foreground font-medium capitalize">
                  {invitation.invited_by.name}
                </span>{" "}
                invited you to join{" "}
                <span className="text-foreground font-medium">{invitation.organization.name}</span>{" "}
                as <span className="text-foreground font-medium capitalize">{invitation.role}</span>
                . Login to accept the invitation.
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-semibold text-red-600">Invalid or expired invitation</p>
              <p className="mt-1 text-sm text-red-500">
                This invitation link is no longer valid. Please request a new invitation.
              </p>
            </div>
          )}
        </div>
      )}

      <h1 className="text-3xl font-bold tracking-tight">
        {invitation ? "Login to Accept Invitation" : "Welcome Back"}
      </h1>
      <p className="text-muted-foreground mb-10 text-sm">
        {invitation
          ? `Sign in to your account to join ${invitation.organization.name}.`
          : "Please enter your details to access your dashboard."}
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={checkedPassword ? "text" : "password"}
                    disabled={isPending}
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="show-password"
                checked={checkedPassword}
                onCheckedChange={(value) => setCheckedPassword(!!value)}
              />
              <Label htmlFor="show-password">Show Password</Label>
            </div>

            <Link href="/forgot-password" className="text-primary text-sm font-medium">
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="mt-5 space-y-5">
          <Button disabled={isPending} type="submit" size="lg" className="w-full">
            {isPending ? "Loading..." : invitation ? "Login & Accept Invitation" : "Log In"}
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
