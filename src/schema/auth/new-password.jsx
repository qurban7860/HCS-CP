import * as yup from 'yup'

export const NewPasswordSchema = yup.object().shape({
 password: yup
  .string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
  .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
  .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
  .matches(/^(?=.*[!@#$%^&*])/, 'Must contain at least one special character')
  .required('Password is required'),
 confirmPassword: yup
  .string()
  .required('Password needs to be confirmed')
  .oneOf([yup.ref('password'), null], 'Passwords must match'),
 token: yup.string().required('Token is required'),
 userId: yup.string().required('User ID is required')
})
