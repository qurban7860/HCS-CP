import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './use-auth-context'
import { PATH_PAGE } from 'route/path'

function RoleBasedGuard({ hasContent, roles, children }) {
 const { user } = useAuthContext()
 const navigate = useNavigate()

 useEffect(() => {
  if (user && user.roles) {
   const userRoleNames = user.roles.map(role => role.name)
   const hasAccess = roles?.some(role => userRoleNames?.includes(role))
   if (!hasAccess) {
    navigate(PATH_PAGE[403])
   }
  }
 }, [roles, user, navigate])

 return <Fragment> {children} </Fragment>
}

export default RoleBasedGuard

RoleBasedGuard.propTypes = {
 children: PropTypes.node,
 hasContent: PropTypes.bool,
 roles: PropTypes.arrayOf(PropTypes.string)
}
