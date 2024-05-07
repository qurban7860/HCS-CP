import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { useSettingContext } from 'component/setting'
import useIcon, { ICON_NAME } from './use-icon'
import { KEY } from 'constant'

const useReadyIcon = () => {
  const theme = useTheme()
  const { themeMode } = useSettingContext()
  const activeColor = themeMode === KEY.DARK ? theme.palette.howick.burnIn : theme.palette.burnIn.altDark
  const inactiveColor = theme.palette.howick.error

  const { Icon: ActiveIconComponent, iconSrc: activeSrc } = useIcon(ICON_NAME.ACTIVE)
  const { Icon: InActiveIconComponent, iconSrc: inactiveSrc } = useIcon(ICON_NAME.INACTIVE)

  const ActiveIcon = () => {
    return <ActiveIconComponent icon={activeSrc} color={activeColor} />
  }

  const InActiveIcon = () => {
    return <InActiveIconComponent icon={inactiveSrc} color={inactiveColor} />
  }

  return { ActiveIcon, InActiveIcon }
}

export default useReadyIcon
