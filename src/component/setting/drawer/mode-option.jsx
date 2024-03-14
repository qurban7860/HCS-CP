import { IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { SvgColor } from 'component/svg-color'
import { useSettingContext } from '../setting-context'
import { KEY } from 'constant'

function ModeOption() {
  const { themeMode, onToggleMode } = useSettingContext()

  const theme = useTheme()
  const sunIcon = '/asset/icon/sun.svg'
  const moonIcon = '/asset/icon/moon.svg'

  return (
    <IconButton onClick={onToggleMode} aria-label="Toggle Dark Mode">
      <SvgColor
        icon={themeMode === KEY.LIGHT ? sunIcon : moonIcon}
        color={
          themeMode === KEY.LIGHT ? theme.palette.secondary.main : theme.palette.secondary.light
        }
      />
    </IconButton>
  )
}

export default ModeOption
