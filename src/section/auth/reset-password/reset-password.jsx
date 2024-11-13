import { ResetPasswordForm, ResetPasswordLayout } from 'section/auth/reset-password'
import { GLOBAL } from 'global'

export default function ResetPassword() {
 return (
  <ResetPasswordLayout title={GLOBAL.APP_BRANDING}>
   <ResetPasswordForm />
  </ResetPasswordLayout>
 )
}
