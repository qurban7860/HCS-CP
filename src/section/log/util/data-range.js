export const getTimePeriodDesc = timePeriod => {
 switch (timePeriod) {
  case 'Daily':
   return 'last 30 Days'
  case 'Monthly':
   return 'last 12 Months'
  case 'Quarterly':
   return 'last 4 Quarters'
  case 'Yearly':
   return 'last 5 Years'
  default:
   return ''
 }
}
