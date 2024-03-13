import { Suspense, lazy } from 'react'
import { LoadingScreen } from 'component/loading-screen'

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )

// AUTH
export const LoginPage = Loadable(lazy(() => import('page/auth/login')))
export const RegisterPage = Loadable(lazy(() => import('page/auth/register')))
export const VerifyCodePage = Loadable(lazy(() => import('page/auth/verify-code')))
export const NewPasswordPage = Loadable(lazy(() => import('page/auth/new-password')))
export const ResetPasswordPage = Loadable(lazy(() => import('page/auth/reset-password')))
export const Login = Loadable(lazy(() => import('section/auth/login')))

// DASHBOARD: GENERAL
export const LandingPage = Loadable(lazy(() => import('page/landing/landing')))
export const GeneralAppPage = Loadable(lazy(() => import('page/dashboard/general-app')))
export const MachineByCountriesViewForm = Loadable(
  lazy(() => import('page/dashboard/machine-country-viewform'))
)
export const MachineByModelViewForm = Loadable(
  lazy(() => import('page/dashboard/machine-model-viewform'))
)
export const MachineByYearViewForm = Loadable(
  lazy(() => import('page/dashboard/machine-year-viewform'))
)
// User Invitations List
export const { UserInvitationList } = Loadable(lazy(() => import('page/security')))
export const { UserInvitationView } = Loadable(lazy(() => import('page/security')))

// DASHBOARD: SETTINGS
export const Setting = Loadable(lazy(() => import('page/setting/setting')))

export const HomePage = Loadable(lazy(() => import('page/dashboard/general-app')))

// BLANK PAGE
export const BlankPage = Loadable(lazy(() => import('page/dashboard/blank')))

// fallback
export const PermissionDeniedPage = Loadable(lazy(() => import('page/fallback/permission-denied')))
export const InternalServerPage = Loadable(lazy(() => import('page/fallback/internal-server')))
export const ForbiddenPage = Loadable(lazy(() => import('page/fallback/forbidden')))
export const NotFoundPage = Loadable(lazy(() => import('page/fallback/not-found')))
export const FallbackPage = Loadable(lazy(() => import('page/fallback/fallback')))
export const UserInviteLandingPage = Loadable(lazy(() => import('page/fallback/user-invite')))
