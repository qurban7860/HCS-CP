import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Typography, Box } from '@mui/material'
import { RADIUS, TIME } from 'config'
import { LOCALE, VARIANT, KEY, TIMEZONE } from 'constant'
import useClock from './use-clock'
import { huntTimezone } from './city-timezone'
import { StyledClockBox, StyledBoxFlex } from './style'

const Clock = ({ main, city = KEY.AUCKLAND, country = KEY.NEW_ZEALAND, local }) => {
  const [aucklandTime, setAucklandTime] = useState(new Date().toLocaleString(LOCALE.en, TIMEZONE.AUCKLAND))
  let timezone = huntTimezone(city, country)
  const localTime = useClock(LOCALE.en, timezone.timezone || local)

  useEffect(() => {
    const timerID = setInterval(() => {
      setAucklandTime(new Date().toLocaleString(LOCALE.en, TIMEZONE.AUCKLAND))
    }, 1000)
    return () => {
      clearInterval(timerID)
    }
  }, [])

  return (
    timezone?.timezone && (
      <StyledBoxFlex gap={2}>
        {main ? (
          <StyledClockBox sx={RADIUS.BORDER}>
            <span>{KEY.AUCKLAND}: &nbsp;</span>
            <Typography variant={VARIANT.TYPOGRAPHY.H6}>{TIME.DAY_CLOCK(new Date(aucklandTime))}</Typography>
          </StyledClockBox>
        ) : (
          <StyledClockBox sx={RADIUS.BORDER}>
            <span>{timezone?.timezone}: &nbsp;</span>
            <Typography variant={VARIANT.TYPOGRAPHY.H6}>{TIME.DAY_CLOCK(new Date(localTime))}</Typography>
          </StyledClockBox>
        )}
      </StyledBoxFlex>
    )
  )
}

Clock.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  main: PropTypes.bool
}

export default Clock
