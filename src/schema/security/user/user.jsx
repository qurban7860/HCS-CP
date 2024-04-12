import * as Yup from 'yup'

export const editUserSchema = Yup.object().shape({
  customer: Yup.object().required().label('Customer').nullable(),
  contact: Yup.object().nullable().label('Contact'),
  name: Yup.string().required().max(200).label('Full Name'),
  phone: Yup.string().label('Phone Number'),
  email: Yup.string().email().label('Email Address').required().trim().max(200),
  loginEmail: Yup.string().email().label('Login Email Address').trim().max(200),
  roles: Yup.array().nullable().label('Roles'),
  regions: Yup.array().nullable(),
  customers: Yup.array().nullable(),
  machines: Yup.array().nullable(),
  isActive: Yup.boolean(),
  multiFactorAuthentication: Yup.boolean(),
  currentEmployee: Yup.boolean()
})
