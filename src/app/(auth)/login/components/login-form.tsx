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

function LoginForm() {
  const { mutate, isPending } = useLogin()
  const [checkedPassword, setCheckedPassword] = useState<boolean>(false)

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: LoginData) => {
    mutate(values, {
      onError: (error) => {
        if (!error.fieldErrors) return

        Object.entries(error.fieldErrors).forEach(([key, message]) => {
          form.setError(key as keyof LoginData, {
            type: "server",
            message
          })
        })
      }
    })
  }

  return (
    <Form {...form}>
      <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
      <p className="text-muted-foreground mb-10 text-sm">
        Please enter your details to access your dashboard.
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
            {isPending ? "Loading..." : "Log In"}
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
