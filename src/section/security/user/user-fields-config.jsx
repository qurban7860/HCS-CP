import { PATH_CUSTOMER } from 'route/path'
import { KEY } from 'constant'

export const fieldsUserConfig = [
 {
  type: 'title',
  key: 'personalInformation',
  title: 'personal_information.label'
 },
 {
  key: 'name',
  heading: 'name.label',
  value: defaultValues => defaultValues?.name,
  truncate: 50,
  gridSize: 6
 },
 {
  key: 'phone',
  heading: 'phone_number.label',
  value: defaultValues => defaultValues?.phone,
  gridSize: 6
 },
 {
  key: 'email',
  heading: 'email.label',
  value: defaultValues => defaultValues?.email,
  gridSize: 6
 },
 {
  key: 'username',
  heading: 'username.label',
  value: defaultValues => defaultValues?.username,
  gridSize: 6
 },
 {
  type: 'link',
  key: 'customerName',
  heading: 'organization.label',
  value: defaultValues => defaultValues?.customerName,
  additionalProps: (defaultValues, handleCustomerDialog, themeMode) => ({
   country: defaultValues?.customerCountry,
   customerLink: PATH_CUSTOMER.customers.view(defaultValues?.customerId)
  }),
  linkProps: {
   country: defaultValues => defaultValues?.customerCountry,
   href: '#',
   underline: 'none',
   color: themeMode => (themeMode === KEY.LIGHT ? 'howick.midBlue' : 'howick.orange'),
   onClick: (event, customerId, handleCustomerDialog) => handleCustomerDialog(event, customerId)
  },
  truncate: 21
 }
]
