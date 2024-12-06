import * as yup from 'yup'
import { REGEX } from 'constant'

const serialNoRegEx = new RegExp(REGEX.SERIAL_NO)

export const UserInviteSchema = yup.object().shape({
 customerName: yup.string().required('Organization name is required'),
 contactPersonName: yup.string().required('Contact name is required'),
 address: yup.string(),
 email: yup.string().email('Invalid email format').required('Email is required'),
 machineSerialNos: yup.array().of(yup.string().matches(serialNoRegEx, 'Invalid serial number').length(5, 'Serial number must be 5 characters long')).min(1, 'At least one machine is required'),
 phoneNumber: yup.string(),
 country: yup.string().label('Country').nullable(),
 customerNote: yup.string().max(500, 'Customer note must be less than 500 characters')
})
