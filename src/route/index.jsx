import { Navigate, useRoutes } from 'react-router-dom'
import { AuthGuard, GuestGuard } from 'auth'
import DashboardLayout from 'section/dashboard'
import { useSettingContext } from 'hook'
import { CustomerLayout } from 'section/crm/customer'
import { PATH_AFTER_LOGIN } from 'global'
import { FALLBACK } from 'constant'
import {
  // landing:
  LandingPage,
  // auth:
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  ResetPasswordPage,
  // dashboard: general
  GeneralAppPage,
  // security:
  UserProfilePage,
  // product:
  MachinePage,
  MachinesListPage,
  MachineSupportTicketsPage,
  //  crm:
  CustomerPage,
  CustomerListPage,
  ContactPage,
  SitePage,
  CustomerSupportTicketsPage,
  // support:
  TicketsListPage,
  // fallback:
  BlankPage,
  FallbackPage,
  UserInviteLandingPage
} from './element'

export default function Router() {
  const { themeMode } = useSettingContext()
  return useRoutes([
    {
      // auth
      path: 'auth',
      children: [
        {
          path: 'login',
          element: <GuestGuard>{<LoginPage />}</GuestGuard>
        },
        {
          path: 'authenticate',
          element: <GuestGuard>{/* <Authenticate /> */}</GuestGuard>
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> }
      ]
    },
    {
      path: '/',
      element: <LandingPage />
    },
    {
      // dashboard
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralAppPage /> },
        { path: 'permission-denied', element: <FallbackPage {...FALLBACK.FORBIDDEN} /> },
        { path: 'blank', element: <BlankPage /> }
      ]
    },
    {
      // email
      path: 'email',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true }
        // { path: 'list', element: <Email /> },
        // { path: ':id/view', element: <Emailviewform /> },
      ]
    },
    {
      // security
      path: 'security',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'users',
          children: [
            {
              path: 'profile',
              element: <UserProfilePage />
            }
            // { path: 'password', element: <ChangePasswordPage /> },
          ]
        }
      ]
    },
    {
      // product
      path: 'products',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'machines',
          children: [
            { element: <MachinesListPage />, index: true },
            { path: ':id/view', element: <MachinePage /> },
            {
              path: ':id/support',
              children: [
                {
                  element: <MachineSupportTicketsPage />,
                  index: true
                },
                {
                  path: ':supportId/view',
                  element: <MachineSupportTicketsPage />
                }
              ]
            }
          ]
        }
      ]
    },
    {
      // crm
      path: 'crm',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'customers', // might changed to organizations later
          children: [
            { element: <CustomerListPage />, index: true },
            { path: ':id/view', element: <CustomerPage /> },
            {
              path: ':id/contacts',
              children: [
                {
                  element: <ContactPage />,
                  index: true
                },
                {
                  path: ':contactId/view',
                  element: <ContactPage />
                }
              ]
            },
            {
              path: ':id/sites',
              children: [
                {
                  element: <SitePage />,
                  index: true
                }
              ]
            },
            {
              path: ':id/support',
              children: [
                {
                  element: <CustomerSupportTicketsPage />,
                  index: true
                },
                {
                  path: ':supportId/view',
                  element: <CustomerSupportTicketsPage />
                }
              ]
            }
          ]
        }
      ]
    },
    {
      // document
      path: 'documents',
      element: (
        <AuthGuard>
          <FallbackPage {...FALLBACK.UNDER_DEVELOPMENT} />,
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'list',
          element: <FallbackPage {...FALLBACK.UNDER_DEVELOPMENT} />
        }
      ]
    },
    {
      // support (jira)
      path: 'support',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'tickets', element: <TicketsListPage /> },
        {
          element: <FallbackPage {...FALLBACK.UNDER_DEVELOPMENT} />,
          children: [
            // { path: 'password', element: <ChangePasswordPage /> },
          ]
        }
      ]
    },
    {
      // Main Routes
      element: <LandingPage />,
      children: [{ element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true }]
    },
    { path: 'invite/:id/:code/:expiry', element: <UserInviteLandingPage /> },
    { path: '500', element: <FallbackPage {...FALLBACK.INTERNAL_SERVER_ERROR} /> },
    { path: '403', element: <FallbackPage {...FALLBACK.FORBIDDEN} /> },
    { path: '404', element: <FallbackPage {...FALLBACK.NOT_FOUND} /> },
    { path: '*', element: <Navigate to="/404" replace /> }
  ])
}
