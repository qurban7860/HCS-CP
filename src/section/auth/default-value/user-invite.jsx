import { useMemo } from 'react'
import { parseAddress } from 'util'

/**
 * Returns the default values for user invite
 * @param {Object} userLocale - The customer data object.
 * @returns {Object} - The default values object.
 */
export function useUserInviteDefaultValues(customer, machines) {
 return useMemo(() => {
  return {
   customerName: customer?.name,
   contactPersonName: '',
   address: parseAddress(customer?.mainSite?.address),
   country: customer?.mainSite?.address?.country || '',
   email: '',
   machineSerialNos: machines.map(machine => machine.serialNo || ''),
   phoneNumber: (customer?.mainSite?.phoneNumbers[0] && '+' + customer?.mainSite?.phoneNumbers[0]?.countryCode + customer?.mainSite?.phoneNumbers[0]?.contactNumber) || '',
   customerNote: ''
  }
 }, [customer])
}
