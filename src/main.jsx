import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'root'
import * as serviceWorkerRegistration from './sw-registration'
import reportWebVitals from './report-web-vital'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

serviceWorkerRegistration.unregister()
reportWebVitals()
