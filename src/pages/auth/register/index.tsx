import AuthLayout from "@/layouts/auth/auth-layout"
import { RegisterForm } from "@/layouts/auth/register-form"

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm/>
    </AuthLayout>
  )
}
