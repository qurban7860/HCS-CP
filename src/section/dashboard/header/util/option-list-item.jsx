import { PATH_SECURITY } from 'route/path'

const OPTION = (t) => [
  {
    label: t('profile.label'),
    linkTo: PATH_SECURITY.users.profile
  },
  {
    label: t('change_password.label'),
    linkTo: PATH_SECURITY.users.password
  }
]

export default OPTION
