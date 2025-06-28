import { useMemo } from 'react'
import { getLogTypeConfigForGenerationAndType, logGraphTypes } from 'config/log-types'
import { fDate } from 'util'

export function useLogDefaultValues(customer, machine) {
    return useMemo(() => {
        const today = new Date()
        const thirtyDaysAgo = new Date(today)
        thirtyDaysAgo.setDate(today.getDate() - 30)

        return {
            customer: customer || null,
            machine: machine || null,
            logType: getLogTypeConfigForGenerationAndType(5, 'ERP') || null,
            dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            dateTo: today,
            logPeriod: 'Daily',
            logGraphType: logGraphTypes[0]
        }
    }, [customer, machine])
}


export function useGraphDefaultValues(customer, machine) {
    return useMemo(() => {
        if (!customer) return undefined;

        return {
            customer: customer._id,
            machine: machine?._id || null,
            logPeriod: 'Daily',
            logGraphType: logGraphTypes[0],
            dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            dateTo: new Date(),
        };
    }, [customer?._id, machine?._id]);
}
