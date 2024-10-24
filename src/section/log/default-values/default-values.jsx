import { useMemo } from 'react'
import { getLogTypeConfigForGenerationAndType, logGraphTypes } from 'config/log-types'

export function logDefaultValues(customerId, machineId) {
 // eslint-disable-next-line react-hooks/rules-of-hooks
 return useMemo(() => {
  return {
   customer: customerId,
   machine: machineId,
   logType: getLogTypeConfigForGenerationAndType(5, 'ERP') || null,
   dateFrom: null,
   dateTo: null,
   logPeriod: 'Monthly',
   logGraphType: logGraphTypes[0]
  }
 }, [logGraphTypes])
}
