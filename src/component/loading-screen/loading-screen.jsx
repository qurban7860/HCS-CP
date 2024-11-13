import { Fragment } from 'react'
import { m } from 'framer-motion'
import { useAuthContext } from 'auth'
import { useLocation } from 'react-router-dom'
import { useResponsive, useSettingContext } from 'hook'
import { Box, LinearProgress } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'
import { GStyledLoadingScreenDiv } from 'theme/style'
import { LogoIcon } from 'component/logo'
import ProgressBar from '../progress-bar'
import { NAV } from 'config'
import { KEY } from 'constant'

function LoadingScreen() {
 const theme = useTheme()
 const { pathname } = useLocation()
 const isDesktop = useResponsive('up', 'lg')
 const { isInitialized } = useAuthContext()
 const { themeLayout, themeMode } = useSettingContext()
 const isDashboard = isInitialized && pathname.includes('/dashboard') && isDesktop

 const size = (themeLayout === 'mini' && NAV.W_DASHBOARD_MINI) || (themeLayout === 'vertical' && NAV.W_DASHBOARD) || 128

 return (
  <Fragment>
   <ProgressBar />
   <GStyledLoadingScreenDiv
    sx={{
     ...// isDashboard &&
     (isDesktop && {
      width: `calc(100% - ${size}px)`,
      ...(themeLayout === 'horizontal' && {
       width: 1,
       height: `calc(100% - ${size}px)`
      })
     })
    }}>
    {isDashboard ? (
     <LinearProgress
      sx={{
       backgroundColor: themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.burnIn,
       width: 1,
       maxWidth: 360
      }}
     />
    ) : (
     <Fragment>
      <m.div
       animate={{
        scale: [1, 0.9, 0.9, 1, 1],
        opacity: [1, 0.48, 0.48, 1, 1]
       }}
       transition={{
        duration: 2,
        ease: 'easeInOut',
        repeatDelay: 1,
        repeat: Infinity
       }}>
       {themeMode === KEY.LIGHT ? <LogoIcon disabledLink sx={{ width: 64, height: 64 }} /> : <LogoIcon width={64} src={NAV.LOGO_DARK} />}
      </m.div>

      <Box
       component={m.div}
       animate={{
        scale: [2, 1, 1, 2, 2],
        rotate: [270, 0, 0, 270, 270],
        // opacity: [0.25, 1, 1, 1, 0.25],
        borderRadius: ['5%', '5%', '10%', '10%', '5%']
       }}
       transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
       sx={{
        width: 30,
        height: 30,
        position: 'absolute',
        border: theme => `solid 3px ${alpha(theme.palette.grey[200], 0.24)}`
       }}
      />

      <Box
       component={m.div}
       animate={{
        scale: [1, 1.2, 1.2, 1, 1],
        rotate: [0, 270, 270, 0, 0],
        // opacity: [1, 0.25, 0.25, 0.25, 1],
        borderRadius: ['5%', '5%', '10%', '10%', '5%']
       }}
       transition={{
        ease: 'linear',
        duration: 3.2,
        repeat: Infinity
       }}
       sx={{
        width: 50,
        height: 50,
        position: 'absolute',
        border: theme => `solid 8px ${alpha(theme.palette.howick.bronze, 0.24)}`
       }}
      />
     </Fragment>
    )}
   </GStyledLoadingScreenDiv>
  </Fragment>
 )
}

export default LoadingScreen
