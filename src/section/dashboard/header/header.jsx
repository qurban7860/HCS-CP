import { Fragment } from 'react'
import { useOffSetTop, useResponsive, Clock, useSettingContext } from 'hook'
import { useAuthContext } from 'auth'
import { Stack, AppBar, Toolbar, IconButton, Badge, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { bgBlur } from 'theme/style'
import { HEADER, GLOBAL, NavConfiguration } from 'config'
import { LogoIcon } from 'component/logo'
import { Iconify } from 'component/iconify'
import { NavSection } from 'component/nav-section'
import ModeOption from './mode-option'
import AccountPopover from './account-popover'
import NotificationPopover from './notification-popover'
import { KEY, TIMEZONE } from 'constant'

function Header() {
  const { user, logout } = useAuthContext()
  const theme = useTheme()
  const navConfig = NavConfiguration()
  const { themeLayout } = useSettingContext()
  const isNavHorizontal = themeLayout === 'horizontal'
  const isDesktop = useResponsive('up', 'lg')
  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal

  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const aucklandTimeZone = TIMEZONE.AUCKLAND.timeZone

  // TODO: HPS-1224: Uncomment this when the websocket is ready
  // const { sendJsonMessage } = useWebSocketContext()

  // useEffect(() => {
  //   sendJsonMessage({ eventName: 'getNotifications' })
  // }, [sendJsonMessage])

  const renderContent = (
    <Fragment>
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
                backgroundColor: GLOBAL.ENV === KEY.DEV || GLOBAL.ENV === KEY.DEVELOPMENT ? GLOBAL.DEV_COLOR : theme.palette.error.main
              }
            }}>
            <LogoIcon />
          </Badge>
        )}
      </Stack>
      {!isDesktop && (
        <IconButton sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}
      <Stack flexGrow={1} direction="row" alignItems="center" justifyContent="flex-start" spacing={{ xs: 0.5, sm: 4 }} ml={5}>
        <NavSection data={navConfig} />
      </Stack>
      <Stack flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end" spacing={{ xs: 0.5, sm: 2 }}>
        {localTimeZone !== aucklandTimeZone && <Clock local={localTimeZone} />}
        <Clock main city={KEY.AUCKLAND} />
        <ModeOption />
        <NotificationPopover />
        <AccountPopover />
      </Stack>
    </Fragment>
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
          color: theme.palette.background.default
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter
        }),
        ...(isDesktop && {
          // width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET
          })
        })
      }}>
      <Toolbar sx={{ height: 1, color: 'text.primary', position: 'sticky' }}>{renderContent}</Toolbar>
    </AppBar>
  )
}

export default Header
