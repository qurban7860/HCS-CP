import { KEY } from 'constant'

/**
 * Returns the role name based on the provided role object.
 *
 * @param {Object} role - The role object.
 * @param {string} role.name - The name of the role.
 * @returns {string} - Returns 'Admin' if the role name is 'CUSTOMER_ADMIN', otherwise returns 'User' or an empty string.
 */
export const roleCoverUp = role => {
 if (!role || !role.name) return ''
 return role.name === KEY.CUSTOMER_ADMIN ? 'Admin' : 'User'
}
