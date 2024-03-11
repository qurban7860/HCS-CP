import { LoginLayout } from 'layout/login'
import { GLOBAL } from 'global'
import AuthLoginForm from './auth-login-form'

export default function Login() {
  return (
    <LoginLayout title={GLOBAL.APP_BRANCH}>
      <AuthLoginForm />
    </LoginLayout>
  )
}
