import { Fragment, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { dispatch } from 'store'
import { useForm } from 'react-hook-form'
import { useSettingContext } from 'hook'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthContext } from 'auth/use-auth-context'
import { getLogGraphData, setSelectedSearchFilter } from 'store/slice/log/machineLog'
import { erpGraphSchema } from 'schema/graph/erp-graph-schema'
import { LogsTableController, useLogDefaultValues } from 'section/log/logs'
import { ERPProductionTotal, ERPProductionRate } from 'section/log'
import { Grid, Box } from '@mui/material'
import { HowickLoader } from 'component'
import FormProvider from 'component/hook-form'
import { GStyledStickyDiv } from 'theme/style'
import { NAV } from 'config/layout'
import { TableNoData } from 'component'

const MachineGraphsTab = () => {
  const { isLoading, logsGraphData } = useSelector(state => state.machineLog)
  const { machine } = useSelector(state => state.machine)
  const { themeMode } = useSettingContext()
  const { user } = useAuthContext()
  const defaultValues = useLogDefaultValues(user?.customer, machine)
  const { machineId } = useParams()
  const [submittedValues, setSubmittedValues] = useState(null)
  const [hasFetchedInitially, setHasFetchedInitially] = useState(false);

  const methods = useForm({
    resolver: yupResolver(erpGraphSchema),
    defaultValues,
    mode: 'all',
    reValidateMode: 'onChange',
  })

  const { setValue, handleSubmit, getValues, watch, trigger } = methods

  const logPeriodData = watch('logPeriod');
  const logGraphTypeData = watch('logGraphType');
  const dateFromData = watch('dateFrom');
  const dateToData = watch('dateTo');
  const unitTypeData = watch('unitType');

  const [graphLabels, setGraphLabels] = useState({
    yaxis: 'Meterage Produced',
    xaxis: defaultValues.logPeriod || 'Daily'
  })

  useEffect(() => {
    if (hasFetchedInitially) {
      setSubmittedValues(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logGraphTypeData, logPeriodData, dateFromData, dateToData, unitTypeData]);

  useEffect(() => {
    const now = new Date();
    const newDateFrom = new Date(now);

    newDateFrom.setHours(0, 0, 0, 0);
    now.setHours(23, 59, 59, 999);

    switch (logPeriodData) {
      case 'Hourly':
        break;

      case 'Daily':
        newDateFrom.setDate(newDateFrom.getDate() - 30);
        break;

      case 'Monthly':
        newDateFrom.setMonth(newDateFrom.getMonth() - 11);
        newDateFrom.setDate(1);
        break;

      case 'Quarterly':
        newDateFrom.setMonth(newDateFrom.getMonth() - 35);
        newDateFrom.setMonth(Math.floor(newDateFrom.getMonth() / 3) * 3, 1);
        break;

      case 'Yearly':
        newDateFrom.setFullYear(newDateFrom.getFullYear() - 9);
        newDateFrom.setMonth(0, 1);
        break;

      default:
        newDateFrom.setDate(newDateFrom.getDate() - 30);
        break;
    }

    setValue('dateTo', now);
    setValue('dateFrom', newDateFrom);
    trigger(['dateFrom', 'dateTo']);
  }, [logPeriodData, setValue, trigger]);

  const handleFormSubmit = useCallback(() => {
    const { logPeriod, logGraphType, dateFrom, dateTo, unitType } = getValues()
    const customerId = machine?.customer?._id
    if (!customerId || !logGraphType?.key) return

    const payload = { logPeriod, logGraphType, dateFrom, dateTo, unitType }
    setSubmittedValues(payload)

    dispatch(getLogGraphData(customerId, machineId, 'erp', logPeriod, logGraphType.key, dateFrom, dateTo))
    
    const unitLabel = unitType === 'Imperial' ? 'in' : 'm';

    setGraphLabels({
      yaxis:
        logGraphType.key === 'productionRate'
          ? `Production Rate (${unitLabel}/hr)`
          : `Meterage Produced (${unitLabel})`,
      xaxis: logPeriod,
    })
  }, [getValues, machine?.customer?._id, machineId])

  useEffect(() => {
    if (
      defaultValues?.logGraphType &&
      defaultValues?.logPeriod &&
      defaultValues?.dateFrom &&
      defaultValues?.dateTo &&
      machine?.customer?._id &&
      defaultValues?.unitType 
    ) {
      handleFormSubmit();
      setHasFetchedInitially(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues, machine?.customer?._id, machineId]);

  const handlePeriodChange = useCallback((newPeriod) => {
    setValue('logPeriod', newPeriod)
  }, [setValue])

  const handleGraphTypeChange = useCallback((newGraphType) => {
    setValue('logGraphType', newGraphType)
  }, [setValue])


  const isNotFound = !submittedValues && !isLoading;

  return (
    <Grid item xs={12} sx={{ mb: 3, height: '100%' }} >
      <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
        <LogsTableController
          handlePeriodChange={handlePeriodChange}
          handleGraphTypeChange={handleGraphTypeChange}
          setSelectedFilter={setSelectedSearchFilter}
          isGraphPage
          methods={methods}
          onGetGraph={handleSubmit(handleFormSubmit)}
        />
      </FormProvider>

      {isLoading ? (
        <HowickLoader height={300} width={303} mode={themeMode} />
      ) : submittedValues ? (
        submittedValues?.logGraphType?.key === 'production_total' ? (
          <ERPProductionTotal timePeriod={graphLabels.xaxis} customer={machine?.customer} graphLabels={graphLabels} logsGraphData={logsGraphData} isDashboard dateFrom={submittedValues.dateFrom} dateTo={submittedValues.dateTo} machineSerialNo={machine?.serialNo} unitType={submittedValues.unitType}/>
        ) : (
          <ERPProductionRate timePeriod={graphLabels.xaxis} customer={machine?.customer} graphLabels={graphLabels} logsGraphData={logsGraphData} isDashboard dateFrom={submittedValues.dateFrom} dateTo={submittedValues.dateTo} machineSerialNo={machine?.serialNo} unitType={submittedValues.unitType}/>
        )
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 350 }} >
          <TableNoData clickButton={isNotFound} />
        </Box>
      )}
    </Grid>
  )
}

MachineGraphsTab.propTypes = {
  logType: PropTypes.object,
  isLogsPage: PropTypes.bool
}

export default MachineGraphsTab
