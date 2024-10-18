import { RegisterLayout } from 'section/auth/register'
import { GLOBAL } from 'global'
import RegisterForm from './register-form'

export default function Register() {
  return (
    <RegisterLayout title={GLOBAL.APP_BRANDING}>
      <RegisterForm />
    </RegisterLayout>
  )
}
