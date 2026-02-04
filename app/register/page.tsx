import AuthLayout from "@/components/shared/layouts/auth-layout"

function RegisterPage() {
  return (
    <AuthLayout
      left={<div>Information & image</div>}
      right={<div>Form</div>}
      variant="primary"
      formPosition="right"
    />
  )
}

export default RegisterPage
