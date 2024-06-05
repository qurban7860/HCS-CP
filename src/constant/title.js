import KEY from './key'

const TITLE = {
  UNDERDEVELOPMENT: 'Under Development',
  // @root - ResetPasswordPage - forgot password
  FORGOT_PASSWORD: 'Forgot your password?',
  CHECK_EMAIL: 'Check your E-mail',
  FORGOT_DESC: 'Enter your email address below and we will send you instructions on how to reset your password.',
  FORGOT_RETURN: 'Return to sign in',
  FORGOT_REQUEST: 'Send Request',
  // @root -MachineViewForm - site location
  NO_SITELOC: 'No site location was provided',
  NOT_PROVIDED: 'Not Provided',
  // @machine - MachineList
  MACHINE_LIST: 'MACHINE LIST',
  CUSTOMER_LIST: 'CUSTOMER LIST',
  ORGANIZATIONS: 'Organizations',
  // :contact
  // @user - UserProfile - user
  PERSONAL_INFO: 'Personal Information',
  KEY_DETAILS: 'Key Details',
  PROFILE: 'Profile',
  ACCESSIBILITY: 'Accessiblity',
  // @machine - MachineViewForm - machine
  MACHINE_KEY_DETAILS: 'Key Details',
  MACHINE_INFO: 'Machine Information',
  SITE_INFO: 'Site Information',
  ADDRESS_INFO: 'Address Information',
  HOWICK_RESOURCES: 'Howick Resources',
  MACHINE: 'Machine',
  // @root - AccountPopover - settings drawer
  DISPLAY_SETTING: 'Display setting',
  LANGUAGE: 'Language',
  CUSTOMIZE: 'Customize',
  LOGOUT: 'Logout',
  MODE: (mode) => {
    return {
      title: 'Mode',
      tooltip: `Toggle ${mode === KEY.LIGHT ? KEY.DARK : KEY.LIGHT} mode`
    }
  },
  CONTRAST: 'Contrast',
  ORGANIZATION: 'Organization',
  CONSTRAST: {
    title: 'Contrast',
    tooltip: 'Toggle contrast mode'
  },
  FULLSCREEN: {
    title: 'Fullscreen',
    tooltip: 'Toggle fullscreen mode'
  }
}

export default TITLE
