import { Fragment } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { AuthGuard, GuestGuard, RoleBasedGuard } from 'auth'
import DashboardLayout from 'section/dashboard'
import { PATH_AFTER_LOGIN } from 'global'
import { FALLBACK, KEY } from 'constant'
import {
 // landing:
 LandingPage,
 // auth:
 LoginPage,
 RegisterPage,
 SetPasswordPage,
 ResetPasswordPage,
 NewPasswordPage,
 UserInvitePage,
 // home:
 HomePage,
 // dashboard: general
 DashboardPage,
 // security:
 UserListPage,
 UserProfilePage,
 // product:
 MachinePage,
 MachinesListPage,
 MachinesLogsPage,
 MachinesGraphsPage,
 MachineSupportTicketsPage,
 //  crm:
 CustomerPage,
 CustomerListPage,
 ContactPage,
 SitePage,
 CustomerSupportTicketsPage,
 // support:
 TicketsListPage,
 TicketCreatePage,
 TicketViewPage,
 // log:
 LogListPage,
 // fallback:
 BlankPage,
 FallbackPage
} from './element'

export default function Router() {
 const AdminRoles = ['Admin', KEY.CUSTOMER_ADMIN]

 return (
  <Fragment>
   {/* {helmet.helmetComponent} */}
   {useRoutes([
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
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'new-password/:token/:userId', element: <NewPasswordPage /> },
      { path: 'login-unprotected', element: <LoginPage /> },
      {
       path: 'user-invite',
       element: (
        <AuthGuard>
         <RoleBasedGuard hasContent roles={AdminRoles}>
          <DashboardLayout />
         </RoleBasedGuard>
        </AuthGuard>
       ),
       children: [{ element: <UserInvitePage />, index: true }]
      },
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
      { path: 'app', element: <DashboardPage /> },
      { path: 'permission-denied', element: <FallbackPage {...FALLBACK.FORBIDDEN} /> },
      { path: 'blank', element: <BlankPage /> }
     ]
    },
    {
     // home
     path: 'home',
     element: (
      <AuthGuard>
       <DashboardLayout />
      </AuthGuard>
     ),
     children: [{ element: <HomePage />, index: true }]
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
         path: 'list',

         element: (
          <RoleBasedGuard hasContent roles={AdminRoles}>
           <UserListPage />
          </RoleBasedGuard>
         )
        },
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
         path: ':id/logs',
         children: [
          {
           element: <MachinesLogsPage />,
           index: true
          }
         ]
        },
        { path: ':id/graphs', element: <MachinesGraphsPage /> },
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
      { path: 'tickets', children: [
        { element: <TicketsListPage />, index: true },
        { path: 'create', element: <TicketCreatePage /> },
        { path: ':id/view', element: <TicketViewPage />}
      ]
      },
      {
       element: <FallbackPage {...FALLBACK.UNDER_DEVELOPMENT} />,
       children: [
        // { path: 'password', element: <ChangePasswordPage /> },
       ]
      }
     ]
    },
    {
     // logs
     path: 'logs',
     element: (
      <AuthGuard>
       <DashboardLayout />
      </AuthGuard>
     ),
     children: [
      { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
      { path: 'machine', element: <LogListPage /> },
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
    { path: 'invite/:id/:code/:expiry', element: <SetPasswordPage /> },
    { path: '500', element: <FallbackPage {...FALLBACK.INTERNAL_SERVER_ERROR} /> },
    { path: '403', element: <FallbackPage {...FALLBACK.FORBIDDEN} /> },
    { path: '404', element: <FallbackPage {...FALLBACK.NOT_FOUND} /> },
    { path: '400', element: <FallbackPage {...FALLBACK.INVALID_REQUEST} /> },
    { path: 'invitation-expired', element: <FallbackPage {...FALLBACK.INVITATION_EXPIRED} /> },
    { path: '*', element: <Navigate to='/404' replace /> }
   ])}
  </Fragment>
 )
}
