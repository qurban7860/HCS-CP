import { useTheme } from '@mui/material/styles'
import { useIcon, useSettingContext, StyledCard } from 'hook'
import { RADIUS } from 'config'
import { KEY } from 'constant'

/**
 * This is controlled by NavSection and AccountPopover
 * @returns {JSX.Element}
 */
function ModeOption() {
  const { themeMode, onToggleMode } = useSettingContext()

  const theme = useTheme()
  const { Icon, iconSrc: iconDark } = useIcon('MODE_DARK')
  const { iconSrc: iconLight } = useIcon('MODE_LIGHT')

  return (
    <StyledCard
      onClick={onToggleMode}
      aria-label="Toggle Dark Mode"
      sx={{
        '&: MuiIconButton-root': {
          backgroundColor: theme.palette.grey[200],
          borderRadius: 0
        },
        '&:hover': {
          ...RADIUS.BORDER
        }
      }}>
      {themeMode === KEY.LIGHT ? (
        <Icon icon={iconLight} color={theme.palette.secondary.main} />
      ) : (
        <Icon icon={iconDark} color={theme.palette.secondary.light} />
      )}
    </StyledCard>
  )
}

export default ModeOption
