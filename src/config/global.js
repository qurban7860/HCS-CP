import { PATH_DASHBOARD } from 'route/path'

export const GLOBAL = {
 APP_TITLE: 'Howick Portal',
 APP_BRANCH: 'HOWICK PORTAL',
 APP_BRANDING: 'Portal',
 APP_TAGLINE: 'Shaping the World of Construction',
 APP_CUSTOMER_TAGLINE: 'The Portal for convenient & efficient machine management, update and support.',
 APP_NAME: import.meta.env.VITE_NAME,
 SERVER_URL: import.meta.env.VITE_SERVER_URL,
 SERVER_DEV_URL: import.meta.env.VITE_SERVER_DEV_URL,
 SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
 ENV: import.meta.env.VITE_ENV,
 VERSION: import.meta.env.VITE_APP_VERSION,
 SERVER_VERSION: import.meta.env.VITE_APP_SERVER_VERSION,
 DEV_COLOR: import.meta.env.VITE_DEV_COLOR,
 TEST_COLOR: import.meta.env.VITE_TEST_COLOR,
 LIVE_COLOR: import.meta.env.VITE_LIVE_COLOR,
 JIRA_URL: 'https://howickltd.atlassian.net/jira/servicedesk/projects/HWKSC/queues/custom/3/',
 JIRA_PRIORITY_ICON_URL: import.meta.env.VITE_APP_PRIORITY_ICON_URL,
 MESSAGE_REGISTER_USER: import.meta.env.VITE_MESSAGE_REGISTER_USER,
 MESSAGE_LOGIN_USER: import.meta.env.VITE_MESSAGE_LOGIN_USER,
 GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
 IDLE_TIME: import.meta.env.VITE_APP_IDLE_TIME,
 PRIVACY_POLICY_URL: import.meta.env.VITE_PRIVACY_POLICY_URL,
 WEBSITE: import.meta.env.VITE_WEBSITE_URL
}

export const HOST_API_KEY = import.meta.env.VITE_HOST_API_KEY || ''

export const COGNITO_API = {
 userPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID,
 clientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID
}

export const AUTH0_API = {
 clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
 domain: import.meta.env.VITE_AUTH0_DOMAIN
}

export const MAP_API = import.meta.env.VITE_MAPBOX_API

export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app // as '/dashboard/app'
