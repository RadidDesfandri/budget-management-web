import Logo from "@/src/components/shared/logo"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card"
import Link from "next/link"
import { IoArrowBack } from "react-icons/io5"
import { MdLockReset } from "react-icons/md"
import ForgotPasswordForm from "./components/forgot-password.form"

function ForgotPassword() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 p-5">
      <div className="absolute top-5 left-5">
        <Logo />
      </div>

      <Card className="w-full md:max-w-md">
        <CardHeader className="mb-4 flex flex-col items-center justify-center gap-4">
          <div className="text-primary w-fit rounded-full bg-blue-50 p-3">
            <MdLockReset className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-semibold">Forgot Password?</h1>
          <p className="text-center text-sm text-gray-500 md:text-base">
            No worries, it happens. Enter your email and <br /> we&apos;ll send you reset
            instructions.
          </p>
        </CardHeader>

        <CardContent>
          <ForgotPasswordForm />
        </CardContent>

        <CardFooter className="border-t">
          <Button variant="outline" className="w-full" size="lg" asChild>
            <Link href="/login">
              <IoArrowBack />
              Back to log in
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <p className="text-center text-xs text-gray-500">
        © {new Date().getFullYear()} BudgetFlow. Need help?{" "}
        <span className="text-primary cursor-pointer">Contact Support</span>
      </p>
    </div>
  )
}

export default ForgotPassword
