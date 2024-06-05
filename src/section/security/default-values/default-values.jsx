import { useMemo } from 'react'
import { fDate } from 'util'

const _getImage = (image) => {
  return `/asset/image/${image}.png`
}

/**
 * Returns the default values for a user.
 * @param {Object} user - The user object.
 * @returns {Object} - The default values object.
 */
export default function userDefaultValues(user, customer) {
  return useMemo(() => {
    return {
      badge: _getImage('customer-portal'),
      customer: user?.customer || null,
      customerId: user?.customer?._id || '',
      customerName: user?.customer?.name || '',
      customerCountry: customer?.mainSite?.address?.country || '',
      contact: user?.contact || null,
      contactId: user?.contact?._id || '',
      contactFirstName: user?.contact?.firstName || '',
      contactLastName: user?.contact?.lastName || '',
      contactFullName: user?.contact?.firstName && user?.contact?.lastName ? `${user.contact.firstName} ${user.contact.lastName}` : '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      fullName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
      name: user?.name || '',
      phone: user?.phone || '+64 ',
      email: user?.email || '',
      loginEmail: user?.login || '',
      roles: user?.roles || [],
      dataAccessibilityLevel: user?.dataAccessibilityLevel || 'FILTER',
      regions: user?.regions || [],
      customers: user?.customers || [],
      machines: user?.machines || [],
      isActive: user?.isActive,
      multiFactorAuthentication: user?.multiFactorAuthentication,
      currentEmployee: user?.currentEmployee,
      createdAt: fDate(user?.createdAt) || '',
      updatedAt: fDate(user?.updatedAt) || '',
      createdBy: user?.createdBy?.name || '',
      updatedBy: user?.updatedBy?.name || '',
      createdIP: user?.createdIP || '',
      updatedIP: user?.updatedIP || ''
    }
  }, [user])
}
