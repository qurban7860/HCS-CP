import { Fragment, useEffect, useState, useCallback, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { dispatch } from 'store'
import { useForm } from 'react-hook-form'
import { useSettingContext } from 'hook'
import { yupResolver } from '@hookform/resolvers/yup'
import { getLogs, getLogGraphData, setSelectedSearchFilter, ChangeLogPage, resetLogs, resetLogsGraphData } from 'store/slice'
import { addLogSchema } from 'schema'
import { Grid } from '@mui/material'
import { MotionLazyContainer, HowickLoader } from 'component'
import FormProvider from 'component/hook-form'
import { LogsTableController, useLogDefaultValues } from 'section/log/logs'
import { ERPProductionTotal, ERPProductionRate } from 'section/log'
import { FLEX } from 'constant'

const MachineGraphsTab = () => {
 const { logPage, logRowsPerPage, isLoading, logsGraphData, selectedSearchFilter } = useSelector(state => state.log)
 const { customer, customers } = useSelector(state => state.customer)
 const { machine, customerMachines } = useSelector(state => state.machine)

 const { themeMode } = useSettingContext()
 const defaultValues = useLogDefaultValues()
 const { id } = useParams()
 const methods = useForm({
  resolver: yupResolver(addLogSchema),
  defaultValues
 })

 const { watch, setValue, handleSubmit, trigger } = methods
 const { dateFrom, dateTo, logType, logPeriod, filteredSearchKey, logGraphType } = watch()
 const [graphLabels, setGraphLabels] = useState({ yaxis: 'Cumulative Total Value', xaxis: logPeriod })

 useLayoutEffect(() => {
  dispatch(resetLogsGraphData())
 }, [dispatch])

 useEffect(() => {
  dispatch(
   getLogs({
    ...payload,
    page: logPage,
    pageSize: logRowsPerPage
   })
  )
 }, [logPage, logRowsPerPage])

 const onGetLogs = data => {
  const customerId = customer?._id
  dispatch(ChangeLogPage(0))
  dispatch(
   getLogs({
    customerId,
    machineId: id,
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

 const handleLogTypeChange = useCallback(
  newLogType => {
   setValue('logType', newLogType)
   trigger('logType')
  },
  [setValue, trigger]
 )

 useEffect(() => {
  if (logPeriod && logGraphType) {
   const customerId = machine?.customer?._id
   const LogType = 'erp'
   dispatch(getLogGraphData(customerId, id, LogType, logPeriod, logGraphType?.key))
  }
 }, [logPeriod, logGraphType])

 const payload = {
  customerId: customer?._id,
  machineId: id || undefined,
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
  <Fragment>
   <FormProvider methods={methods} onSubmit={handleSubmit(onGetLogs)}>
    <Grid container spacing={2} mt={3}>
     <Grid item xs={12} sm={12}>
      <LogsTableController
       customers={customers}
       handleCustomerChange={handleCustomerChange}
       customerMachines={customerMachines}
       handleMachineChange={handleMachineChange}
       handleLogTypeChange={handleLogTypeChange}
       handlePeriodChange={handlePeriodChange}
       setSelectedFilter={setSelectedSearchFilter}
       isGraphPage={() => true}
       methods={methods}
       onGetLogs={onGetLogs}
      />
     </Grid>
    </Grid>
   </FormProvider>
   {isLoading ? (
    <HowickLoader height={300} width={303} mode={themeMode} />
   ) : logGraphType.key === 'production_total' ? (
    <ERPProductionTotal timePeriod={logPeriod} customer={machine?.customer} graphLabels={graphLabels} logsGraphData={logsGraphData} isDashboard />
   ) : (
    <ERPProductionRate timePeriod={logPeriod} customer={machine?.customer} graphLabels={graphLabels} logsGraphData={logsGraphData} isDashboard />
   )}
  </Fragment>
 )
}

MachineGraphsTab.propTypes = {
 logType: PropTypes.object,
 isLogsPage: PropTypes.bool,
 payload: PropTypes.object
}

export default MachineGraphsTab
