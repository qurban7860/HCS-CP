import { useMemo } from 'react'
import { fDate, parseAddress } from 'util'

/**
 * Generates default values for a site object.
 * @param {Object} site - The site object.
 * @param {Object} customer - The customer object.
 * @returns {Object} - The default values for the site object.
 */
export default function useSiteDefaultValues(site, customer) {
 return useMemo(() => {
  return {
   id: site?._id || '',
   name: site?.name || '',
   customer: customer || null,
   customerName: site?.customer?.name || '',
   customerId: site?.customer?._id || '',
   customerMainSiteId: customer?.mainSite?._id || '',
   customerCountry: customer?.mainSite?.address?.country || '',
   address: parseAddress(site?.address) || '',
   street: site?.address?.street || '',
   suburb: site?.address?.suburb || '',
   postCode: site?.address?.postCode || '',
   region: site?.address?.region || '',
   city: site?.address?.city || '',
   state: site?.address?.state || '',
   country: site?.address?.country || '',
   phone: site?.phoneNumbers || '',
   website: site?.website || '',
   primaryTechnicalContact: site?.primaryTechnicalContact || '',
   primaryTechnicalContactId: site?.primaryTechnicalContact?._id || '',
   primaryTechnicalContactFullName: site?.primaryTechnicalContact ? `${site.primaryTechnicalContact.firstName} ${site.primaryTechnicalContact.lastName}` : '',
   primaryBillingContact: site?.primaryBillingContact || '',
   primaryBillingContactId: site?.primaryBillingContact?._id || '',
   primaryBillingContactFullName: site?.primaryBillingContact ? `${site.primaryBillingContact.firstName} ${site.primaryBillingContact.lastName}` : '',
   lat: site?.lat || '',
   long: site?.long || '',
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
