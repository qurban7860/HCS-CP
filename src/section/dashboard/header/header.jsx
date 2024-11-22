import { Fragment, useEffect } from 'react'
import { useOffSetTop, useResponsive, Clock, useSettingContext, Icon, ICON_NAME } from 'hook'
import { AppBar, Toolbar, Stack, Badge, IconButton, Typography, Drawer, Box, List, ListItem, ListItemButton, ListItemText, Popover } from '@mui/material'
import { LogoIcon } from 'component/logo'
import { NavSection } from 'component/nav-section'
import { useTheme } from '@mui/material/styles'
import { bgBlur } from 'theme/style'
import { HEADER, GLOBAL, NavConfiguration } from 'config'
import ModeOption from './mode-option'
import AccountPopover from './account-popover'
import NotificationPopover from './notification-popover'
import { useWebSocketContext } from 'auth/websocket-provider'
import { FLEX, FLEX_DIR, KEY, TIMEZONE } from 'constant'

function Header() {
 const theme = useTheme()
 const navConfig = NavConfiguration()
 const { themeLayout, themeMode } = useSettingContext()
 const isNavHorizontal = themeLayout === 'horizontal'
 const isDesktop = useResponsive('up', 'lg')
 const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal

 const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
 const aucklandTimeZone = TIMEZONE.AUCKLAND.timeZone
 //  const { sendJsonMessage } = useWebSocketContext()

 //  useEffect(() => {
 //   sendJsonMessage({ eventName: 'getNotifications' })
 //  }, [sendJsonMessage])

 const renderContent = (
  <Fragment>
   <Stack direction={FLEX_DIR.ROW} justifyContent={FLEX.FLEX_START}>
    {isDesktop && (
     <Badge
      overlap='circular'
      anchorOrigin={{ vertical: KEY.BOTTOM, horizontal: KEY.RIGHT }}
      color='primary'
      variant='dot'
      badgeContent={GLOBAL.VERSION}
      onMouseEnter={() => <Typography variant='caption'>{GLOBAL.VERSION}</Typography>}
      sx={{
       '.MuiBadge-dot': {
        backgroundColor: GLOBAL.ENV === KEY.DEV || GLOBAL.ENV === KEY.DEVELOPMENT ? GLOBAL.DEV_COLOR : 'transparent'
       }
      }}>
      <LogoIcon />
     </Badge>
    )}
   </Stack>
   {!isDesktop ? (
    <Fragment>
     <IconButton sx={{ mr: 1, color: 'text.primary' }}>
      <Icon icon={ICON_NAME.MENU} color={themeMode === KEY.LIGHT ? theme.palette.howick.orange : theme.palette.howick.blue} />
     </IconButton>
     <IconButton sx={{ mr: 1, color: 'text.primary' }}>
      <Icon icon={ICON_NAME.CLOCK} color={themeMode === KEY.LIGHT ? theme.palette.howick.orange : theme.palette.howick.blue} />
     </IconButton>
     {/* add menu nav items */}
     {/* add clock menu button here that shows different time zones*/}
     {/* <Clock main city={KEY.AUCKLAND} /> */}
    </Fragment>
   ) : (
    <Fragment>
     <Stack flexGrow={1} direction={FLEX_DIR.ROW} alignItems={KEY.CENTER} justifyContent={FLEX.FLEX_START} spacing={{ xs: 0.5, sm: 4 }} ml={5}>
      <NavSection data={navConfig} />
     </Stack>
     <Stack flexGrow={1} direction={FLEX_DIR.ROW} alignItems={KEY.CENTER} justifyContent={FLEX.FLEX_END} spacing={{ xs: 0.5, sm: 2 }}>
      {localTimeZone !== aucklandTimeZone && <Clock local={localTimeZone} />}
      <Clock main city={KEY.AUCKLAND} />
      <ModeOption />
      <NotificationPopover />
      <AccountPopover />
     </Stack>
    </Fragment>
   )}
  </Fragment>
 )

 return (
  <AppBar
   sx={{
    boxShadow: KEY.NONE,
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
