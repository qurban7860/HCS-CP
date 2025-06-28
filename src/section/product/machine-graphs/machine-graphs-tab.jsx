import { Fragment, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { dispatch } from 'store'
import { useForm } from 'react-hook-form'
import { useSettingContext } from 'hook'
import { yupResolver } from '@hookform/resolvers/yup'
import { getLogGraphData, setSelectedSearchFilter } from 'store/slice/log/machineLog'
import { fetchIndMachineGraphSchema } from 'schema/graph/erp-graph-schema'
import { LogsTableController, useLogDefaultValues } from 'section/log/logs'
import { ERPProductionTotal, ERPProductionRate } from 'section/log'
import { Grid } from '@mui/material'
import { HowickLoader } from 'component'
import FormProvider from 'component/hook-form'
import { GStyledStickyDiv } from 'theme/style'
import { NAV } from 'config/layout'

const MachineGraphsTab = () => {
  const { isLoading, logsGraphData } = useSelector(state => state.machineLog)
  const { machine } = useSelector(state => state.machine)
  const { themeMode } = useSettingContext()
  const defaultValues = useLogDefaultValues()
  const { machineId } = useParams()

  const methods = useForm({
    resolver: yupResolver(fetchIndMachineGraphSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues
  })

  const { setValue, handleSubmit, getValues, watch, trigger } = methods

  const logPeriodWatched = watch('logPeriod');

  const [graphLabels, setGraphLabels] = useState({
    yaxis: 'Meterage Produced',
    xaxis: defaultValues.logPeriod || 'Daily'
  })

  useEffect(() => {
    const now = new Date();
    const newDateFrom = new Date(now);

    newDateFrom.setHours(0, 0, 0, 0);
    now.setHours(23, 59, 59, 999);

    switch (logPeriodWatched) {
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
  }, [logPeriodWatched, setValue, trigger]);

  const [submittedValues, setSubmittedValues] = useState(null)

  const handleFormSubmit = useCallback(() => {
    const { logPeriod, logGraphType, dateFrom, dateTo } = getValues()
    const customerId = machine?.customer?._id
    if (!customerId || !logGraphType?.key) return

    const payload = { logPeriod, logGraphType, dateFrom, dateTo }
    setSubmittedValues(payload)

    dispatch(getLogGraphData(customerId, machineId, 'erp', logPeriod, logGraphType.key, dateFrom, dateTo))

    setGraphLabels({
      yaxis: logGraphType.key === 'productionRate'
        ? 'Production Rate (m/hr)'
        : 'Meterage Produced',
      xaxis: logPeriod
    })
  }, [getValues, machine?.customer?._id, machineId])

  useEffect(() => {
    if (defaultValues?.logGraphType && defaultValues?.logPeriod && defaultValues?.dateFrom && defaultValues?.dateTo && machine?.customer?._id) {
      const { logPeriod, logGraphType, dateFrom, dateTo } = defaultValues
      const customerId = machine?.customer?._id

      const payload = { logPeriod, logGraphType, dateFrom, dateTo }
      setSubmittedValues(payload)

      dispatch(getLogGraphData(customerId, machineId, 'erp', logPeriod, logGraphType.key, dateFrom, dateTo))

      setGraphLabels({
        yaxis: logGraphType.key === 'productionRate'
          ? 'Production Rate (m/hr)'
          : 'Meterage Produced',
        xaxis: logPeriod
      })
    }

  }, [defaultValues, machine?.customer?._id, machineId])

  const handlePeriodChange = useCallback((newPeriod) => {
    setValue('logPeriod', newPeriod)
  }, [setValue])

  const handleGraphTypeChange = useCallback((newGraphType) => {
    setValue('logGraphType', newGraphType)
  }, [setValue])

  const shouldShowLoader = isLoading || !submittedValues || !logsGraphData

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

      {
        shouldShowLoader ? (
          <HowickLoader height={300} width={303} mode={themeMode} />
        ) : submittedValues?.logGraphType?.key === 'production_total' ? (
          <ERPProductionTotal timePeriod={graphLabels.xaxis} customer={machine?.customer} graphLabels={graphLabels} logsGraphData={logsGraphData} isDashboard dateFrom={submittedValues.dateFrom} dateTo={submittedValues.dateTo} machineSerialNo={machine?.serialNo} />
        ) : (
          <ERPProductionRate timePeriod={graphLabels.xaxis} customer={machine?.customer} graphLabels={graphLabels} logsGraphData={logsGraphData} isDashboard dateFrom={submittedValues.dateFrom} dateTo={submittedValues.dateTo} machineSerialNo={machine?.serialNo} />
        )
      }
    </Grid >
  )
}

MachineGraphsTab.propTypes = {
  logType: PropTypes.object,
  isLogsPage: PropTypes.bool
}

export default MachineGraphsTab
