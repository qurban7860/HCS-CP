import { useState } from 'react'
import { useIcon, ICON_NAME, StyledCard } from 'hook'

function FullScreenOption() {
  const [fullscreen, setFullscreen] = useState(false)
  const { Icon: IconFullScreen, iconSrc: fullScreenSrc } = useIcon(ICON_NAME.FULLSCREEN)
  const { Icon: IconFullScreenExit, iconSrc: FullScreenExitSrc } = useIcon(ICON_NAME.FULLSCREEN_EXIT)

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
      sx={{
        height: 48,
        typography: 'subtitle2',
        color: 'text.primary'
      }}>
      {fullscreen ? (
        <>
          <IconFullScreenExit icon={FullScreenExitSrc} alt="fullscreen-exit" />
        </>
      ) : (
        <>
          <IconFullScreen icon={fullScreenSrc} alt="fullscreen" />
        </>
      )}
    </StyledCard>
  )
}

export default FullScreenOption
