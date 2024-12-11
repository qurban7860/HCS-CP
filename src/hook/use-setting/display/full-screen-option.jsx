import { useState } from 'react'
import { Icon, ICON_NAME, StyledCard, useSettingContext } from 'hook'
import { useTheme } from '@mui/material/styles'
import { KEY } from 'constant'

function FullScreenOption() {
 const [fullscreen, setFullscreen] = useState(false)
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const onToggleFullScreen = () => {
  if (!document.fullscreenElement) {
   document.documentElement.requestFullscreen()
   setFullscreen(true)
  } else if (document.exitFullscreen) {
   document.exitFullscreen()
   setFullscreen(false)
  }
 }

 return (
  <StyledCard
   selected={fullscreen}
   onClick={onToggleFullScreen}
   mode={themeMode}
   sx={{
    height: 48,
    typography: 'subtitle2',
    color: 'text.primary'
   }}>
   <Icon icon={fullscreen ? ICON_NAME.FULLSCREEN_EXIT : ICON_NAME.FULLSCREEN} color={themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange} alt='fullscreen-exit' />
  </StyledCard>
 )
}

export default FullScreenOption
