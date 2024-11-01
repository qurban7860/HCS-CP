import { Suspense, lazy } from 'react'
import { FramingLoader } from 'component'

// eslint-disable-next-line react/display-name
const Loadable = Component => props =>
 (
  <Suspense fallback={<FramingLoader />}>
   <Component {...props} />
  </Suspense>
 )

// auth
export const LoginPage = Loadable(lazy(() => import('page/auth/login')))
export const RegisterPage = Loadable(lazy(() => import('page/auth/register')))
export const VerifyCodePage = Loadable(lazy(() => import('page/auth/verify-code')))
export const ResetPasswordPage = Loadable(lazy(() => import('page/auth/reset-password')))
export const SetPasswordPage = Loadable(lazy(() => import('page/auth/set-password')))
export const Login = Loadable(lazy(() => import('section/auth/login')))

// dashboard: general
export const LandingPage = Loadable(lazy(() => import('page/landing/landing')))
export const GeneralAppPage = Loadable(lazy(() => import('page/dashboard/general-app')))

// machine
export const MachinePage = Loadable(lazy(() => import('page/product/machine/machine')))
export const MachinesListPage = Loadable(lazy(() => import('page/product/machines/machines')))
export const MachinesLogsPage = Loadable(lazy(() => import('page/product/machine-logs/machine-logs')))
export const MachinesGraphsPage = Loadable(lazy(() => import('page/product/machine-graphs/machine-graphs')))
// machine-support
export const MachineSupportTicketsPage = Loadable(lazy(() => import('page/product/support/tickets')))

// customer
export const CustomerPage = Loadable(lazy(() => import('page/crm/customer/customer')))
export const CustomerListPage = Loadable(lazy(() => import('page/crm/customers/customers')))
// contact
export const ContactPage = Loadable(lazy(() => import('page/crm/contact/contact')))
// site
export const SitePage = Loadable(lazy(() => import('page/crm/site/site')))
// customer-support
export const CustomerSupportTicketsPage = Loadable(lazy(() => import('page/crm/support/tickets')))

//log
export const LogListPage = Loadable(lazy(() => import('page/log/logs')))

// support
export const TicketsListPage = Loadable(lazy(() => import('page/support/tickets/tickets')))

// user Invitations List
export const { UserInvitationList } = Loadable(lazy(() => import('page/security/user/user')))
export const { UserInvitationView } = Loadable(lazy(() => import('page/security')))

// user
export const UserProfilePage = Loadable(lazy(() => import('page/security/user/user')))

// dashboard: settings
// export const Setting = Loadable(lazy(() => import('page/setting/setting')))
export const HomePage = Loadable(lazy(() => import('page/dashboard/general-app')))

// blanks
export const BlankPage = Loadable(lazy(() => import('page/dashboard/blank')))

// fallback
export const FallbackPage = Loadable(lazy(() => import('page/fallback/fallback')))
export const UserInviteLandingPage = Loadable(lazy(() => import('page/fallback/user-invite')))
