import { SetPasswordForm } from 'section/auth/set-password'
import { AuthGateway } from 'section/auth'
import { GLOBAL } from 'global'

export default function SetPassword() {
 return (
  <AuthGateway title={GLOBAL.APP_BRANDING} isWideForm>
   <SetPasswordForm />
  </AuthGateway>
 )
}
