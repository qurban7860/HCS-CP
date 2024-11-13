import { ResetPasswordForm } from 'section/auth/reset-password'
import { AuthGateway } from 'section/auth'
import { GLOBAL } from 'global'

export default function ResetPassword() {
 return (
  <AuthGateway title={GLOBAL.APP_BRANDING}>
   <ResetPasswordForm />
  </AuthGateway>
 )
}
