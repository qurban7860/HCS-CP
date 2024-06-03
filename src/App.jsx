import 'locale/i18n'
// import 'util/mapboxgl'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-quill/dist/quill.snow.css'
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from 'store'
import ErrorBoundary from 'util/error-boundary'
import Router from 'route'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from 'theme'
import { ThemeLocalization } from 'locale'
import { ThemeSettings, SettingProvider, SnackProvider } from 'hook'
import { ScrollToTop } from 'component/scroll-to-top'
import { MotionLazyContainer } from 'component/animate'
import { IdleManager } from 'component/idle-manager'
import { Fallback } from 'page/fallback'
import { AuthProvider } from 'auth/auth-provider'
import { WebSocketProvider } from 'auth/web-socket-context'
import { GLOBAL } from 'config'
import { FALLBACK } from 'constant'

function App() {
  useEffect(() => {
    document.title = GLOBAL.APP_TITLE
  }, [])

  return (
    // <WebSocketProvider>
    //   <PersistGate loading={null} persistor={persistor}>
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Provider store={store}>
      <AuthProvider>
        <HelmetProvider>
          <PersistGate loading={null} persistor={persistor}>
            <SettingProvider>
              <BrowserRouter>
                <MotionLazyContainer>
                  <ThemeProvider>
                    <ThemeSettings>
                      <ErrorBoundary fallback={<Fallback {...FALLBACK.INTERNAL_SERVER_ERROR} />}>
                        <ScrollToTop />
                        <ThemeLocalization>
                          <SnackProvider>
                            {/* <StyledChart /> */}
                            {/* <IdleManager /> */}
                            <Router />
                          </SnackProvider>
                        </ThemeLocalization>
                      </ErrorBoundary>
                    </ThemeSettings>
                  </ThemeProvider>
                </MotionLazyContainer>
              </BrowserRouter>
            </SettingProvider>
          </PersistGate>
        </HelmetProvider>
      </AuthProvider>
    </Provider>
    // </LocalizationProvider>
    //   </PersistGate>
    // </WebSocketProvider>
  )
}

export default App
