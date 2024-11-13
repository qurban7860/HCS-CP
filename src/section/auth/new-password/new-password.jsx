import { NewPasswordForm } from 'section/auth/new-password'
import { AuthGateway } from 'section/auth'
import { GLOBAL } from 'global'

export default function NewPassword() {
 return (
  <AuthGateway title={GLOBAL.APP_BRANDING}>
   <NewPasswordForm />
  </AuthGateway>
 )
}
