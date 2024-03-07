import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { PATH_DASHBOARD } from 'route/path'
import { LoadingScreen } from 'component/loading-screen'
import { useAuthContext } from 'auth'

GuestGuard.propTypes = {
  children: PropTypes.node,
}

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuthContext()

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />
  }

  if (!isInitialized) {
    return <LoadingScreen />
  }

  return <> {children} </>
}
