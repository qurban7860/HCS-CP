import { RegisterForm } from 'section/auth/register'
import { AuthGateway } from 'section/auth'
import { GLOBAL } from 'global'

export default function Register() {
 return (
  <AuthGateway title={GLOBAL.APP_BRANDING} isWideForm>
   <RegisterForm />
  </AuthGateway>
 )
}
