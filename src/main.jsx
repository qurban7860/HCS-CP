import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { AuthProvider, WebSocketProvider } from 'auth'
import * as serviceWorkerRegistration from './sw-registration'
import reportWebVitals from './report-web-vital'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <AuthProvider>
            <WebSocketProvider>
                <App />
            </WebSocketProvider>
        </AuthProvider>
    </React.StrictMode>
)

serviceWorkerRegistration.unregister()
reportWebVitals()
