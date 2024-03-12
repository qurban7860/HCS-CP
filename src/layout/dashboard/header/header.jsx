import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { Stack, AppBar, Toolbar, IconButton, Badge, Typography } from '@mui/material'
import { useOffSetTop, useResponsive } from 'hook'
import { useWebSocketContext } from 'auth'
import { bgBlur } from 'theme/style'
import { HEADER, GLOBAL, NavConfiguration } from 'config'
import { LogoIcon } from 'component/logo'
import { Iconify } from 'component/iconify'
import { useSettingContext } from 'component/setting'
import { NavSection } from 'component/nav-section'
import { Clock } from 'component/clock'
import AccountPopover from './account-popover'
import NotificationPopover from './notification-popover'
import { KEY } from 'constant'

Header.propTypes = {
  onOpenNav: PropTypes.func,
}

function Header({ onOpenNav }) {
  const theme = useTheme()
  const navConfig = NavConfiguration()
  const { themeLayout } = useSettingContext()
  const isNavHorizontal = themeLayout === 'horizontal'
  const isDesktop = useResponsive('up', 'lg')
  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal

  // TODO: Uncomment this when the websocket is ready
  // const { sendJsonMessage } = useWebSocketContext()

  // useEffect(() => {
  //   sendJsonMessage({ eventName: 'getNotifications' })
  // }, [sendJsonMessage])

  const renderContent = (
    <>
      <Stack direction="row" justifyContent="flex-start">
        {isDesktop && (
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            color="primary"
            variant="dot"
            badgeContent={GLOBAL.VERSION}
            onMouseEnter={() => <Typography variant="caption">{GLOBAL.VERSION}</Typography>}
            sx={{
              '.MuiBadge-dot': {
                backgroundColor:
                  GLOBAL.ENV === KEY.DEV || GLOBAL.ENV === KEY.DEVELOPMENT
                    ? GLOBAL.DEV_COLOR
                    : theme.palette.error.main,
              },
            }}
          >
            <LogoIcon />
          </Badge>
        )}
      </Stack>
      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={{ xs: 0.5, sm: 4 }}
        ml={5}
      >
        <NavSection data={navConfig} />
      </Stack>
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 4 }}
      >
        <Clock />
        <NotificationPopover />
        <AccountPopover />
      </Stack>
    </>
  )

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        position: 'fixed',
        top: 0,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          // width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
        }),
      }}
    >
      <Toolbar sx={{ height: 1, color: 'text.primary', position: 'sticky' }}>
        {renderContent}
      </Toolbar>
    </AppBar>
  )
}

export default Header
