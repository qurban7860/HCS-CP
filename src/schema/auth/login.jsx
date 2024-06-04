import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .transform((value, originalValue) => (originalValue ? originalValue.toLowerCase() : value))
    .email()
    .label('Login / Email Address')
    .trim()
    .required('Login / Email address is Required!')
    .max(200),
  password: Yup.string().label('Password').required('Password is Required!')
})
