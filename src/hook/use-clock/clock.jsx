import React, { useState } from 'react'
import { Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { StyledClockBox, StyledBoxFlex } from 'component/clock'
import { RADIUS, TIME } from 'config'
import { KEY, LOCALE, TIMEZONE } from 'constant'
import useCityTime from 'path/to/useCityTime'

const Clock = () => {
  const theme = useTheme()
  const localTime = useCityTime(LOCALE.en, Intl.DateTimeFormat().resolvedOptions().timeZone)
  const aucklandTime = useCityTime(LOCALE.en, TIMEZONE.AUCKLAND)

  return (
    <StyledBoxFlex gap={2}>
      <StyledClockBox sx={RADIUS.BORDER}>
        <span>{Intl.DateTimeFormat().resolvedOptions().timeZone}: &nbsp;</span>
        <Typography variant="h6">{TIME.DAY_CLOCK(new Date(localTime))}</Typography>
      </StyledClockBox>
      <StyledClockBox sx={RADIUS.BORDER}>
        <span>{KEY.AUCKLAND}: &nbsp;</span>
        <Typography variant="h6">{TIME.DAY_CLOCK(new Date(aucklandTime))}</Typography>
      </StyledClockBox>
    </StyledBoxFlex>
  )
}

export default Clock
