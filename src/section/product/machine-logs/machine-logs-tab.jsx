import { Fragment, useEffect, useReducer, useState, useCallback, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuthContext } from 'auth'
import { useTable, getComparator, useSettingContext } from 'hook'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCustomers, getSecurityUser, getLogs, ChangeLogPage, ChangeLogRowsPerPage, resetLogs, resetSecurityUser } from 'store/slice'
import { addLogSchema } from 'schema'
import { Grid, Table } from '@mui/material'
import { MotionLazyContainer, TableTitleBox, TableNoData, SkeletonTable, LogDetailsDialog } from 'component'
import FormProvider from 'component/hook-form'
import { LogsTableController, useLogDefaultValues, LogsTable, LogsPagination, tableColumnsReducer } from 'section/log/logs'
import { MachineLogsTable } from 'section/product'
import { GStyledTableHeaderBox } from 'theme/style'
import { MARGIN } from 'config'
import { getLogTypeConfigForGenerationAndType, logGraphTypes } from 'config/log-types'
import { FLEX, FLEX_DIR, KEY } from 'constant'
import { applySort, fDateTime } from 'util'

const MachineLogsTab = () => {
 const [selectedSearchFilter, setSelectedSearchFilter] = useState('')
 const [openLogDetailsDialog, setOpenLogDetailsDialog] = useState(false)
 const [selectedLog, setSelectedLog] = useState(null)
 const [logComponentTitle, setLogComponentTitle] = useState({ date: '', componentLabel: '' })
 const [tableData, setTableData] = useState([])
 const { logs, logPage, logsTotalCount, isLoading, logRowsPerPage } = useSelector(state => state.log)
 const { securityUser } = useSelector(state => state.user)
 const { customers } = useSelector(state => state.customer)
 const { customerMachines } = useSelector(state => state.machine)
 const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, getLogTypeConfigForGenerationAndType(5, 'ERP').tableColumns)

 const { userId, user } = useAuthContext()
 const { themeMode } = useSettingContext()
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
  dispatch(
   getLogs({
    ...payload,
    page: logPage,
    pageSize: logRowsPerPage
   })
  )
 }, [logPage, logRowsPerPage])

 useEffect(() => {
  setTableData(logs?.data || [])
 }, [logs])

 //  useEffect(() => {
 //   const newColumns = logType?.tableColumns
 //   if (newColumns) {
 //    dispatchTableColumns({
 //     type: 'handleLogTypeChange',
 //     newColumns,
 //     allMachineLogsPage: isLogsPage
 //    })
 //   }
 //  }, [logType])

 const { order, orderBy, selected, onSort } = useTable({
  defaultOrderBy: KEY.CREATED_AT,
  defaultOrder: KEY.DESC
 })

 const dataFiltered = applySort({
  inputData: tableData,
  comparator: getComparator(order, orderBy)
 })

 const handleChangePage = (event, newPage) => {
  dispatch(ChangeLogPage(newPage))
 }

 const handleChangeRowsPerPage = event => {
  dispatch(ChangeLogPage(0))
  dispatch(ChangeLogRowsPerPage(parseInt(event.target.value, 10)))
 }

 const handleColumnButtonClick = (columnId, newCheckState) => {
  dispatchTableColumns({ type: 'updateColumnCheck', columnId, newCheckState })
 }

 const handleViewRow = (id, row) => {
  const log = dataFiltered.find(item => item._id === id)
  setLogComponentTitle({ date: `${fDateTime(row?.date)}`, componentLabel: row?.componentLabel })
  setSelectedLog({
   ...log,
   customer: log.customer?.name || '',
   machine: log.machine?.serialNo || '',
   createdBy: log.createdBy?.name || '',
   updatedBy: log.updatedBy?.name || ''
  })
  setOpenLogDetailsDialog(true)
 }

 const refreshLogsList = () => {
  dispatch(
   getLogs({
    ...payload,
    page: logPage,
    pageSize: logRowsPerPage
   })
  )
 }

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
   <MotionLazyContainer display={FLEX.FLEX}>
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

    <MachineLogsTable isLogsPage={false} logType={logType} payload={payload} />
   </MotionLazyContainer>
  </Fragment>
 )
}

MachineLogsTab.propTypes = {
 logType: PropTypes.object,
 isLogsPage: PropTypes.bool,
 payload: PropTypes.object
}

export default MachineLogsTab
