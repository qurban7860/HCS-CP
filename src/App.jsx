import 'locale/i18n'
// import 'util/mapboxgl'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-quill/dist/quill.snow.css'
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'

import { store, persistor } from 'store'
import Router from 'route'
import { WebSocketProvider } from 'auth/websocket-provider'
import { ThemeProvider } from 'theme'
import { ThemeLocalization } from 'locale'
import { ThemeSettings, SettingProvider, SnackProvider } from 'hook'
import { Fallback } from 'page/fallback'
import { IdleManager, ChartStyleOverlay } from 'component'
import { ScrollToTop } from 'component/scroll-to-top'
import { MotionLazyContainer } from 'component/animate'
import ErrorBoundary from 'util/error-boundary'
import { FALLBACK } from 'constant'

function App() {
 return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
   <WebSocketProvider>
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <SettingProvider>
       <BrowserRouter>
        <HelmetProvider>
         <MotionLazyContainer>
          <ThemeProvider>
           <ThemeSettings>
            <ErrorBoundary fallback={<Fallback {...FALLBACK.INTERNAL_SERVER_ERROR} />}>
             <ScrollToTop />
             <ThemeLocalization>
              <SnackProvider>
               <ChartStyleOverlay />
               <IdleManager />
               <Router />
              </SnackProvider>
             </ThemeLocalization>
            </ErrorBoundary>
           </ThemeSettings>
          </ThemeProvider>
         </MotionLazyContainer>
        </HelmetProvider>
       </BrowserRouter>
      </SettingProvider>
     </PersistGate>
    </Provider>
   </WebSocketProvider>
  </LocalizationProvider>
 )
}

export default App
