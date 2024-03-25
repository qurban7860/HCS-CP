import 'locale/i18n'
// import 'util/mapboxgl'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-quill/dist/quill.snow.css'
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { LocalizationProvider } from '@mui/x-date-pickers'
import ErrorBoundary from 'util/error-boundary'
import Router from 'route'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from 'theme'
import { ThemeLocalization } from 'locale'
import { SnackbarProvider } from 'component/snackbar'
import { ScrollToTop } from 'component/scroll-to-top'
import { MotionLazyContainer } from 'component/animate'
import { ThemeSettings, SettingProvider } from 'component/setting'
import { IdleManager } from 'component/idle-manager'
import { Fallback } from 'page/fallback'
import { AuthProvider } from 'auth/jwt-context'
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
    <AuthProvider>
      <HelmetProvider>
        <SettingProvider>
          <BrowserRouter>
            <MotionLazyContainer>
              <ThemeProvider>
                <ThemeSettings>
                  <ErrorBoundary fallback={<Fallback {...FALLBACK.INTERNAL_SERVER_ERROR} />}>
                    <ScrollToTop />
                    <ThemeLocalization>
                      <SnackbarProvider>
                        {/* <StyledChart /> */}
                        {/* <IdleManager /> */}
                        <Router />
                      </SnackbarProvider>
                    </ThemeLocalization>
                  </ErrorBoundary>
                </ThemeSettings>
              </ThemeProvider>
            </MotionLazyContainer>
          </BrowserRouter>
        </SettingProvider>
      </HelmetProvider>
    </AuthProvider>
    // </LocalizationProvider>
    //   </PersistGate>
    // </WebSocketProvider>
  )
}

export default App
