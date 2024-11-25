import { useMemo } from 'react'
import { fDate, parseAddress } from 'util'

/**
 * Generates default values for a contact object.
 * @param {Object} contact - The contact object.
 * @param {Object} customer - The customer object.
 * @returns {Object} - The default values for the contact object.
 */
export default function useContactDefaultValues(contact, customer) {
 return useMemo(() => {
  return {
   id: contact?._id || '',
   firstName: contact?.firstName || '',
   lastName: contact?.lastName || '',
   fullName: contact?.firstName && contact?.lastName ? `${contact.firstName} ${contact.lastName}` : '',
   email: contact?.email || '',
   title: contact?.title || '',
   customer: customer || null,
   customerName: contact?.customer?.name || '',
   customerId: contact?.customer?._id || '',
   customerCountry: customer?.mainSite?.address?.country || '',
   department: contact?.department || '',
   address: parseAddress(contact?.address) || '',
   street: contact?.address?.street || '',
   suburb: contact?.address?.suburb || '',
   postCode: contact?.address?.postCode || '',
   region: contact?.address?.region || '',
   city: contact?.address?.city || '',
   state: contact?.address?.state || '',
   country: contact?.address?.country || '',
   phone: contact?.phone || '',
   phoneNumbers: contact?.phoneNumbers || [],
   formerEmployee: contact?.formerEmployee || false,
   archivedByCustomer: contact?.archivedByCustomer || false,
   isActive: contact?.isActive || false,
   isArchived: contact?.isArchived || false,
   contactTypes: contact?.contactTypes,
   createdAt: fDate(contact?.createdAt) || '',
   updatedAt: fDate(contact?.updatedAt) || '',
   createdBy: contact?.createdBy?.name || '',
   updatedBy: contact?.updatedBy?.name || '',
   createdIP: contact?.createdIP || '',
   updatedIP: contact?.updatedIP || ''
  }
 }, [contact])
}
