import { PATH_SECURITY } from 'route/path'

const OPTION = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: PATH_SECURITY.users.profile,
  },
  {
    label: 'Change Password',
    linkTo: PATH_SECURITY.users.password,
  },
]

export default OPTION
