import * as yup from 'yup'

export const ChangePasswordSchema = yup.object().shape({
 oldPassword: yup.string().required('Old Password is required'),
 newPassword: yup
  .string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
  .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
  .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
  .matches(/^(?=.*[!@#$%^&*])/, 'Must contain at least one special character')
  .required('Password is required'),
 confirmNewPassword: yup
  .string()
  .required('Password needs to be confirmed')
  .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
})
