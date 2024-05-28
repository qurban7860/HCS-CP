import React, { useEffect, useState } from 'react'
import { Typography, Box } from '@mui/material'
import { RADIUS, TIME } from 'config'
import { LOCALE, VARIANT } from 'constant'
import useClock from './use-clock'
import { huntTimezone } from './city-timezone'
import { StyledClockBox, StyledBoxFlex } from './style'

const Clock = ({ city = 'auckland', country = 'New Zealand' }) => {
  let timezone = huntTimezone(city, country)

  const localTime = useClock(LOCALE.en, timezone.timezone)

  return (
    timezone?.timezone && (
      <StyledBoxFlex gap={2}>
        <StyledClockBox sx={RADIUS.BORDER}>
          <span>{timezone?.timezone}: &nbsp;</span>
          <Typography variant={VARIANT.TYPOGRAPHY.H6}>{TIME.DAY_CLOCK(new Date(localTime))}</Typography>
        </StyledClockBox>
      </StyledBoxFlex>
    )
  )
}

export default Clock
