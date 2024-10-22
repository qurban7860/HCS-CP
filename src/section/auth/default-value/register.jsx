import { useMemo } from 'react'
import { fDate, parseAddress } from 'util'

/**
 * Returns the default values for register
 * @param {Object} userLocale - The customer data object.
 * @returns {Object} - The default values object.
 */
export default function registerDefaultValues(userLocale) {
 return useMemo(() => {
  return {
   customerName: '',
   contactName: '',
   address: '',
   country: userLocale,
   email: '',
   phone: { type: 'Work', countryCode: userLocale.phone, number: '' },
   machines: []
  }
 }, [userLocale])
}
