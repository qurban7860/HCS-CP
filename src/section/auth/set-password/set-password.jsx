import { SetPasswordForm, SetPasswordLayout } from 'section/auth/set-password'
import { GLOBAL } from 'global'

export default function SetPassword() {
 return (
  <SetPasswordLayout title={GLOBAL.APP_BRANDING}>
   <SetPasswordForm />
  </SetPasswordLayout>
 )
}
