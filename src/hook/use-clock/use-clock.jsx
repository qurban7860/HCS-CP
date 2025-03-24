import { useState, useEffect } from 'react'
import { huntTimezone } from './city-timezone'

const useClock = (locale, timeZone) => {
 const [time, setTime] = useState(new Date().toLocaleString(locale, { timeZone }))

 useEffect(() => {
  const timerID = setInterval(() => {
   setTime(new Date().toLocaleString(locale, { timeZone }))
  }, 1000)

  return () => clearInterval(timerID)
 }, [locale, timeZone])

 return time
}

export default useClock
