import AuthLayout from "@/layouts/auth/auth-layout"
import { LoginForm } from "@/layouts/auth/login-form"

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm/>
    </AuthLayout>
  )
}
