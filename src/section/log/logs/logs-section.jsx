import { Fragment, useEffect, useState, memo, useLayoutEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import _ from 'lodash'
import { t } from 'i18next'
import { useSearchParams } from 'react-router-dom'
import { useSelector, dispatch } from 'store'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useAuthContext } from 'auth'
import { useSettingContext } from 'hook'
import { getCustomers, getLogGraphData, getSecurityUser, getLogs, ChangeLogPage, resetLogsGraphData, resetLogs, resetSecurityUser, getCustomerMachines, resetCustomerMachines } from 'store/slice'
import { Grid, Box, Card, Stack } from '@mui/material'
import { MotionLazyContainer, TableTitleBox } from 'component'
import FormProvider, { RHFAutocomplete } from 'component/hook-form'
import { LogsTableController, useLogDefaultValues } from 'section/log'
import { MachineLogsTab } from 'section/product'
import { addLogSchema } from 'schema'
import { useTheme } from '@mui/material/styles'
import { TABLE, LOG_TYPE_CONFIG } from 'config'
import { KEY, FLEX } from 'constant'

const LogsSection = ({ isArchived }) => {
 const [selectedSearchFilter, setSelectedSearchFilter] = useState('')
 const [selectedLog, setSelectedLog] = useState(null)
 const [openLogDetailsDialog, setOpenLogDetailsDialog] = useState(false)
 const [graphLabels, setGraphLabels] = useState({ yaxis: 'Cumulative Total Value', xaxis: 'Months' })
 const { customerMachines } = useSelector(state => state.machine)
 const { logs, logPage, isLoading, logRowsPerPage } = useSelector(state => state.log)
 const { customers } = useSelector(state => state.customer)
 const { securityUser } = useSelector(state => state.user)

 const { userId, user } = useAuthContext()
 const [searchParams] = useSearchParams()

 const axiosToken = () => axios.CancelToken.source()
 const cancelTokenSource = axiosToken()
 const isGraphPage = () => searchParams.get('type') === 'erpGraph'

 const defaultValues = useLogDefaultValues(customers[0], customerMachines[0])
 const methods = useForm({
  resolver: yupResolver(addLogSchema),
  defaultValues
 })

 const { watch, setValue, handleSubmit, trigger } = methods
 const { customer, machine, dateFrom, dateTo, logType, filteredSearchKey, logPeriod, logGraphType } = watch()

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   dispatch(getCustomers(null, null, isArchived, cancelTokenSource))
  }, 300)
  debouncedDispatch()
  return () => debouncedDispatch.cancel()
 }, [dispatch])

 useEffect(() => {
  if (customers?.length > 0) {
   setValue('customer', customers[0])
  }
 }, [customers, setValue])

 useEffect(() => {
  if (customer) {
   dispatch(getCustomerMachines(customer._id))
  } else {
   dispatch(resetCustomerMachines())
  }
 }, [dispatch, customer])

 useEffect(() => {
  if (isGraphPage() && customer && logPeriod && logGraphType) {
   const customerId = customer._id
   const machineId = machine?._id || undefined
   const LogType = 'erp'
   dispatch(getLogGraphData(customerId, machineId, LogType, logPeriod, logGraphType?.key))
  }
  if (!customer) dispatch(resetLogsGraphData())
 }, [customer, machine, logPeriod, searchParams, logGraphType])

 const onGetLogs = data => {
  const customerId = customer._id
  const machineId = machine?._id || undefined
  dispatch(ChangeLogPage(0))
  dispatch(
   getLogs({
    customerId,
    machineId,
    page: 0,
    pageSize: logRowsPerPage,
    fromDate: dateFrom,
    toDate: dateTo,
    isArchived: false,
    isMachineArchived: machine?.isArchived,
    selectedLogType: logType.type,
    searchKey: filteredSearchKey,
    searchColumn: selectedSearchFilter
   })
  )
 }

 useLayoutEffect(() => {
  if (userId !== securityUser?._id) {
   dispatch(resetSecurityUser())
  }
 }, [userId])

 useEffect(() => {
  if (userId !== securityUser?._id) {
   dispatch(getSecurityUser(userId))
  }
 }, [userId])

 const handleCustomerChange = useCallback(
  newCustomer => {
   setValue('customer', newCustomer)
   setValue('machine', null)
   trigger(['customer', 'machine'])
   dispatch(resetLogs())
  },
  [dispatch, setValue, trigger]
 )

 const handleMachineChange = useCallback(
  newMachine => {
   setValue('machine', newMachine)
   trigger('machine')
   dispatch(resetLogs())
  },
  [dispatch, setValue, trigger]
 )

 const handleLogTypeChange = useCallback(
  newLogType => {
   setValue('logType', newLogType)
   trigger('logType')
  },
  [setValue, trigger]
 )

 const handlePeriodChange = useCallback(
  newPeriod => {
   setValue('logPeriod', newPeriod)
   switch (newPeriod) {
    case 'Monthly':
     setGraphLabels(prev => ({ ...prev, xaxis: 'Months' }))
     break
    case 'Daily':
     setGraphLabels(prev => ({ ...prev, xaxis: 'Days' }))
     break
    case 'Quarterly':
     setGraphLabels(prev => ({ ...prev, xaxis: 'Quarters' }))
     break
    case 'Yearly':
     setGraphLabels(prev => ({ ...prev, xaxis: 'Years' }))
     break
    default:
     break
   }
  },
  [setValue]
 )

 const handleGraphTypeChange = useCallback(
  newGraphType => {
   setValue('logGraphType', newGraphType)
  },
  [setValue]
 )

 const payload = {
  customerId: machine?.customer?._id,
  machineId: machine?._id || undefined,
  page: logPage,
  pageSize: logRowsPerPage,
  fromDate: dateFrom,
  toDate: dateTo,
  isArchived: false,
  isMachineArchived: false,
  selectedLogType: logType?.type,
  searchKey: filteredSearchKey,
  searchColumn: selectedSearchFilter
 }

 return (
  <MotionLazyContainer display={FLEX.FLEX}>
   <TableTitleBox title={'Logs'} user={securityUser} />
   <FormProvider methods={methods} onSubmit={handleSubmit(onGetLogs)}>
    <Grid container spacing={2} mt={3}>
     <Grid item xs={12} sm={12}>
      <LogsTableController
       customers={customers}
       handleCustomerChange={handleCustomerChange}
       customerMachines={customerMachines}
       handleMachineChange={handleMachineChange}
       handleLogTypeChange={handleLogTypeChange}
       isGraphPage={isGraphPage}
       methods={methods}
       onGetLogs={onGetLogs}
      />
     </Grid>
    </Grid>
   </FormProvider>

   <MachineLogsTab isLogsPage logType={logType} payload={payload} />
  </MotionLazyContainer>
 )
}

LogsSection.propTypes = {
 isArchived: PropTypes.bool
}

export default memo(LogsSection)
