import { Suspense, lazy } from 'react'
import { FramingLoader, HowickLoader } from 'component'

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
export const NewPasswordPage = Loadable(lazy(() => import('page/auth/new-password')))
export const SetPasswordPage = Loadable(lazy(() => import('page/auth/set-password')))
export const UserInvitePage = Loadable(lazy(() => import('page/auth/user-invite')))
export const Login = Loadable(lazy(() => import('section/auth/login')))
// home
export const HomePage = Loadable(lazy(() => import('page/home/home')))
// dashboard
export const DashboardPage = Loadable(lazy(() => import('page/dashboard/dashboard')))
export const LandingPage = Loadable(lazy(() => import('page/landing/landing')))
// machine
export const MachineModuleLayout = Loadable(lazy(() => import('section/product/machine/machine-layout')))
export const MachinePage = Loadable(lazy(() => import('page/product/machine/machine')))
export const MachinesListPage = Loadable(lazy(() => import('page/product/machines/machines')))
export const MachinesLogsPage = Loadable(lazy(() => import('page/product/machine-logs/machine-logs')))
export const MachinesGraphsPage = Loadable(lazy(() => import('page/product/machine-graphs/machine-graphs')))
// machine-documents 
export const MachineDocuments = Loadable(lazy(() => import('page/product/machine-documents/machine-documents')))
export const MachineDrawings = Loadable(lazy(() => import('page/product/machine-drawings/machine-drawings')))
export const MachineDrawing = Loadable(lazy(() => import('page/product/machine-drawings/machine-drawing')))
export const MachineDocument = Loadable(lazy(() => import('page/product/machine-documents/machine-document')))
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
// log
export const LogList = Loadable(lazy(() => import('section/log/logs/logs-section')))
export const LogGraph = Loadable(lazy(() => import('section/log/erp/graph/graphs-section')))
export const FullScreenGraph = Loadable(lazy(() => import('section/log/erp/graph/graph-page')))
// support
export const TicketsListPage = Loadable(lazy(() => import('page/support/tickets/tickets')))
export const TicketCreatePage = Loadable(lazy(() => import('page/support/ticket/ticket-create')))
export const TicketViewPage = Loadable(lazy(() => import('page/support/ticket/ticket-view')))
// user
export const UserListPage = Loadable(lazy(() => import('page/security/users/users')))
export const UserProfilePage = Loadable(lazy(() => import('page/security/user/user')))
// blanks
export const BlankPage = Loadable(lazy(() => import('page/dashboard/blank')))
// fallback
export const FallbackPage = Loadable(lazy(() => import('page/fallback/fallback')))
