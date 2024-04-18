import PropTypes from 'prop-types'
import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuthContext from './use-auth-context'
// components
import { LoadingScreen } from 'component/loading-screen'
import { Login } from 'page/auth'

AuthGuard.propTypes = {
  children: PropTypes.node
}

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuthContext()
  const { pathname } = useLocation()

  const [requestedLocation, setRequestedLocation] = useState(null)

  if (!isInitialized) {
    return <LoadingScreen />
  }
  // TODO: use context
  // if (!isAuthenticated) {
  //   if (pathname !== requestedLocation) {
  //     setRequestedLocation(pathname)
  //   }
  //   return <Login />
  // }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null)
    return <Navigate to={requestedLocation} />
  }

  return <> {children} </>
}
