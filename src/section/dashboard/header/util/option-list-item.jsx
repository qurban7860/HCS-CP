import { PATH_CUSTOMER, PATH_SECURITY } from 'route/path'
import { t } from 'i18next'

const OPTION = user => [
 {
  label: t('organization.label'),
  linkTo: PATH_CUSTOMER.customers.view(user?.customer)
 },
 {
  label: t('profile.label'),
  linkTo: PATH_SECURITY.users.profile
 }
]

export default OPTION
