import { Navigate, useRoutes } from 'react-router-dom'
import { AuthGuard, GuestGuard } from 'auth'
import SimpleLayout from 'layout/simple'
import CompactLayout from 'layout/compact'
import DashboardLayout from 'layout/dashboard'
import { PATH_AFTER_LOGIN } from 'global'
import { FALLBACK } from 'constant'
import {
  // Landing:
  LandingPage,
  // Auth:
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  NewPasswordPage,
  ResetPasswordPage,
  // Dashboard: General
  GeneralAppPage,
  MachineByModelViewForm,
  MachineByYearViewForm,
  MachineByCountriesViewForm,
  // Fallback:
  BlankPage,
  PermissionDeniedPage,
  FallbackPage,
  UserInviteLandingPage,
} from './element'

export default function Router() {
  return useRoutes([
    {
      // Auth
      path: 'auth',
      children: [
        {
          path: 'login',
          element: <GuestGuard>{<LoginPage />}</GuestGuard>,
        },
        {
          path: 'authenticate',
          element: <GuestGuard>{/* <Authenticate /> */}</GuestGuard>,
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            {
              path: 'new-password/:token/:userId',
              element: <NewPasswordPage />,
            },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      // Dashboard
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralAppPage /> },
        { path: 'machineByCountries', element: <MachineByCountriesViewForm /> },
        { path: 'machineByModels', element: <MachineByModelViewForm /> },
        { path: 'machineByYears', element: <MachineByYearViewForm /> },
        { path: 'permission-denied', element: <PermissionDeniedPage /> },
        { path: 'blank', element: <BlankPage /> },
      ],
    },
    {
      // Email
      path: 'email',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        // { path: 'list', element: <Email /> },
        // { path: ':id/view', element: <Emailviewform /> },
      ],
    },
    {
      // Main Routes
      element: <LandingPage />,
      children: [{ element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true }],
    },
    {
      element: <SimpleLayout />,
      children: [],
    },
    { path: 'invite/:id/:code/:expiry', element: <UserInviteLandingPage /> },
    { path: '500', element: <FallbackPage {...FALLBACK.INTERNAL_SERVER_ERROR} /> },
    { path: '403', element: <FallbackPage {...FALLBACK.FORBIDDEN} /> },
    { path: '404', element: <FallbackPage {...FALLBACK.NOT_FOUND} /> },
    {
      element: <CompactLayout />,
      children: [
        // { path: 'coming-soon', element: <ComingSoonPage /> },
        // { path: 'maintenance', element: <MaintenancePage /> },
        {
          path: 'invalidErrorPage',
          // element: <ErrorPage title="Invalid Code" />,
        },
        {
          path: 'expiredErrorPage',
          // element: <ErrorPage title="Invitation Expired" />,
        },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ])
}
