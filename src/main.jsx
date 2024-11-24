import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from 'auth/auth-provider'
import App from 'root'
import * as serviceWorkerRegistration from './sw-registration'
import reportWebVitals from './report-web-vital'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
 <React.StrictMode>
  <AuthProvider>
   <App />
  </AuthProvider>
 </React.StrictMode>
)

serviceWorkerRegistration.unregister()
reportWebVitals()
