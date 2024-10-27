import { useMemo } from 'react'
import { getLogTypeConfigForGenerationAndType, logGraphTypes } from 'config/log-types'

export function useLogDefaultValues(customerId, machineId) {
 return useMemo(() => {
  const today = new Date()
  const thirtyDaysAgo = new Date(today)
  thirtyDaysAgo.setDate(today.getDate() - 30)

  return {
   customer: null,
   machine: null,
   logType: getLogTypeConfigForGenerationAndType(5, 'ERP') || null,
   dateFrom: null,
   dateTo: null,
   logPeriod: 'Monthly',
   logGraphType: logGraphTypes[0]
  }
 }, [])
}
