import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useResponsive, useSettingContext } from 'hook'
import { HEADER } from 'config/layout'

const SPACING = 8

Main.propTypes = {
 sx: PropTypes.object,
 children: PropTypes.node
}

export default function Main({ children, sx, ...other }) {
 const { themeLayout } = useSettingContext()
 const theme = useTheme()

 const isNavHorizontal = themeLayout === 'horizontal'
 const isDesktop = useResponsive('up', 'lg')

 if (isNavHorizontal) {
  return (
   <Box
    component='main'
    sx={{
     pt: `${HEADER.H_MOBILE + SPACING}px`,
     pb: `${HEADER.H_MOBILE + SPACING}px`,
     ...(isDesktop && {
      px: 2,
      pt: `${HEADER.H_DASHBOARD_DESKTOP + 80}px`,
      pb: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`
     })
    }}>
    {children}
   </Box>
  )
 }

 return (
  <Box
   component='main'
   sx={{
    py: `${HEADER.H_MOBILE + SPACING}px`,
    height: `calc(100vh - ${HEADER.H_MOBILE + SPACING}px)`,
    ...(isDesktop && {
     px: 2,
     py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
     width: '100%'
    }),
    ...sx
   }}
   {...other}>
   {children}
  </Box>
 )
}
