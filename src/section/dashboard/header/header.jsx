import { Fragment, useState } from 'react'
import { useOffSetTop, useResponsive, Clock, useSettingContext, Icon, ICON_NAME } from 'hook'
import { AppBar, Toolbar, Stack, Badge, IconButton, Box } from '@mui/material'
import { NavSection, PopoverDefault, DrawerMenu } from 'component'
import { LogoIcon } from 'component/logo'
import { useTheme } from '@mui/material/styles'
import { bgBlur } from 'theme/style'
import { HEADER, GLOBAL, NavConfiguration } from 'config'
import { KEY, TIMEZONE } from 'constant'
import ModeOption from './mode-option'
import AccountPopover from './account-popover'
import NotificationPopover from './notification-popover'
// import { useWebSocketContext } from 'auth/websocket-provider'

function Header() {
 const theme = useTheme()
 const navConfig = NavConfiguration()
 const { themeLayout, themeMode } = useSettingContext()
 const isNavHorizontal = themeLayout === 'horizontal'
 const isDesktop = useResponsive('up', 'lg')
 const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal

 const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
 const aucklandTimeZone = TIMEZONE.AUCKLAND.timeZone

 const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
 const [clockAnchor, setClockAnchor] = useState(null)

 const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
 const toggleClockMenu = event => {
  setClockAnchor(clockAnchor ? null : event.currentTarget)
 }

 const clockOpen = Boolean(clockAnchor)
 const clockId = clockOpen ? 'clock-menu' : undefined

 const renderContent = (
  <Fragment>
   <Stack direction='row' justifyContent='flex-start'>
    {isDesktop && (
     <Badge
      overlap='circular'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      color='primary'
      variant='dot'
      badgeContent={GLOBAL.VERSION}
      sx={{
       '.MuiBadge-dot': {
        backgroundColor: GLOBAL.ENV === 'dev' || GLOBAL.ENV === 'development' ? GLOBAL.DEV_COLOR : 'transparent'
       }
      }}>
      <LogoIcon />
     </Badge>
    )}
   </Stack>
   {!isDesktop ? (
    <Fragment>
     <Box
      justifyContent={'space-between'}
      sx={{
       display: 'flex',
       justifyContent: 'space-between',
       alignItems: 'center',
       width: '100%'
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
       <IconButton sx={{ mr: 1, color: 'text.primary' }} onClick={toggleMobileMenu}>
        <Icon icon={ICON_NAME.MENU} color={themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.bronze} />
       </IconButton>
       <IconButton sx={{ mr: 1, color: 'text.primary' }} onClick={toggleClockMenu}>
        <Icon icon={ICON_NAME.CLOCK} color={themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.bronze} />
       </IconButton>
      </Box>
      <Box justifyContent={'flex-end'} sx={{ display: 'flex', alignItems: 'center' }}>
       <AccountPopover />
      </Box>
      <DrawerMenu navConfig={navConfig} open={mobileMenuOpen} onClose={toggleMobileMenu} />
      <PopoverDefault id={clockId} localizedLabel={'time_zone.label'} open={clockOpen} anchorEl={clockAnchor} onClose={() => setClockAnchor(null)}>
       <Clock main city={KEY.AUCKLAND} />
      </PopoverDefault>
     </Box>
    </Fragment>
   ) : (
    <Fragment>
     <Stack flexGrow={1} direction='row' alignItems='center' justifyContent='flex-start' spacing={{ xs: 0.5, sm: 4 }} ml={5}>
      <NavSection data={navConfig} />
     </Stack>
     <Stack flexGrow={1} direction='row' alignItems='center' justifyContent='flex-end' spacing={{ xs: 0.5, sm: 2 }}>
      {/* {localTimeZone !== aucklandTimeZone && <Clock local={localTimeZone} city={'cleveland'} />} */}
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
