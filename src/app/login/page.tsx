import AuthLayout from "@/src/components/shared/layouts/auth-layout"

function LoginPage() {
  return (
    <AuthLayout
      left={<div>Information & image</div>}
      right={<div>Form</div>}
      variant="secondary"
      formPosition="right"
    />
  )
}

export default LoginPage
