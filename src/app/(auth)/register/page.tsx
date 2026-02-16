import AuthLayout from "@/src/components/shared/layouts/auth-layout"
import RegisterForm from "./components/register-form"
import RegisterInformation from "./components/register-information"

function RegisterPage() {
  return (
    <AuthLayout
      left={<RegisterInformation />}
      right={<RegisterForm />}
      variant="primary"
      formPosition="right"
    />
  )
}

export default RegisterPage
