export function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
    value: index
  }
}

export function hasValidArray(array) {
  array.some((obj) => {
    const lat = obj?.lat
    const long = obj?.long
    return lat !== undefined && long !== undefined && lat !== '' && long !== ''
  })
}
