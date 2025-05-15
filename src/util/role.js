import { KEY } from 'constant'
import { alpha } from '@mui/material'

/**
 * Returns the role name based on the provided role object.
 *
 * @param {Object} role - The role object.
 * @param {string} role.name - The name of the role.
 * @returns {string} - Returns 'Admin' if the role name is 'CUSTOMER_ADMIN', otherwise returns 'User' or an empty string.
 */
export const roleCoverUp = role => {
    if (!role || !role.name) return ''
    return role.name === KEY.CUSTOMER_ADMIN ? 'Admin' : role.name === KEY.CUSTOMER_USER ? 'User' : role.name
}

export const isCustomerAdmin = user => user?.roles?.some(role => role?.name?.toLowerCase() === "customeradmin")
export const isSuperAdmin = user => user?.roles?.some(role => role?.name?.toLowerCase() === "superadmin")

export const roleColr = (role, theme, mode) => {
    if (!role || !role.name) return ''
    return role.name === KEY.CUSTOMER_ADMIN ? (mode === KEY.LIGHT ? theme.palette.howick.orange : theme.palette.orange.darker) : mode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[700]
}
