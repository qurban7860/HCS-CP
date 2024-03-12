const dateNow = new Date()

const TIME = {
  UTC: dateNow.toUTCString(),
  ISO: dateNow.toISOString(),
  TIME: dateNow.toTimeString(),
  DATE: dateNow.toLocaleDateString(),
  CLOCK: (time) => time.toLocaleTimeString(),
  DAY_CLOCK: (time) => {
    const day = time.toLocaleDateString('en-US', { weekday: 'short' })
    const clockTime = time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    })
    return `${day} ${clockTime}`
  },
  custom: (city) => moment().tz(COUNTRY[city]).format(),
}

export default TIME
