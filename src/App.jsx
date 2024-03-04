// i18n
import 'locale/i18n'
// map
import 'util/mapboxgl'
import 'mapbox-gl/dist/mapbox-gl.css'
// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-quill/dist/quill.snow.css'
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
// import { PersistGate } from 'redux-persist/lib/integration/react'
// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import ErrorBoundary from 'util/error-boundary'
import Router from 'route'
// theme
import ThemeProvider from 'theme'
// locales
import { ThemeLocalization } from 'locale'
// components
// import { StyledChart } from 'component/chart'
import { SnackbarProvider } from 'component/snackbar'
import { ScrollToTop } from 'component/scroll-to-top'
import { MotionLazyContainer } from 'component/animate'
import { ThemeSettings, SettingsProvider } from 'component/setting'
import { IdleManager } from 'component/idle-manager'
import { InternalServer } from 'page/fallback'
import { AuthProvider } from 'auth/jwt-context'
import { WebSocketProvider } from 'auth/web-socket-context'
import { GLOBAL } from 'config'

function App() {
  useEffect(() => {
    document.title = GLOBAL.APP_TITLE
  }, [])

  return (
    <AuthProvider apiUrl={GLOBAL.API_URL} appTitle={GLOBAL.APP_TITLE}>
      <WebSocketProvider>
        <HelmetProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <SettingsProvider>
                  <BrowserRouter>
                    <MotionLazyContainer>
                      <ThemeProvider>
                        <ThemeSettings>
                          <ErrorBoundary fallback={<Page500 />}>
                            <ScrollToTop />
                            <ThemeLocalization>
                              <SnackbarProvider>
                                <StyledChart />
                                <IdleManager />
                                <Router />
                              </SnackbarProvider>
                            </ThemeLocalization>
                          </ErrorBoundary>
                        </ThemeSettings>
                      </ThemeProvider>
                    </MotionLazyContainer>
                  </BrowserRouter>
                </SettingsProvider>
              </LocalizationProvider>
            </PersistGate>
          </ReduxProvider>
        </HelmetProvider>
      </WebSocketProvider>
    </AuthProvider>
    // <AuthProvider>
    //   <WebSocketProvider>
    //     <HelmetProvider>
    //       <ReduxProvider store={store}>
    //         <PersistGate loading={null} persistor={persistor}>
    //           <LocalizationProvider dateAdapter={AdapterDateFns}>
    //             <SettingsProvider>
    //               <BrowserRouter>
    //                 <MotionLazyContainer>
    //                   <ThemeProvider>
    //                     <ThemeSettings>
    //                       <ErrorBoundary fallback={<Page500 />}>
    //                         <ScrollToTop />
    //                         <ThemeLocalization>
    //                           <SnackbarProvider>
    //                             <StyledChart />
    //                             <IdleManager />
    //                             <Router />
    //                           </SnackbarProvider>
    //                         </ThemeLocalization>
    //                       </ErrorBoundary>
    //                     </ThemeSettings>
    //                   </ThemeProvider>
    //                 </MotionLazyContainer>
    //               </BrowserRouter>
    //             </SettingsProvider>
    //           </LocalizationProvider>
    //         </PersistGate>
    //       </ReduxProvider>
    //     </HelmetProvider>
    //   </WebSocketProvider>
    // </AuthProvider>
  )
}

export default App
