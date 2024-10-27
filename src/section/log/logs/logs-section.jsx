import { Fragment, useEffect, useState, memo, useLayoutEffect, useReducer, useCallback } from 'react'
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
import FormProvider, { RHFAutocomplete, RHFDatePicker, RHFFilteredSearchBar } from 'component/hook-form'
import { tableColumnsReducer, useLogDefaultValues } from 'section/log'
import { MachineLogsTab } from 'section/product'
import { addLogSchema } from 'schema'
import { useTheme } from '@mui/material/styles'
import { GStyledLoadingButton } from 'theme/style'
import { TABLE, LOG_TYPE_CONFIG } from 'config'
import { getLogTypeConfigForGenerationAndType, logGraphTypes } from 'config/log-types'
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
 const { themeMode } = useSettingContext()
 const [searchParams] = useSearchParams()
 const theme = useTheme()

 const denseHeight = TABLE.DENSE_HEIGHT

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
     <Grid item xs={12} sm={8}>
      <Card
       sx={{ p: 3, background: themeMode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[800], color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white }}>
       <Stack spacing={2}>
        <Box rowGap={2} columnGap={2} display='grid' gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}>
         <RHFAutocomplete
          required
          name='customer'
          label={t('customer.label')}
          options={customers || []}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          getOptionLabel={option => `${option?.name || ''}`}
          renderOption={(props, option) => (
           <li {...props} key={option?._id}>
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
            value={dateFrom}
            onChange={newValue => {
             setValue('dateFrom', newValue)
             trigger(['dateFrom', 'dateTo'])
            }}
           />
           <RHFDatePicker
            label='End Date'
            name='dateTo'
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
             filterOptions={logType?.tableColumns}
             setSelectedFilter={setSelectedSearchFilter}
             selectedFilter={selectedSearchFilter}
             placeholder='Looking for something?...'
             fullWidth
             helperText={selectedSearchFilter === '_id' ? 'To search by ID, you must enter the complete Log ID' : ''}
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
     <Grid item xs={12} sm={4}>
      <Card
       sx={{ p: 3, background: themeMode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[800], color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white }}>
       <Stack spacing={2}>
        <Box rowGap={2} columnGap={2} display='grid' gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' }}>
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
        </Box>
        {!isGraphPage() && (
         <Fragment>
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

   <MachineLogsTab isLogsPage logType={logType} dataForApi={payload} />
  </MotionLazyContainer>
 )
}

LogsSection.propTypes = {
 isArchived: PropTypes.bool
}

export default memo(LogsSection)
