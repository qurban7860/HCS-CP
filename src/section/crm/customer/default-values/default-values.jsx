import { useMemo } from 'react'
import { fDate, parseAddress } from 'util'

/**
 * Returns the default values for a customer.
 * @param {Object} customerData - The customer data object.
 * @param {Array} machines - The machines array.
 * @returns {Object} - The default values object.
 */
export default function useCustomerDefaultValues(customerData, machines, contacts) {
 return useMemo(() => {
  return {
   id                     : customerData?._id || '',
   customer               : customerData || '',
   code                   : customerData?.clientCode || '',
   name                   : customerData?.name || '',
   ref                    : customerData?.ref || '',
   website                : customerData?.mainSite?.website || '',
   tradingName            : customerData?.tradingName || '',
   contacts               : contacts || [],
   accountManager         : customerData?.accountManager || [],
   projectManager         : customerData?.projectManager || [],
   supportManager         : customerData?.supportManager || [],
   mainSite               : customerData?.mainSite || null,
   customerMainSiteId     : customerData?.mainSite?._id || '',
   address                : parseAddress(customerData?.mainSite?.address) || '',
   street                 : customerData?.mainSite?.address?.street || '',
   suburb                 : customerData?.mainSite?.address?.suburb || '',
   postCode               : customerData?.mainSite?.address?.postCode || '',
   region                 : customerData?.mainSite?.address?.region || '',
   city                   : customerData?.mainSite?.address?.city || '',
   state                  : customerData?.mainSite?.address?.state || '',
   country                : customerData?.mainSite?.address?.country || '',
   lat                    : customerData?.mainSite?.address?.lat || '',
   long                   : customerData?.mainSite?.address?.long || '',
   primaryBillingContact  : customerData?.primaryBillingContact || null,
   primaryTechnicalContact: customerData?.primaryTechnicalContact || null,
   isFinancialCompany     : customerData?.isFinancialCompany,
   excludeReports         : customerData?.excludeReports || false,
   isActive               : customerData?.isActive,
   supportSubscription    : customerData?.supportSubscription,
   machines               : machines || [],
   createdAt              : fDate(customerData?.createdAt) || '',
   updatedAt              : fDate(customerData?.updatedAt) || '',
   createdBy              : customerData?.createdBy?.name || '',
   updatedBy              : customerData?.updatedBy?.name || '',
   createdIP              : customerData?.createdIP || '',
   updatedIP              : customerData?.updatedIP || ''
  }
 }, [customerData])
}
