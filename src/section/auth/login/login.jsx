import { LoginForm } from 'section/auth/login'
import { AuthGateway } from 'section/auth'
import { GLOBAL } from 'global'

export default function Login() {
 return (
  <AuthGateway title={GLOBAL.APP_BRANDING}>
   <LoginForm />
  </AuthGateway>
 )
}
