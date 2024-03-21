import React, { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { StyledClockBox, StyledBoxFlex } from 'component/clock'
import { RADIUS, TIME } from 'config'
import { KEY, LOCALE, TIMEZONE } from 'constant'

const Clock = () => {
  const [time, setTime] = useState(new Date())
  const [aucklandTime, setAucklandTime] = useState(new Date().toLocaleString(LOCALE.en, TIMEZONE.AUCKLAND))
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const theme = useTheme()

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timerID)
    }
  }, [])

  useEffect(() => {
    const timerID = setInterval(() => {
      setAucklandTime(new Date().toLocaleString(LOCALE.en, TIMEZONE.AUCKLAND))
    }, 1000)
    return () => {
      clearInterval(timerID)
    }
  }, [])

  return (
    <StyledBoxFlex gap={2}>
      <StyledClockBox sx={RADIUS.BORDER}>
        <span>{timeZone}: &nbsp;</span> <Typography variant="h6">{TIME.DAY_CLOCK(time)}</Typography>
      </StyledClockBox>
      <StyledClockBox sx={RADIUS.BORDER}>
        <span>{KEY.AUCKLAND}: &nbsp;</span>
        <Typography variant="h6">{TIME.DAY_CLOCK(new Date(aucklandTime))}</Typography>
      </StyledClockBox>
    </StyledBoxFlex>
  )
}

export default Clock
