import AuthLayout from "@/src/components/shared/layouts/auth-layout"
import LoginForm from "./components/login-form"
import LoginInformation from "./components/login-information"

function LoginPage() {
  return (
    <AuthLayout
      left={<LoginInformation />}
      right={<LoginForm />}
      variant="secondary"
      formPosition="right"
    />
  )
}

export default LoginPage
