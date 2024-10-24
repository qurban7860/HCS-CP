import { Fragment, useEffect, useState, memo, useLayoutEffect, useReducer, useCallback } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { useSelector, dispatch } from 'store'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useAuthContext } from 'auth'
import { useTable, useFilter, getComparator, useSettingContext } from 'hook'
import {
 getCustomers,
 getLogGraphData,
 getSecurityUser,
 getLogRecords,
 ChangeLogPage,
 ChangeLogRowsPerPage,
 resetLogsGraphData,
 resetLogRecords,
 resetLogRecord,
 resetSecurityUser,
 setLogFilterBy,
 getCustomerMachines,
 resetCustomerMachines
} from 'store/slice'
import _ from 'lodash'
import { Table, Grid, Box, Card, Stack, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { TableNoData, MotionLazyContainer, SkeletonTable, TableTitleBox, TablePaginationCustom, Scrollbar } from 'component'
import FormProvider, { RHFAutocomplete, RHFDatePicker, RHFFilteredSearchBar } from 'component/hook-form'
import { LogsPagination, tableColumnsReducer, LogsTable, logDefaultValues } from 'section/log'
import { addLogSchema } from 'schema'
import { useTheme } from '@mui/material/styles'
import { GStyledTableHeaderBox, GStyledLoadingButton } from 'theme/style'
import { MARGIN, TABLE, LOG_TYPE_CONFIG } from 'config'
import { getLogTypeConfigForGenerationAndType, logGraphTypes } from 'config/log-types'
import { KEY, FLEX, FLEX_DIR } from 'constant'
import { applySort } from 'util'
import { StyledScrollTableContainer, StyledHeaderTableCell } from './style'
import { t } from 'i18next'

const LogsSection = ({ isArchived }) => {
 const [tableData, setTableData] = useState([])
 const [selectedSearchFilter, setSelectedSearchFilter] = useState('')
 const [selectedLog, setSelectedLog] = useState(null)
 const [openLogDetailsDialog, setOpenLogDetailsDialog] = useState(false)
 const [graphLabels, setGraphLabels] = useState({ yaxis: 'Cumulative Total Value', xaxis: 'Months' })
 const { machines, customerMachines, initial, isLoading, machinePage, machineRowsPerPage } = useSelector(state => state.machine)
 const { logs, logPage, logRowsPerPage } = useSelector(state => state.log)
 const { customers } = useSelector(state => state.customer)
 const { securityUser } = useSelector(state => state.user)

 const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, getLogTypeConfigForGenerationAndType(5, 'ERP').tableColumns)
 const { userId, user } = useAuthContext()
 const { themeMode } = useSettingContext()
 const [searchParams] = useSearchParams()
 const theme = useTheme()

 const denseHeight = TABLE.DENSE_HEIGHT

 const axiosToken = () => axios.CancelToken.source()
 const isGraphPage = () => searchParams.get('type') === 'erpGraph'

 const {
  order,
  orderBy,
  setPage: setTablePage,
  onSort
 } = useTable({
  defaultOrderBy: KEY.CREATED_AT,
  defaultOrder: KEY.DESC
 })

 const dataFiltered = applySort({
  inputData: tableData,
  comparator: getComparator(order, orderBy)
 })

 //  const date = moment().subtract(30, 'days')
 //  if (date.isValid()) {
 //   console.log('The date is valid:', date.format('YYYY-MM-DD'))
 //  } else {
 //   console.log('The date is not valid')
 //  }

 //  const defaultValues = {
 //   customer: null,
 //   machine: null,
 //   logType: getLogTypeConfigForGenerationAndType(5, 'ERP') || null,
 //   dateFrom: '2021-09-01',
 //   dateTo: '2021-09-30',
 //   logPeriod: 'Monthly',
 //   logGraphType: logGraphTypes[0]
 //  }

 const defaultValues = logDefaultValues(user?.customer, customerMachines[0])
 const methods = useForm({
  resolver: yupResolver(addLogSchema),
  defaultValues
 })

 const { watch, setValue, handleSubmit, trigger } = methods
 const { customer, machine, dateFrom, dateTo, logType, filteredSearchKey, logPeriod, logGraphType, activeStatus } = watch()

 useEffect(() => {
  dispatch(getCustomers())
 }, [])

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
   getLogRecords({
    customerId,
    machineId,
    page: 0,
    pageSize: logRowsPerPage,
    fromDate: dateFrom,
    toDate: dateTo,
    isMachineArchived: machine?.isArchived,
    isArchived: false,
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

 useEffect(() => {
  setTableData(logs?.data || [])
 }, [logs])

 useEffect(() => {
  const newColumns = logType?.tableColumns
  if (newColumns) {
   dispatchTableColumns({
    type: 'handleLogTypeChange',
    newColumns,
    logPage
   })
  }
 }, [logPage, logType])

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   dispatch(
    getLogRecords({
     customerId: machine?.customer?._id,
     machineId: machine?._id || undefined,
     page: 0,
     pageSize: logRowsPerPage,
     fromDate: dateFrom,
     toDate: dateTo,
     isArchived: activeStatus === 'archived',
     isMachineArchived: machine?.isArchived,
     selectedLogType: logType.type,
     searchKey: filteredSearchKey,
     searchColumn: selectedSearchFilter
    })
   )
  }, 300)
  debouncedDispatch()
  return () => debouncedDispatch.cancel()
 }, [dispatch, machinePage, machineRowsPerPage, isArchived])

 //  const { filterName, handleFilterName, filteredData } = useFilter(getComparator(order, orderBy), tableData, initial, ChangeLogPage, setLogFilterBy)

 const handleChangePage = (event, newPage) => {
  if (newPage < Math.ceil(dataFiltered.length / machineRowsPerPage)) {
   dispatch(ChangeLogPage(newPage))
  }
 }

 const handleChangeRowsPerPage = event => {
  dispatch(ChangeLogPage(0))
  dispatch(ChangeLogRowsPerPage(parseInt(event.target.value, 10)))
 }

 const handleCustomerChange = useCallback(
  newCustomer => {
   setValue('customer', newCustomer)
   setValue('machine', null)
   trigger(['customer', 'machine'])
   dispatch(resetLogRecords())
  },
  [dispatch, setValue, trigger]
 )

 const handleMachineChange = useCallback(
  newMachine => {
   setValue('machine', newMachine)
   trigger('machine')
   dispatch(resetLogRecords())
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

 const dataForApi = {
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

 const handleColumnButtonClick = (columnId, newCheckState) => {
  dispatchTableColumns({ type: 'updateColumnCheck', columnId, newCheckState })
 }

 const returnSearchFilterColumnOptions = () => logType?.tableColumns.filter(item => item?.searchable && item?.page !== 'allMachineLogs')

 const isNotFound = !isLoading && !dataFiltered.length

 const refreshLogsList = () => {
  dispatch(
   getLogRecords({
    ...dataForApi,
    page: logPage,
    pageSize: logRowsPerPage
   })
  )
 }

 const handleViewRow = id => {
  const log = dataFiltered.find(item => item._id === id)
  setSelectedLog({
   ...log,
   customer: log.customer?.name || '',
   machine: log.machine?.serialNo || '',
   createdBy: log.createdBy?.name || '',
   updatedBy: log.updatedBy?.name || ''
  })
  setOpenLogDetailsDialog(true)
 }

 return (
  <MotionLazyContainer display={FLEX.FLEX}>
   <TableTitleBox title={'Logs'} user={securityUser} />
   <FormProvider methods={methods} onSubmit={handleSubmit(onGetLogs)}>
    <Grid container spacing={2} mt={3}>
     <Grid item xs={8}>
      <Card
       sx={{ p: 3, background: themeMode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[800], color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white }}>
       <Stack spacing={2}>
        <Box rowGap={2} columnGap={2} display='grid' gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}>
         <RHFAutocomplete
          name='customer'
          label={t('customer.label')}
          required
          options={customers || []}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          getOptionLabel={option => `${option?.name || ''}`}
          renderOption={(props, option) => (
           <li {...props} key={option?._id}>
            {' '}
            {option?.name || ''}{' '}
           </li>
          )}
          onChange={(e, newValue) => handleCustomerChange(newValue)}
          size='small'
         />
         <RHFAutocomplete
          name='machine'
          label={t('machine.label')}
          options={customerMachines || []}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          getOptionLabel={option => `${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}
          renderOption={(props, option) => <li {...props} key={option?._id}>{`${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}</li>}
          onChange={(e, newValue) => handleMachineChange(newValue)}
          size='small'
         />
        </Box>
        {!isGraphPage() && (
         <Fragment>
          <Box display='grid' gap={2} gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)' }} sx={{ flexGrow: 1 }}>
           <RHFDatePicker
            label='Start Date'
            name='dateFrom'
            size='small'
            value={dateFrom}
            onChange={newValue => {
             setValue('dateFrom', newValue)
             trigger(['dateFrom', 'dateTo'])
            }}
           />
           <RHFDatePicker
            label='End Date'
            name='dateTo'
            size='small'
            value={dateTo}
            onChange={newValue => {
             setValue('dateTo', newValue)
             trigger(['dateFrom', 'dateTo'])
            }}
           />
          </Box>
          <Box rowGap={2} columnGap={2} display='grid' gridTemplateColumns={{ xs: '1fr', sm: '1fr 2.5fr .5fr' }}>
           <RHFAutocomplete
            name='logType'
            size='small'
            label='Log Type*'
            options={LOG_TYPE_CONFIG.gen5}
            getOptionLabel={option => option.type || ''}
            isOptionEqualToValue={(option, value) => option?.type === value?.type}
            onChange={(e, newValue) => handleLogTypeChange(newValue)}
            renderOption={(props, option) => (
             <li {...props} key={option?.type}>
              {option.type || ''}
             </li>
            )}
            disableClearable
            autoSelect
            openOnFocus
            fullWidth
            getOptionDisabled={option => option?.disabled}
           />
           <Box sx={{ flexGrow: 1, width: { xs: '100%', sm: 'auto' } }}>
            <RHFFilteredSearchBar
             name='filteredSearchKey'
             filterOptions={returnSearchFilterColumnOptions()}
             setSelectedFilter={setSelectedSearchFilter}
             selectedFilter={selectedSearchFilter}
             placeholder='Enter Search here...'
             fullWidth
            />
           </Box>
           <GStyledLoadingButton mode={themeMode} type='button' onClick={handleSubmit(onGetLogs)} variant='contained' size='small'>
            {t('log.button.get_logs').toUpperCase()}
           </GStyledLoadingButton>
          </Box>
         </Fragment>
        )}
        {isGraphPage() && (
         <Stack direction='row' spacing={2} sx={{ width: '100%' }}>
          <Box sx={{ width: '50%' }}>
           <RHFAutocomplete
            name='logPeriod'
            label={t('log.period.label')}
            options={['Daily', 'Monthly', 'Quarterly', 'Yearly']}
            onChange={(e, newValue) => handlePeriodChange(newValue)}
            size='small'
            disableClearable
            required
           />
          </Box>
          <Box sx={{ width: '50%' }}>
           <RHFAutocomplete
            name='logGraphType'
            label='Graph Type*'
            options={logGraphType}
            onChange={(e, newValue) => handleGraphTypeChange(newValue)}
            getOptionLabel={option => option.name || ''}
            isOptionEqualToValue={(option, value) => option?.key === value?.key}
            renderOption={(props, option) => (
             <li {...props} key={option?.key}>
              {option.name || ''}
             </li>
            )}
            disableClearable
            size='small'
           />
          </Box>
         </Stack>
        )}
       </Stack>
      </Card>
     </Grid>
    </Grid>
   </FormProvider>

   <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
    <Grid item lg={12}>
     <Grid container mb={2}>
      <Grid item lg={12} sm={12} mb={2} bgcolor='background.paper'>
       <GStyledTableHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={2} />
       <LogsPagination
        mode={themeMode}
        data={dataFiltered}
        page={logPage}
        rowsPerPage={logRowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        columnFilterButtonData={tableColumns}
        handleColumnButtonClick={handleColumnButtonClick}
       />
       <StyledScrollTableContainer>
        <Table>
         <TableHead>
          <TableRow>
           {dataFiltered.length > 0 &&
            tableColumns?.map((headCell, index) => {
             if (!headCell?.checked) return null
             return (
              <StyledHeaderTableCell
               key={headCell.id}
               mode={themeMode}
               align={headCell?.numerical ? 'right' : 'left'}
               sortDirection={orderBy === headCell.id ? order : false}
               sx={{ width: headCell.width, minWidth: headCell.minWidth }}>
               {onSort ? (
                <TableSortLabel
                 hideSortIcon
                 active={orderBy === headCell.id}
                 direction={orderBy === headCell.id ? order : 'asc'}
                 onClick={() => onSort(headCell.id)}
                 sx={{ textTransform: 'capitalize' }}>
                 {headCell.label}
                </TableSortLabel>
               ) : (
                headCell.label
               )}
              </StyledHeaderTableCell>
             )
            })}
          </TableRow>
         </TableHead>
         {(isLoading ? [...Array(logRowsPerPage)] : dataFiltered)
          .slice(logPage * logRowsPerPage, logPage * logRowsPerPage + logRowsPerPage)
          .map((row, index) =>
           row ? (
            <LogsTable
             key={row._id}
             row={row}
             columns={tableColumns}
             onViewRow={() => handleViewRow(row._id)}
             mode={themeMode}
             index={index}
             dataFiltered={dataFiltered}
             onSort={onSort}
             order={order}
             orderBy={orderBy}
            />
           ) : (
            !isNotFound && <SkeletonTable key={index} sx={{ height: denseHeight }} />
           )
          )}
         <TableNoData isNotFound={isNotFound} />
        </Table>
       </StyledScrollTableContainer>
      </Grid>
     </Grid>
    </Grid>
   </Grid>
  </MotionLazyContainer>
 )
}

LogsSection.propTypes = {
 isArchived: PropTypes.bool
}

export default memo(LogsSection)
