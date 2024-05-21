import { sub } from 'date-fns'
import { useMemo } from 'react'
import { fDate, parseAddress } from 'util'

export default function customerDefaultValues(customerData, ext) {
  return useMemo(() => {
    return {
      id: customerData?._id || '',
      code: customerData?.clientCode || '',
      name: customerData?.name || '',
      ref: customerData?.ref || '',
      website: customerData?.mainSite?.website || '',
      tradingName: customerData?.tradingName || '',
      contacts: customerData?.contacts || [],
      accountManager: customerData?.accountManager || [],
      projectManager: customerData?.projectManager || [],
      supportManager: customerData?.supportManager || [],
      mainSite: customerData?.mainSite || null,
      address: parseAddress(customerData?.address) || '',
      street: customerData?.mainSite?.address?.street || '',
      suburb: customerData?.mainSite?.address?.suburb || '',
      postCode: customerData?.mainSite?.address?.postCode || '',
      region: customerData?.mainSite?.address?.region || '',
      city: customerData?.mainSite?.address?.city || '',
      state: customerData?.mainSite?.address?.state || '',
      country: customerData?.mainSite?.address?.country || '',
      primaryBillingContact: customerData?.primaryBillingContact || null,
      primaryTechnicalContact: customerData?.primaryTechnicalContact || null,
      isFinancialCompany: customerData?.isFinancialCompany,
      excludeReports: customerData?.excludeReports || false,
      isActive: customerData?.isActive,
      supportSubscription: customerData?.supportSubscription,
      machines: ext || [],
      createdAt: fDate(customerData?.createdAt) || '',
      updatedAt: fDate(customerData?.updatedAt) || '',
      createdBy: customerData?.createdBy?.name || '',
      updatedBy: customerData?.updatedBy?.name || '',
      createdIP: customerData?.createdIP || '',
      updatedIP: customerData?.updatedIP || ''
    }
  }, [customerData])
}
