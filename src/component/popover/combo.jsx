import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSettingContext, Icon, ICON_NAME } from 'hook'
import { useTheme, Box, Popover, Typography, IconButton } from '@mui/material'
import { BackButton } from 'component'
import { TYPOGRAPHY, FLEX, KEY } from 'constant'

const PopoverCombo = ({
 id,
 open,
 anchorEl,
 onClose,
 toggleMenu,
 iconClose = ICON_NAME.MENU_POPOVER_OPEN,
 iconOpen = ICON_NAME.MENU_POPOVER_CLOSE,
 icon18nText = 'menu.label',
 i18nKey,
 children,
 withBackButton
}) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 return (
  <Fragment>
   {withBackButton && <BackButton alongTab />}
   <IconButton sx={{ mr: 1, color: 'text.primary' }} onClick={toggleMenu}>
    <Icon icon={open ? iconOpen : iconClose} color={themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.bronze} />
    <Typography variant={TYPOGRAPHY.OVERLINE}>{t(icon18nText)}</Typography>
   </IconButton>

   <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{
     vertical: 'top',
     horizontal: 'right'
    }}
    transformOrigin={{
     vertical: 'top',
     horizontal: 'left'
    }}
    sx={{
     display: FLEX.FLEX,
     zIndex: theme.zIndex.modal + 1
    }}>
    <Box sx={{ p: 1 }}>
     {i18nKey && (
      <Box sx={{ pr: 2, pb: 2 }}>
       <Typography variant={TYPOGRAPHY.SUBTITLE1}>{t(i18nKey)}:</Typography>
      </Box>
     )}
     {children}
    </Box>
   </Popover>
  </Fragment>
 )
}

PopoverCombo.propTypes = {
 id: PropTypes.string,
 i18nKey: PropTypes.string,
 anchorEl: PropTypes.any,
 iconOpen: PropTypes.any,
 iconClose: PropTypes.any,
 icon18nText: PropTypes.string,
 children: PropTypes.node,
 toggleMenu: PropTypes.func,
 onClose: PropTypes.func,
 open: PropTypes.bool,
 withBackButton: PropTypes.bool
}

export default PopoverCombo
