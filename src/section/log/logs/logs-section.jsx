import { Fragment, useEffect, useState, memo, useLayoutEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import _ from 'lodash'
import { t } from 'i18next'
import { useSearchParams } from 'react-router-dom'
import { Icon, ICON_NAME, useResponsive, useSettingContext } from 'hook'
import { useSelector, dispatch } from 'store'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { addLogSchema } from 'schema'
import { getCustomers, getLogGraphData, getLogs, ChangeLogPage, resetLogsGraphData, resetLogs, getCustomerMachines } from 'store/slice'
import { LogsTableController, ERPProductionTotal, ERPProductionRate, useLogDefaultValues } from 'section/log'
import { MachineLogsTable } from 'section/product'
import { useMediaQuery, useTheme, Grid, Button, Typography } from '@mui/material'
import { HowickLoader, TableTitleBox } from 'component'
import FormProvider from 'component/hook-form'
import { GStyledStickyDiv } from 'theme/style'
import { NAV } from 'config/layout'
import { FLEX, FLEX_DIR, KEY, TYPOGRAPHY } from 'constant'

const LogsSection = ({ isArchived }) => {
 const [pageType, setPageType] = useState('')
 const [expandedButton, setExpandedButton] = useState(null)
 const [searchParams, setSearchParams] = useSearchParams()
 const { customerMachines } = useSelector(state => state.machine)
 const { logPage, isLoading, logRowsPerPage, logsGraphData, selectedSearchFilter } = useSelector(state => state.log)
 const { customers } = useSelector(state => state.customer)

 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 const isMobile = useResponsive('down', 'sm')

 const axiosToken = () => axios.CancelToken.source()
 const cancelTokenSource = axiosToken()
 const isGraphPage = () => searchParams.get('type') === 'graph'

 const defaultValues = useLogDefaultValues()
 const methods = useForm({
  resolver: yupResolver(addLogSchema),
  defaultValues
 })

 const { watch, setValue, handleSubmit, trigger, reset } = methods
 const { customer, machine, dateFrom, dateTo, logType, filteredSearchKey, logPeriod, logGraphType } = watch()
 const [graphLabels, setGraphLabels] = useState({ yaxis: 'Cumulative Total Value', xaxis: logPeriod })

 useLayoutEffect(() => {
  resetLogs()
 }, [])

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   if (!customers.length) {
    dispatch(getCustomers(null, null, isArchived, cancelTokenSource))
   }
  }, 300)
  debouncedDispatch()
  return () => debouncedDispatch.cancel()
 }, [customers, dispatch])

 useEffect(() => {
  if (customers?.length > 0) {
   setValue('customer', customers[0])
  }
 }, [customers, setValue])

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   if (customer && !customerMachines.length) {
    dispatch(getCustomerMachines(customer._id))
   }
  }, 300)
  debouncedDispatch()
  return () => debouncedDispatch.cancel()
 }, [customer?._id, customerMachines, dispatch])

 useEffect(() => {
  setPageType(searchParams.get('type'))
 }, [searchParams])

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

 const handleClick = buttonId => {
  setExpandedButton(prev => (prev === buttonId ? null : buttonId))
 }

 const handleOnClick = async (buttonId, action) => {
  if (isMobile) {
   handleClick(buttonId)
   await new Promise(resolve => setTimeout(resolve, 300))
   action()
  } else {
   action()
  }
 }

 const handleErpLogToggle = () => {
  setSearchParams({ type: pageType === 'graph' ? 'logs' : 'graph' })
 }

 const payload = {
  customerId: customer?._id,
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
  <Grid container rowGap={2} flexDirection={FLEX_DIR.COLUMN}>
   <GStyledStickyDiv top={0} zIndex={11} height={20}>
    <Grid container sx={{ display: FLEX.FLEX, justifyContent: FLEX.SPACE_BETWEEN }}>
     <TableTitleBox title={t('log.logs.label')} />
     <Button
      size='small'
      startIcon={<Icon icon={pageType === 'graph' ? ICON_NAME.LIST : ICON_NAME.GRAPH} sx={{ mr: 0.3 }} />}
      variant='outlined'
      sx={{
       color: themeMode === KEY.LIGHT ? theme.palette.common.black : theme.palette.common.white,
       borderColor: theme.palette.grey[500]
      }}
      onClick={() => handleOnClick('erpLog', handleErpLogToggle)}>
      {(!isMobile || expandedButton === 'erpLog') && <Typography variant={isDesktop ? TYPOGRAPHY.BODY0 : TYPOGRAPHY.BODY2}>{pageType === 'graph' ? 'Machine Logs' : 'See Graph'}</Typography>}
     </Button>
    </Grid>
   </GStyledStickyDiv>
   <GStyledStickyDiv top={NAV.T_STICKY_NAV_LOGS_CONTROLLER} zIndex={11}>
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
        isLogsPage={true}
        isGraphPage={isGraphPage}
        methods={methods}
        onGetLogs={onGetLogs}
       />
      </Grid>
     </Grid>
    </FormProvider>
   </GStyledStickyDiv>
   {!isGraphPage() && <MachineLogsTable isLogsPage logType={logType} payload={payload} />}
   {isGraphPage() && (
    <Fragment>
     {isLoading ? (
      <HowickLoader height={300} width={303} mode={themeMode} />
     ) : logGraphType.key === 'production_total' ? (
      <ERPProductionTotal timePeriod={logPeriod} customer={machine?.customer} graphLabels={graphLabels} logsGraphData={logsGraphData} />
     ) : (
      <ERPProductionRate timePeriod={logPeriod} customer={machine?.customer} graphLabels={graphLabels} logsGraphData={logsGraphData} />
     )}
    </Fragment>
   )}
  </Grid>
 )
}

LogsSection.propTypes = {
 isArchived: PropTypes.bool
}

export default memo(LogsSection)
