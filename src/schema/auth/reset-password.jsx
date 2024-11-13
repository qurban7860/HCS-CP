import * as yup from 'yup'

export const ResetPasswordSchema = yup.object().shape({
 email: yup.string().required('Email is required').email('Email must be a valid email address')
})
