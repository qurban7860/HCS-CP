import { useMemo } from 'react'
import { fDate, parseAddress } from 'util'

/**
 * Generates default values for a site object.
 * @param {Object} site - The site object.
 * @param {Object} customer - The customer object.
 * @returns {Object} - The default values for the site object.
 */
export default function siteDefaultValues(site, customer) {
  return useMemo(() => {
    return {
      id: site?._id || '',
      firstName: site?.firstName || '',
      lastName: site?.lastName || '',
      fullName: site?.firstName && site?.lastName ? `${site.firstName} ${site.lastName}` : '',
      email: site?.email || '',
      title: site?.title || '',
      customer: customer || null,
      customerName: site?.customer?.name || '',
      customerId: site?.customer?._id || '',
      customerCountry: customer?.mainSite?.address?.country || '',
      address: parseAddress(site?.address) || '',
      street: site?.address?.street || '',
      suburb: site?.address?.suburb || '',
      postCode: site?.address?.postCode || '',
      region: site?.address?.region || '',
      city: site?.address?.city || '',
      state: site?.address?.state || '',
      country: site?.address?.country || '',
      phone: site?.phone || '',
      phoneNumbers: site?.phoneNumbers || [],
      formerEmployee: site?.formerEmployee || false,
      archivedByCustomer: site?.archivedByCustomer || false,
      isActive: site?.isActive || false,
      isArchived: site?.isArchived || false,
      contactTypes: site?.contactTypes,
      createdAt: fDate(site?.createdAt) || '',
      updatedAt: fDate(site?.updatedAt) || '',
      createdBy: site?.createdBy?.name || '',
      updatedBy: site?.updatedBy?.name || '',
      createdIP: site?.createdIP || '',
      updatedIP: site?.updatedIP || ''
    }
  }, [site])
}
