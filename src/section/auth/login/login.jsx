import { LoginLayout } from 'section/auth/login'
import { GLOBAL } from 'global'
import LoginForm from './login-form'

export default function Login() {
  return (
    <LoginLayout title={GLOBAL.APP_BRANDING}>
      <LoginForm />
    </LoginLayout>
  )
}
