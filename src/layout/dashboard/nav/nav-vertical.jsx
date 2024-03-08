import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Stack, Drawer, Typography, Grid } from '@mui/material'
import { useResponsive } from 'hook'
import { GLOBAL, NAV } from 'config'
import { Logo } from 'component/logo'
import { Scrollbar } from 'component/scrollbar'
import { NavSectionVertical } from 'component/nav-section'
import NavDocs from './nav-doc'
// import NavAccount from './nav-account'
import NavToggleButton from './nav-toggle-button'

NavVertical.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
}

function NavVertical({ openNav, onCloseNav }) {
  // const navConfig = NavigationConfig()

  const { pathname } = useLocation()
  // const { themeLayout } = useSettingContext();
  const isDesktop = useResponsive('up', 'lg')
  const [envColor, setEnvColor] = useState('#897A69')
  useEffect(() => {
    if (openNav) {
      onCloseNav()
    }
  }, [pathname])

  useEffect(() => {
    if (
      GLOBAL.ENV.toLocaleLowerCase() === 'dev' ||
      GLOBAL.ENV.toLocaleLowerCase === 'development'
    ) {
      setEnvColor('green')
    } else if (GLOBAL.ENV.toLocaleLowerCase() === 'test') {
      setEnvColor('#4082ed')
    }
  }, [])

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <Logo sx={{ width: '70%', margin: '0 auto' }} />
        <Grid sx={{ margin: '0 auto', mb: 2, display: 'flex', alignItems: 'baseline' }}>
          {GLOBAL.ENV.toLocaleLowerCase() !== 'live' && (
            <Typography
              sx={{
                background: envColor,
                borderRadius: '50px',
                fontSize: '10px',
                padding: '2px 5px',
                color: '#FFF',
              }}
            >{`${GLOBAL.ENV.toLocaleUpperCase()} ${GLOBAL.VERSION}`}</Typography>
          )}

          {GLOBAL.ENV.toLocaleLowerCase() === 'live' && (
            <Typography sx={{ color: '#897A69', fontSize: '10px' }}>{GLOBAL.VERSION}</Typography>
          )}
        </Grid>
      </Stack>
      {/* <NavSectionVertical sx={{ mt: '-50px' }} data={navConfig} /> */}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  )
  return (
    <Box component="nav" sx={{ flexShrink: { lg: 0 }, width: { lg: NAV.W_DASHBOARD } }}>
      <NavToggleButton sx={{ top: 22 }} />
      {isDesktop ? (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV.W_DASHBOARD,
              bgcolor: 'transparent',
              borderRightStyle: 'solid',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  )
}

export default NavVertical
