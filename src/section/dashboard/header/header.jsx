import { Fragment, useState } from 'react'
import { useOffSetTop, useResponsive, Clock, useSettingContext, Icon, ICON_NAME } from 'hook'
import { AppBar, Toolbar, Stack, Badge, IconButton, Typography, Drawer, Box, List, ListItem, ListItemButton, ListItemText, Popover, alpha } from '@mui/material'
import { NavSection, NavSectionY } from 'component'
import { LogoIcon } from 'component/logo'
import { useTheme } from '@mui/material/styles'
import { bgBlur, GStyledRightBorderDivider } from 'theme/style'
import { HEADER, GLOBAL, NavConfiguration } from 'config'
import { ASSET } from 'config/asset-directory'
import { FLEX, FLEX_DIR, KEY, TIMEZONE } from 'constant'
import ModeOption from './mode-option'
import AccountPopover from './account-popover'
import NotificationPopover from './notification-popover'
import { useWebSocketContext } from 'auth/websocket-provider'
import { t } from 'i18next'

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
      <Drawer
       anchor='left'
       open={mobileMenuOpen}
       onClose={toggleMobileMenu}
       sx={{
        position: 'relative',
        backgroundImage: themeMode === KEY.LIGHT ? `url(${ASSET.BG_STROKE_LIGHTGREY_LOGO})` : `url(${ASSET.BG_STROKE_BRONZE_LOGO})`,
        backgroundSize: !isDesktop ? '250%' : '150%',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: 'center',
        backgroundPositionX: 'left',
        backgroundOpacity: 0.2,
        backgroundAttachment: 'fixed',
        '& .MuiDrawer-paper': {
         color: theme.palette.common.white
        }
       }}
       BackdropProps={{
        sx: {
         backgroundColor: 'rgba(255, 255, 255, 0.5)',
         backdropFilter: 'blur(5px)',
         transition: 'backdrop-filter 0.3s ease-in-out'
        }
       }}>
       <Box sx={{ width: 150, p: 2, mt: 5 }}>
        <GStyledRightBorderDivider
         mode={themeMode}
         orientation={'vertical'}
         sx={{
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0
         }}
        />
        <Stack flexGrow={1} direction='row' alignItems='right' justifyContent='flex-end' spacing={{ xs: 0.5, sm: 4 }}>
         <NavSectionY data={navConfig} handleCloseNavItem={toggleMobileMenu} />
        </Stack>
       </Box>
      </Drawer>
      <Popover
       id={clockId}
       open={clockOpen}
       anchorEl={clockAnchor}
       onClose={() => setClockAnchor(null)}
       anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
       }}
       transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
       }}
       sx={{
        zIndex: theme.zIndex.modal + 1
       }}>
       <Box sx={{ p: 2 }}>
        <Box sx={{ pr: 2, py: 2 }}>
         <Typography variant='subtitle1'>{t('time_zone.label')}:</Typography>
        </Box>
        <Clock main city={KEY.AUCKLAND} />
       </Box>
      </Popover>
     </Box>
    </Fragment>
   ) : (
    <Fragment>
     <Stack flexGrow={1} direction='row' alignItems='center' justifyContent='flex-start' spacing={{ xs: 0.5, sm: 4 }} ml={5}>
      <NavSection data={navConfig} />
     </Stack>
     <Stack flexGrow={1} direction='row' alignItems='center' justifyContent='flex-end' spacing={{ xs: 0.5, sm: 2 }}>
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
