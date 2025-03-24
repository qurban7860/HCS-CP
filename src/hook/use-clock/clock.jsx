import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { Typography, Box } from '@mui/material'
import { RADIUS, TIME } from 'config'
import { LOCALE, VARIANT, KEY, TIMEZONE } from 'constant'
import useClock from './use-clock'
import { huntTimezone } from './city-timezone'
import { StyledClockBox, StyledBoxFlex } from './style'

const Clock = ({ main, city, country = KEY.NEW_ZEALAND, region = KEY.AUCKLAND, local }) => {
 const [aucklandTime, setAucklandTime] = useState(new Date().toLocaleString(LOCALE.en, TIMEZONE.AUCKLAND))
 const timezoneObj = huntTimezone(city, country, region) || huntTimezone(local)
 const timezone = timezoneObj?.timezone

 const localTime = useClock(LOCALE.en, local)

 const formatTime = date => {
  return format(date, 'HH:mm:ss', {
   timeZone: timezone
  })
 }

 useEffect(() => {
  const timerID = setInterval(() => {
   setAucklandTime(new Date(new Date().toLocaleString(LOCALE.en, TIMEZONE.AUCKLAND)))
  }, 1000)
  return () => {
   clearInterval(timerID)
  }
 }, [timezone])

 const displayTime = main ? formatTime(new Date()) : formatTime(new Date(localTime))
 const displayLabel = main ? KEY.AUCKLAND : timezone

 return (
  timezone && (
   <StyledBoxFlex gap={2}>
    {main ? (
     <StyledClockBox sx={RADIUS.BORDER}>
      <span>{KEY.AUCKLAND}: &nbsp;</span>
      <Typography variant={VARIANT.TYPOGRAPHY.H6}>{TIME.DAY_CLOCK(new Date(aucklandTime))}</Typography>
     </StyledClockBox>
    ) : (
     <StyledClockBox sx={RADIUS.BORDER}>
      <span>{displayLabel}: &nbsp;</span>
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
 main: PropTypes.bool,
 region: PropTypes.string,
 local: PropTypes.string
}

export default Clock
