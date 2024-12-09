import { useMemo } from 'react'
import { parseAddress } from 'util'

/**
 * Returns the default values for user invite
 * @param {Object} userLocale - The customer data object.
 * @returns {Object} - The default values object.
 */
export function useUserInviteDefaultValues(customer) {
 return useMemo(() => {
  return {
   customer: customer,
   contact: null,
   name: '',
   phone: '',
   email: '',
   password: '',
   confirmPassword: '',
   roles: [],
   multiFactorAuthentication: false
  }
 }, [customer])
}
