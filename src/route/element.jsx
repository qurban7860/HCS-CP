import { Suspense, lazy } from 'react'
import { LoadingScreen } from 'component/loading-screen'

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )

// auth
export const LoginPage = Loadable(lazy(() => import('page/auth/login')))
export const RegisterPage = Loadable(lazy(() => import('page/auth/register')))
export const VerifyCodePage = Loadable(lazy(() => import('page/auth/verify-code')))
export const NewPasswordPage = Loadable(lazy(() => import('page/auth/new-password')))
export const ResetPasswordPage = Loadable(lazy(() => import('page/auth/reset-password')))
export const Login = Loadable(lazy(() => import('section/auth/login')))

// dashboard: general
export const LandingPage = Loadable(lazy(() => import('page/landing/landing')))
export const GeneralAppPage = Loadable(lazy(() => import('page/dashboard/general-app')))

// machine
export const MachinePage = Loadable(lazy(() => import('page/product/machine/machine')))
export const MachinesListPage = Loadable(lazy(() => import('page/product/machines/machines')))

// customer
export const CustomerPage = Loadable(lazy(() => import('page/crm/customer/customer')))
export const CustomerListPage = Loadable(lazy(() => import('page/crm/customers/customers')))
// contact
export const ContactPage = Loadable(lazy(() => import('page/crm/contact/contact')))
// site
export const SitePage = Loadable(lazy(() => import('page/crm/site/site')))

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
