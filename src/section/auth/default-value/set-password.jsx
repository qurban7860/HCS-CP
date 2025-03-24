import { useMemo } from 'react'

/**
 * Returns the default values for setting password
 * @param {Object} verifiedInvite - Verified user data object.
 * @returns {Object} - The default values object.
 */
export function useSetPasswordDefaultValues(verifiedInvite) {
 return useMemo(() => {
  return {
   fullName       : '',
   customerName   : verifiedInvite?.customerName || '',
   contactName    : verifiedInvite?.contactName || '',
   login          : verifiedInvite?.login || '',
   email          : verifiedInvite?.email || '',
   phone          : verifiedInvite?.phone || '',
   password       : '',
   confirmPassword: ''
  }
 }, [verifiedInvite])
}
