import PropTypes from 'prop-types'
import { useSettingContext, useResponsive } from 'hook'
import { Box, Stack } from '@mui/material'
import { NavSectionY } from 'component'
import { GStyledMenuDrawer, GStyledRightBorderDivider, GBackdropPropsOption } from 'theme/style'
import { KEY } from 'constant'

const DrawerMenu = ({ anchor = KEY.LEFT, open, onClose, navConfig }) => {
 const { themeMode } = useSettingContext()
 const isDesktop = useResponsive('up', 'lg')
 return (
  <GStyledMenuDrawer anchor={anchor} open={open} onClose={onClose} mode={themeMode} isDesktop={isDesktop} BackdropProps={GBackdropPropsOption(themeMode)}>
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
     <NavSectionY data={navConfig} handleCloseNavItem={onClose} />
    </Stack>
   </Box>
  </GStyledMenuDrawer>
 )
}

DrawerMenu.propTypes = {
 anchor: PropTypes.string,
 open: PropTypes.bool,
 onClose: PropTypes.func,
 navConfig: PropTypes.array
}

export default DrawerMenu
