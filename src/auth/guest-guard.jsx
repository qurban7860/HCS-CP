import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { PATH_DASHBOARD, PATH_CUSTOMER } from 'route/path'
import { FramingLoader } from 'component'
import { useAuthContext } from 'auth/use-auth-context'

GuestGuard.propTypes = {
    children: PropTypes.node
}

export default function GuestGuard({ children }) {
    const { isAuthenticated, isInitialized, user } = useAuthContext()

    if (isAuthenticated) {
        if (user?.customer)
            return <Navigate to={PATH_CUSTOMER.customers.view(user?.customer)} />
        return <Navigate to={PATH_DASHBOARD.root} />
    }

    if (!isInitialized) {
        return <FramingLoader />
    }

    return <> {children} </>
}
