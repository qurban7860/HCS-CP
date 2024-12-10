import { useTheme } from '@mui/material/styles'
import { Icon, ICON_NAME, useSettingContext, StyledCard } from 'hook'
import { RADIUS } from 'config'
import { KEY } from 'constant'

/**
 * This is controlled by NavSection and AccountPopover
 * @returns {JSX.Element}
 */
function ModeOption() {
 const { themeMode, onToggleMode } = useSettingContext()
 const theme = useTheme()

 return (
  <StyledCard
   onClick={onToggleMode}
   aria-label='Toggle Dark Mode'
   mode={themeMode}
   sx={{
    '&: MuiIconButton-root': {
     borderRadius: 0
    }
   }}>
   <Icon icon={themeMode === KEY.LIGHT ? ICON_NAME.MODE_LIGHT : ICON_NAME.MODE_LIGHT} color={theme.palette.secondary.main} />
  </StyledCard>
 )
}

export default ModeOption
