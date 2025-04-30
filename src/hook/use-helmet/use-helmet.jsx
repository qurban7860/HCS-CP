import { useMemo, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAuthContext } from 'auth/use-auth-context'
import { useSelector } from 'react-redux'

/**
 * Custom hook to manage Helmet for setting page metadata.
 *
 * @param {Object} params - Parameters for setting Helmet data.
 * @param {string} params.title - The title of the page.
 * @param {string} [params.description] - The meta description of the page.
 * @param {string} [params.keywords] - Meta keywords for the page.
 * @param {string} [params.author] - The author of the page.
 */
export const useHelmet = (config = {}) => {
    const { user } = useAuthContext()
    const { customer } = useSelector(state => state.customer)
    const { machine } = useSelector(state => state.machine)

    const ROUTE_TITLES = {
        // auth
        '/auth/login': 'Log in',
        '/auth/register': 'Register',
        '/auth/reset-password': 'Reset Password',
        '/auth/new-password': 'New Password',
        '/auth/user-invite': 'Invite a User',
        // dashboard
        '/dashboard': 'Dashboard',
        '/dashboard/app': 'Dashboard',
        '/dashboard/permission-denied': 'Permission Denied',
        // home
        '/home': 'Home',
        // security
        '/security/users/profile': user ? user.displayName : 'User Profile',
        '/security/users/list': 'Users',
        // product
        '/products/machines': 'Machines',
        '/products/machines/:id/view': 'Machine Details',
        '/products/machines/:id/logs': 'Machine Logs',
        '/products/machines/:id/graphs': 'Machine Graphs',
        '/products/machines/:id/support': 'Machine Support',
        // crm
        '/crm/customers': 'Organizations',
        '/crm/customers/:id/view': 'Organization Overview',
        '/crm/customers/:id/contacts': 'Organization Contacts',
        '/crm/customers/:id/sites': 'Organization Sites',
        '/crm/customers/:id/support': 'Organization Support Tickets ',
        // support
        '/support/tickets': 'Support Tickets',
        // log
        '/logs/': 'Machine Logs',
        // fallback
        default: 'Howick Portal'
    }

    const matchRoute = pathname => {
        const dynamicRoutes = [
            { pattern: /^\/products\/machines\/[^/]+\/view$/, title: machine ? `${machine.serialNo} Overview` : 'Machine Overview' },
            { pattern: /^\/products\/machines\/[^/]+\/logs$/, title: machine ? `${machine.serialNo} Logs` : 'Machine Logs' },
            { pattern: /^\/products\/machines\/[^/]+\/graphs$/, title: machine ? `${machine.serialNo} Graphs` : 'Machine Graphs' },
            { pattern: /^\/products\/machines\/[^/]+\/support$/, title: machine ? `${machine.serialNo} Support Tickets` : 'Machine Support Tickets' },
            { pattern: /^\/crm\/customers\/[^/]+\/view$/, title: customer ? `${customer.name} Overview` : 'Organization Overview' },
            { pattern: /^\/crm\/customers\/[^/]+\/contacts$/, title: 'Contacts' },
            { pattern: /^\/crm\/customers\/[^/]+\/sites$/, title: 'Sites' },
            { pattern: /^\/crm\/customers\/[^/]+\/support$/, title: 'Support Tickets' },
            { pattern: /^\/security\/users\/[^/]+\/list$/, title: 'Users' }
            //    {pattern: '/' ,  title: ''}
        ]
        if (ROUTE_TITLES[pathname]) {
            return ROUTE_TITLES[pathname]
        }

        const dynamicMatch = dynamicRoutes.find(route => route.pattern.test(pathname))
        if (dynamicMatch) {
            return dynamicMatch.title
        }
        return ROUTE_TITLES.default
    }

    const { title = 'Howick Portal', description = 'Comprehensive Portal Solution' } = config

    useEffect(() => {
        const pageTitle = matchRoute(location.pathname)
        document.title = window.location.pathname === '/' ? pageTitle : `${pageTitle} • ${title}`
    }, [location.pathname, title])

    const pageTitle = 'Howick Portal'
    const fullTitle = window.location.pathname === '/' ? pageTitle : ` ${pageTitle} • ${title} `

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name='description' content={description} />
            <meta property='og:title' content={`${title} | ${pageTitle}`} />
            <meta property='og:description' content={description} />
        </Helmet>
    )
}

export default useHelmet
