import { Fragment, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { useSearchParams, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getLogs, ChangeLogPage, resetLogs } from 'store/slice'
import { addLogSchema } from 'schema'
import { Grid } from '@mui/material'
import { MotionLazyContainer } from 'component'
import FormProvider from 'component/hook-form'
import { LogsTableController, useLogDefaultValues } from 'section/log/logs'
import { MachineLogsTable } from 'section/product'
import { FLEX } from 'constant'

const MachineLogsTab = () => {
 const [selectedSearchFilter, setSelectedSearchFilter] = useState('')
 const { logPage, logRowsPerPage } = useSelector(state => state.log)
 const { customers } = useSelector(state => state.customer)
 const { customerMachines } = useSelector(state => state.machine)

 const [searchParams] = useSearchParams()
 const { id } = useParams()
 const isGraphPage = () => searchParams.get('type') === 'erpGraph'

 const defaultValues = useLogDefaultValues(customers[0], customerMachines[0])
 const methods = useForm({
  resolver: yupResolver(addLogSchema),
  defaultValues
 })

 const { watch, setValue, handleSubmit, trigger } = methods
 const { customer, machine, dateFrom, dateTo, logType, filteredSearchKey } = watch()

 useEffect(() => {
  if (id) {
   dispatch(
    getLogs({
     ...payload,
     machineId: id,
     page: logPage,
     pageSize: logRowsPerPage
    })
   )
  }
 }, [logPage, logRowsPerPage])

 const onGetLogs = data => {
  const customerId = customer._id
  //   const machineId = id || undefined
  dispatch(ChangeLogPage(0))
  dispatch(
   getLogs({
    customerId,
    id,
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

 const handleLogTypeChange = useCallback(
  newLogType => {
   setValue('logType', newLogType)
   trigger('logType')
  },
  [setValue, trigger]
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
  <Fragment>
   <FormProvider methods={methods} onSubmit={handleSubmit(onGetLogs)}>
    <Grid container spacing={2}>
     <Grid item xs={12} md={12}>
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
   <MachineLogsTable isLogsPage={false} logType={logType} payload={payload} />
  </Fragment>
 )
}

MachineLogsTab.propTypes = {
 logType: PropTypes.object,
 isLogsPage: PropTypes.bool,
 payload: PropTypes.object
}

export default MachineLogsTab
