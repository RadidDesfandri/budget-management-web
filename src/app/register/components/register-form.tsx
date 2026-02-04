"use client"

import { Button } from "@/src/components/ui/button"
import { Checkbox } from "@/src/components/ui/checkbox"
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
import Link from "next/link"
import { useForm } from "react-hook-form"
import { registerSchema } from "../register-schema"
import { RegisterData } from "../register-type"

const RegisterForm = () => {
  //   const { mutate, isPending } = useRegister()

  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      terms: false
    }
  })

  const onSubmit = (values: RegisterData) => {
    // mutate(values)
    //
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <Form {...form}>
      <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
      <p className="text-muted-foreground mb-8 text-sm">Start managing your team budget today.</p>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="e.g. Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="name@company.com" {...field} />
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
                    type="password"
                    //   disabled={isPending}
                    placeholder="Enter your password"
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
                    //   disabled={isPending}
                    placeholder="Re-enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field, fieldState }) => (
              <FormItem className="flex items-start">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>

                <div className="space-y-1 leading-none">
                  <FormLabel>I accept the terms and conditions</FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="mt-5 space-y-4">
          <Button type="submit" size="lg" className="w-full">
            Create Account
          </Button>

          {/* <div className="relative flex items-center py-2">
            <div className="grow border-t border-gray-200" />
            <span className="mx-4 shrink-0 text-xs font-medium text-gray-400">
              Or continue with
            </span>
            <div className="grow border-t border-gray-200"></div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            size="lg"
            onClick={() => toast.info("In development")}
          >
            <FcGoogle />
            Sign up with Google
          </Button> */}

          <p className="text-muted-foreground text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}

export default RegisterForm
