import { Fragment, useState } from 'react'
import { useOffSetTop, Clock, useSettingContext, useUIMorph, Icon, ICON_NAME } from 'hook'
import { AppBar, Toolbar, Stack, IconButton, Box, Typography } from '@mui/material'
import { NavSection, PopoverDefault, DrawerMenu } from 'component'
import { LogoIcon } from 'component/logo'
import { useTheme } from '@mui/material/styles'
import { bgBlur } from 'theme/style'
import { GLOBAL } from 'config/global'
import { HEADER, NavConfiguration } from 'config'
import { FLEX, FLEX_DIR, KEY, TYPOGRAPHY } from 'constant'
import ModeOption from './mode-option'
import AccountPopover from './account-popover'
import NotificationPopover from './notification-popover'

const DEV = 'dev'

function Header() {
  const theme = useTheme()
  const navConfig = NavConfiguration()
  const { themeLayout, themeMode } = useSettingContext()
  const { isDesktop, IsBreakpointUp } = useUIMorph()
  const isNavHorizontal = themeLayout === 'horizontal'
  const isLargeScreen = IsBreakpointUp(1200);
  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal
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
      <Stack display={FLEX.FLEX} justifyContent={FLEX.FLEX_START} sx={{ position: KEY.RELATIVE }}>
        {isDesktop && (
          <Fragment>
            <LogoIcon />
            <Box
              bgcolor={GLOBAL.ENV === DEV ? theme.palette.burnIn.main : theme.palette.background.default}
              sx={{
                position: KEY.ABSOLUTE,
                bottom: -10,
                width: '100%',
                height: 5
              }}>
              {GLOBAL.ENV === DEV && (isLargeScreen && (
                <Stack mt={1}>
                  <Typography variant={TYPOGRAPHY.CAPTION}>{GLOBAL.ENV.toUpperCase()}</Typography>
                  <Typography variant={TYPOGRAPHY.CAPTION1}>{GLOBAL.VERSION}</Typography>
                </Stack>
              )
              )}
            </Box>
          </Fragment>
        )}
      </Stack>
      {!isDesktop ? (
        <Fragment>
          <Box
            justifyContent={FLEX.SPACE_BETWEEN}
            sx={{
              display: FLEX.FLEX,
              justifyContent: FLEX.SPACE_BETWEEN,
              alignItems: KEY.CENTER,
              width: '100%'
            }}>
            <Box sx={{ display: FLEX.FLEX, alignItems: KEY.CENTER }}>
              <IconButton sx={{ mr: 1, color: 'text.primary' }} onClick={toggleMobileMenu}>
                <Icon icon={ICON_NAME.MENU} color={themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.bronze} />
              </IconButton>
              <IconButton sx={{ mr: 1, color: 'text.primary' }} onClick={toggleClockMenu}>
                <Icon icon={ICON_NAME.CLOCK} color={themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.bronze} />
              </IconButton>
            </Box>
            <Box justifyContent={FLEX.FLEX_END} sx={{ display: FLEX.FLEX, alignItems: KEY.CENTER }}>
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
          <Stack flexGrow={1} direction={FLEX_DIR.ROW} alignItems={KEY.CENTER} justifyContent={FLEX.FLEX_START} spacing={{ xs: 0.5, sm: 4 }} ml={5}>
            <NavSection data={navConfig} />
          </Stack>
          <Stack flexGrow={1} direction={FLEX_DIR.ROW} alignItems={KEY.CENTER} justifyContent={FLEX.FLEX_END} spacing={{ xs: 0.5, sm: 2 }}>
            {/* {localTimeZone !== aucklandTimeZone && <Clock local={localTimeZone} city={'cleveland'} />} */}
            {/* <Clock main city={KEY.AUCKLAND} /> */}
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
        position: KEY.FIXED,
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
      <Toolbar sx={{ height: 1, color: 'text.primary', position: KEY.STICKY }}>{renderContent}</Toolbar>
    </AppBar>
  )
}

export default Header
