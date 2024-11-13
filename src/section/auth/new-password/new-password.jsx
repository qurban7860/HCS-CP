import { NewPasswordForm, NewPasswordLayout } from 'section/auth/new-password'
import { GLOBAL } from 'global'

export default function NewPassword() {
 return (
  <NewPasswordLayout title={GLOBAL.APP_BRANDING}>
   <NewPasswordForm />
  </NewPasswordLayout>
 )
}
