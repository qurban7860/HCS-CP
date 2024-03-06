import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import useResponsive from 'hook'
import { HEADER, NAV } from 'config'
import { useSettingsContext } from 'component/setting'

const SPACING = 8

Main.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
}

export default function Main({ children, sx, ...other }) {
  const { themeLayout } = useSettingsContext()

  const isNavHorizontal = themeLayout === 'horizontal'

  const isNavMini = themeLayout === 'mini'

  const isDesktop = useResponsive('up', 'lg')

  if (isNavHorizontal) {
    return (
      <Box
        component="main"
        sx={{
          pt: `${HEADER.H_MOBILE + SPACING}px`,
          pb: `${HEADER.H_MOBILE + SPACING}px`,
          ...(isDesktop && {
            px: 2,
            pt: `${HEADER.H_DASHBOARD_DESKTOP + 80}px`,
            pb: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          }),
        }}
      >
        {children}
      </Box>
    )
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        backgroundColor: '#63738114',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        // height: '100vh',
        ...(isDesktop && {
          px: 2,
          py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
          }),
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  )
}
