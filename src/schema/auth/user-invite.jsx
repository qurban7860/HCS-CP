import * as yup from 'yup'

export const UserInviteSchema = yup.object().shape({
 customer: yup.object().required().label('Customer').nullable(),
 contact: yup.object().required().nullable().label('Contact'),
 name: yup.string().required().max(200).label('Full Name'),
 phone: yup.string().label('Phone Number'),
 email: yup
  .string()
  .transform(value => value?.toLowerCase())
  .email()
  .label('Email Address')
  .required()
  .trim()
  .max(200),
 loginEmail: yup
  .string()
  .transform(value => value?.toLowerCase())
  .email()
  .label('Log in /  Email Address')
  .trim()
  .max(200),
 roles: yup.array().min(1, 'Please select at least one role').nullable().label('Roles').required(),
 machines: yup.array().nullable(),
 multiFactorAuthentication: yup.boolean(),
 currentEmployee: yup.boolean()
})
