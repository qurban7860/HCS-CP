import { useMemo } from 'react'

/**
 * Returns the default values for register
 * @param {Object} userLocale - The customer data object.
 * @returns {Object} - The default values object.
 */
export function useRegisterDefaultValues(userLocale) {
 return useMemo(() => {
  return {
   customerName: '',
   contactPersonName: '',
   address: '',
   country: userLocale,
   email: '',
   machineSerialNos: [],
   phoneNumber: '',
   customerNote: ''
  }
 }, [userLocale])
}
