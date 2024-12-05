import { useMemo, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAuthContext } from 'auth/use-auth-context'

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
 const ROUTE_TITLES = {
  // auth
  '/auth/login': 'Log in',
  '/auth/register': 'Register',
  '/auth/reset-password': 'Reset Password',
  '/auth/new-password': 'New Password',
  // dashboard
  '/dashboard': 'Dashboard',
  '/dashboard/app': 'Dashboard',
  '/dashboard/permission-denied': 'Permission Denied',
  // home
  '/home': 'Home',
  // security
  '/security/users/profile': user ? user.displayName : 'User Profile',
  // product
  '/products/machines': 'Machines List',
  '/products/machines/:id/view': 'Machine Details',
  '/products/machines/:id/logs': 'Machine Logs',
  '/products/machines/:id/graphs': 'Machine Graphs',
  '/products/machines/:id/support': 'Machine Support',
  // crm
  '/crm/customers': 'Customer List',
  '/crm/customers/:id/view': 'Organization Overview',
  '/crm/customers/:id/contacts': 'Organization Contacts',
  '/crm/customers/:id/sites': 'Organization Sites',
  '/crm/customers/:id/support': 'Organization Support Tickets ',
  // support
  '/support/tickets': 'Support Tickets',
  // log
  '/logs/machine': 'Machine Logs',
  // fallback
  default: 'Howick Portal'
 }

 const matchRoute = pathname => {
  const dynamicRoutes = [
   { pattern: /^\/products\/machines\/[^/]+\/view$/, title: 'Machine Details' },
   { pattern: /^\/products\/machines\/[^/]+\/logs$/, title: 'Machine Logs' },
   { pattern: /^\/products\/machines\/[^/]+\/graphs$/, title: 'Machine Graphs' },
   { pattern: /^\/products\/machines\/[^/]+\/support$/, title: 'Machine Support' },
   { pattern: /^\/crm\/customers\/[^/]+\/view$/, title: 'Customer Details' },
   { pattern: /^\/crm\/customers\/[^/]+\/contacts$/, title: 'Customer Contacts' },
   { pattern: /^\/crm\/customers\/[^/]+\/sites$/, title: 'Customer Sites' },
   { pattern: /^\/crm\/customers\/[^/]+\/support$/, title: 'Customer Support' }
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

 //  const pageTitle = useMemo(() => {
 //   const pathname = window.location.pathname
 //   return matchRoute(pathname)
 //  }, [window.location.pathname])

 useEffect(() => {
  const pageTitle = matchRoute(location.pathname)
  document.title = `${pageTitle}  •  ${title}`
 }, [location.pathname, title])

 const pageTitle = 'Howick Portal'
 const fullTitle = window.location.pathname === '/' ? pageTitle : `${title} • ${pageTitle}`

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
