import { PATH_DASHBOARD } from 'route/path'

export const GLOBAL = {
  APP_TITLE: 'Howick Customer Portal',
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  APP_NAME: import.meta.env.VITE_NAME,
  ENV: import.meta.env.VITE_ENV,
  VERSION: import.meta.env.VITE_APP_VERSION,
  VERSION_COLOR: import.meta.env.VITE_BG_COLOR,
  SERVER_URL: import.meta.env.VITE_SERVER_URL,
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
  MESSAGE_REGISTER_USER: import.meta.env.VITE_MESSAGE_REGISTER_USER,
  MESSAGE_LOGIN_USER: import.meta.env.VITE_MESSAGE_LOGIN_USER,
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  IDLE_TIME: import.meta.env.VITE_IDLE_TIME,
  COMPOSITE_TOOL_CONFIG_MAX_LENGTH: (import.meta.env.COMPOSITE_TOOL_CONFIG_MAX_LENGTH = 10),
}

export const HOST_API_KEY = import.meta.env.VITE_HOST_API_KEY || ''
// console.log('APP_HOST', HOST_API_KEY);

// export const FIREBASE_API = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APPID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// }

export const COGNITO_API = {
  userPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID,
  clientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID,
}

export const AUTH0_API = {
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
}

export const MAP_API = import.meta.env.VITE_MAPBOX_API

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app // as '/dashboard/app'
