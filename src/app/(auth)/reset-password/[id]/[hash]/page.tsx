import Logo from "@/src/components/shared/logo"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card"
import Link from "next/link"
import { IoArrowBack } from "react-icons/io5"
import ResetPasswordForm from "../../reset-password.form"

function ResetPassword() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 p-5">
      <div className="absolute top-5 left-5">
        <Logo />
      </div>

      <Card className="w-full md:max-w-md">
        <CardHeader className="mb-4 flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-semibold">Reset Password</h1>
          <p className="text-center text-sm text-gray-500 md:text-base">
            Please choose a new password of your account to ensure security.
          </p>
        </CardHeader>

        <CardContent>
          <ResetPasswordForm />
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

export default ResetPassword
