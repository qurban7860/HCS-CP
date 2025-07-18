import { useLocation } from 'react-router-dom'
import { useSettingContext } from 'hook'
import useResponsive from 'hook/use-responsive'
import { GlobalStyles } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { RADIUS } from 'config/layout'
import { ASSET } from 'config/asset-directory'
import { KEY } from 'constant'

function GlobalStyle() {
 const { themeMode } = useSettingContext()
 const location = useLocation()
 const theme = useTheme()
 const isMobile = useResponsive('down', 'sm')
 const isRootPage = location.pathname === '/'

 const inputGlobalStyle = (
  <GlobalStyles
   styles={{
    '*': {
     boxSizing: 'border-box',
     borderRadius: RADIUS.BORDER.borderRadius,
     scrollBehavior: 'smooth',
     scrollbarWidth: 'thin'
    },
    html: {
     margin: 0,
     padding: 0,
     width: '100%',
     //  height: '100vh',
     WebkitOverflowScrolling: 'touch'
    },
    body: {
     backgroundImage: themeMode === KEY.LIGHT ? (isRootPage ? null : `url(${ASSET.BG_STROKE_LIGHTGREY_LOGO})`) : isRootPage ? null : `url(${ASSET.BG_STROKE_BRONZE_LOGO})`,
     backgroundSize: isMobile ? '250%' : '150%',
     backgroundColor: alpha(theme.palette.background.default, 0.2),
     backgroundRepeat: 'no-repeat',
     backgroundPositionY: 'center',
     backgroundPositionX: 'left',
     backgroundOpacity: 0.2,
     backgroundAttachment: 'fixed',
     margin: 0,
     padding: 0,
     width: '100%',
     height: '100vh'
    },
    '#root': {
     width: '100%'
    },
    input: {
     '&[type=number]': {
      MozAppearance: 'textfield',
      '&::-webkit-outer-spin-button': {
       margin: 0,
       WebkitAppearance: 'none'
      },
      '&::-webkit-inner-spin-button': {
       margin: 0,
       WebkitAppearance: 'none'
      }
     }
    },
    img: {
     display: 'block',
     maxWidth: '100%'
    },
    ul: {
     margin: 0,
     padding: 0
    }
   }}
  />
 )

 return inputGlobalStyle
}

export default GlobalStyle
