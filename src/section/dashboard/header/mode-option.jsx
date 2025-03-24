import { IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useIcon, ICON_NAME, useSettingContext } from 'hook'
import { RADIUS } from 'config/layout'
import { KEY } from 'constant'

function ModeOption() {
 const { themeMode, onToggleMode } = useSettingContext()

 const theme = useTheme()
 const { Icon, iconSrc: iconDark } = useIcon(ICON_NAME.MODE_DARK)
 const { iconSrc: iconLight } = useIcon(ICON_NAME.MODE_LIGHT)

 return (
  <IconButton
   onClick={onToggleMode}
   aria-label='Toggle Dark Mode'
   sx={{
    '&: MuiIconButton-root': {
     backgroundColor: theme.palette.grey[200],
     borderRadius: RADIUS.BORDER.borderRadius
    },
    '&:hover': {
     ...RADIUS.BORDER
    }
   }}>
   {themeMode === KEY.LIGHT ? <Icon icon={iconLight} color={theme.palette.secondary.main} /> : <Icon icon={iconDark} color={theme.palette.secondary.light} />}
  </IconButton>
 )
}

export default ModeOption
