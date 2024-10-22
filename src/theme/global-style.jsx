import { useSettingContext } from 'hook'
import useResponsive from 'hook/use-responsive'
import { GlobalStyles } from '@mui/material'
import { ASSET } from 'config'
import { KEY } from 'constant'

function GlobalStyle() {
 const { themeMode } = useSettingContext()
 const isMobile = useResponsive('down', 'sm')
 const inputGlobalStyle = (
  <GlobalStyles
   styles={{
    '*': {
     boxSizing: 'border-box',
     borderRadius: 0.4,
     scrollBehavior: 'smooth',
     scrollbarWidth: 'thin'
    },
    html: {
     margin: 0,
     padding: 0,
     width: '100%',
     WebkitOverflowScrolling: 'touch'
    },
    body: {
     //  backgroundImage: themeMode === KEY.LIGHT ? `url(${ASSET.BG_LOGO})` : `url(${ASSET.BG_DARK_LOGO})`,
     backgroundRepeat: 'no-repeat',
     backgroundPositionY: 'center',
     backgroundPositionX: 'right',
     backgroundSize: '50%',
     backgroundOpacity: 0.9,
     backgroundAttachment: 'fixed',
     margin: 0,
     padding: 0,
     width: '100%',
     height: '100vh'
    },
    '#root': {
     width: '100%'
     //  height: '100vh'
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
