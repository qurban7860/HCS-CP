import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { Stack, AppBar, Toolbar, IconButton } from '@mui/material'
import { useOffSetTop, useResponsive } from 'hook'
import { useWebSocketContext } from 'auth'
import { bgBlur } from 'theme/style'
import { HEADER, NAV } from 'config'
import { Logo } from 'component/logo'
import { Iconify } from 'component/iconify'
import { useSettingContext } from 'component/setting'
import AccountPopover from './account-popover'
import NotificationsPopover from './notification-popover'

Header.propTypes = {
  onOpenNav: PropTypes.func,
}

function Header({ onOpenNav }) {
  const theme = useTheme()
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
        {isDesktop && <Logo />}
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
        <h4>Customer</h4>
        <h4>Machine</h4>
        <h4>Document</h4>
      </Stack>
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 4 }}
      >
        <NotificationsPopover />
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
          color: '#D9D9D9',
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
          // ...(isNavHorizontal && {
          //   width: 1,
          //   bgcolor: 'background.default',
          //   height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          //   borderBottom: `solid 1px ${theme.palette.divider}`,
          // }),
          // ...(isNavMini && {
          //   width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          // }),
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
