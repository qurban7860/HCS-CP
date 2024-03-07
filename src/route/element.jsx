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

// // CUSTOMER
// export const { CustomerDashboard } = Loadable(lazy(() => import('page/customer')))
// export const { CustomerEdit } = Loadable(lazy(() => import('page/customer')))
// export const { CustomerView } = Loadable(lazy(() => import('page/customer')))

// // SITE
// export const { SiteAdd } = Loadable(lazy(() => import('page/customer/site')))
// export const { SiteEdit } = Loadable(lazy(() => import('page/customer/site')))
// export const { SiteView } = Loadable(lazy(() => import('page/customer/site')))

// // CONTACT
// export const { ContactAdd } = Loadable(lazy(() => import('page/customer/contact')))
// export const { ContactEdit } = Loadable(lazy(() => import('page/customer/contact')))
// export const { ContactView } = Loadable(lazy(() => import('page/customer/contact')))

// // NOTE
// export const { NoteAddForm } = Loadable(lazy(() => import('page/customer/note')))
// export const { NoteEditForm } = Loadable(lazy(() => import('page/customer/note')))
// export const { NoteViewForm } = Loadable(lazy(() => import('page/customer/note')))

// // DASHBOARD: USER
// export const { SecurityUserProfile } = Loadable(lazy(() => import('page/security')))
// export const { SecurityUserProfileEditForm } = Loadable(lazy(() => import('page/security')))
// export const { SecurityUserChangePassword } = Loadable(lazy(() => import('page/security')))
// export const { SecurityUserChangePasswordByAdmin } = Loadable(lazy(() => import('page/security')))
// export const { SecurityUserList } = Loadable(lazy(() => import('page/security')))
// export const { SecurityUserAdd } = Loadable(lazy(() => import('page/security')))
// export const { SecurityUserEdit } = Loadable(lazy(() => import('page/security')))
// export const { SecurityUserViewForm } = Loadable(lazy(() => import('page/security')))

// // SECURITY USERS ROLES
// export const { RoleAdd } = Loadable(lazy(() => import('page/security/role')))
// export const { RoleEdit } = Loadable(lazy(() => import('page/security/role')))
// export const { RoleView } = Loadable(lazy(() => import('page/security/role')))

// //----------------------------------------------------------------

// // Machine
// export const { MachineSetting } = Loadable(lazy(() => import('page/machine')))
// export const { MachineAdd } = Loadable(lazy(() => import('page/machine')))
// export const { MachineList } = Loadable(lazy(() => import('page/machine')))
// export const { MachineView } = Loadable(lazy(() => import('page/machine')))
// export const { MachineEdit } = Loadable(lazy(() => import('page/machine')))

// // // Signin Logs
// export const { SignInLogList } = Loadable(lazy(() => import('page/security')))

// User Invitations List
export const { UserInvitationList } = Loadable(lazy(() => import('page/security')))
export const { UserInvitationView } = Loadable(lazy(() => import('page/security')))

// User Blocked Customers
// export const { BlockedCustomerList } = Loadable(lazy(() => import('page/security/config')))
// export const { BlockedCustomerAddForm } = Loadable(lazy(() => import('page/security/config')))

// // User Blocked Users
// export const { BlockedUserList } = Loadable(lazy(() => import('page/security')))
// export const { BlockedUserAddForm } = Loadable(lazy(() => import('page/security')))

// // Blacklist IP
// export const { BlacklistIPList } = Loadable(lazy(() => import('page/security')))
// export const { BlacklistIPAddForm } = Loadable(lazy(() => import('page/security')))

// // Whitelist IP
// export const { WhitelistIPList } = Loadable(lazy(() => import('page/security')))
// export const { WhitelistIPAddForm } = Loadable(lazy(() => import('page/security')))

// // License
// // export const MachineLicenses = Loadable(lazy(()=> import('../pages/machine/License/MachineLicenses')));
// // export const LicenseList = Loadable(lazy(()=> import('../pages/machine/License/LicenseList')));

// // Machine Category Groups
// export const { CategoryGroupAddForm } = Loadable(lazy(() => import('page/machine')))
// export const { CategoryGroupList } = Loadable(lazy(() => import('page/machine')))
// export const { CategoryGroupViewForm } = Loadable(lazy(() => import('page/machine')))
// export const { CategoryGroupEditForm } = Loadable(lazy(() => import('page/machine')))

// // Machine Categories
// export const { CategoryAddForm } = Loadable(lazy(() => import('page/machine')))
// export const { CategoryList } = Loadable(lazy(() => import('page/machine/Categories')))
// export const { CategoryView } = Loadable(lazy(() => import('page/machine/Categories')))
// export const { CategoryViewForm } = Loadable(lazy(() => import('page/machine/Categories')))
// export const { CategoryEdit } = Loadable(lazy(() => import('page/machine/Categories')))
// export const { CategoryEditForm } = Loadable(lazy(() => import('page/machine/Categories')))

// // Machine Tools
// export const { ToolAddForm } = Loadable(lazy(() => import('page/machine/Tool')))
// export const { ToolList } = Loadable(lazy(() => import('page/machine/Tool')))
// export const { ToolView } = Loadable(lazy(() => import('page/machine/Tool')))
// export const { ToolViewForm } = Loadable(lazy(() => import('page/machine/Tool')))
// export const { ToolEdit } = Loadable(lazy(() => import('page/machine/Tool')))
// export const { ToolEditForm } = Loadable(lazy(() => import('page/machine/Tool')))

// // Machine Model
// export const { ModelViewForm } = Loadable(lazy(() => import('page/machine')))
// export const { ModelView } = Loadable(lazy(() => import('page/machine')))

// export const { ServiceRecordConfigList } = Loadable(lazy(() => import('page/machine')))
// export const { ServiceRecordConfigView } = Loadable(lazy(() => import('page/machine')))
// export const { ServiceRecordConfigViewForm } = Loadable(lazy(() => import('page/machine')))

// // Configuration
// export const { ConfigurationView } = Loadable(lazy(() => import('page/machine')))

// DASHBOARD: Email
// export const { Email } = Loadable(lazy(() => import('page/email')))

// DASHBOARD: SETTINGS
export const Setting = Loadable(lazy(() => import('page/setting/setting')))

export const HomePage = Loadable(lazy(() => import('page/dashboard/general-app')))

// BLANK PAGE
export const BlankPage = Loadable(lazy(() => import('page/dashboard/blank')))

// TEST RENDER PAGE BY ROLE
export const PermissionDeniedPage = Loadable(lazy(() => import('page/fallback/permission-denied')))
export const InternalServerPage = Loadable(lazy(() => import('page/fallback/internal-server')))
export const ForbiddenPage = Loadable(lazy(() => import('page/fallback/forbidden')))
export const NotFoundPage = Loadable(lazy(() => import('page/fallback/not-found')))
// export const { ComingSoonPage } = Loadable(lazy(() => import('page/fallback/coming-soon')))
// export const { MaintenancePage } = Loadable(lazy(() => import('page/fallback/maintenance')))
export const UserInviteLandingPage = Loadable(lazy(() => import('page/fallback/user-invite')))
