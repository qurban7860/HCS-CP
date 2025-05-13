import { Fragment, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { dispatch } from 'store'
import { useForm } from 'react-hook-form'
import { useSettingContext } from 'hook'
import { yupResolver } from '@hookform/resolvers/yup'
import { getLogGraphData, setSelectedSearchFilter, resetLogsGraphData } from 'store/slice/log/machineLog'
import { addLogSchema } from 'schema'
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
    resolver: yupResolver(addLogSchema),
    defaultValues
  })

  const { watch, setValue, handleSubmit } = methods
  const { logPeriod, logGraphType, dateFrom, dateTo } = watch()
  const [graphLabels, setGraphLabels] = useState({ yaxis: 'Produced Length and Waste (m)', xaxis: logPeriod })
  
  useEffect(() => {
    if (logPeriod && logGraphType && dateFrom && dateTo && machine?.customer?._id) {
      handleFormSubmit()
    }
    return () => {
      dispatch(resetLogsGraphData())
    }
  }, [])

  const handleFormSubmit = useCallback(() => {
    const customerId = machine?.customer?._id
    if (!customerId || !logGraphType?.key) return

    dispatch(getLogGraphData(
      customerId,
      machineId,
      'erp',
      logPeriod,
      logGraphType.key,
      new Date(new Date(dateFrom).setHours(0, 0, 0, 0)),
      new Date(new Date(dateTo).setHours(23, 59, 59, 999))
    ))
  }, [logPeriod, logGraphType, dateFrom, dateTo, machine?.customer?._id, machineId])

  const handlePeriodChange = useCallback(newPeriod => {
    setValue('logPeriod', newPeriod)
    switch (newPeriod) {
      case 'Hourly':
        setGraphLabels(prev => ({ ...prev, xaxis: 'Hours' }))
        break
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
  }, [setValue])

  const handleGraphTypeChange = useCallback(newGraphType => {
    setValue('logGraphType', newGraphType)
    if (newGraphType?.key === 'productionRate') {
      setGraphLabels(prev => ({ ...prev, yaxis: 'Production Rate (m/hr) ', xaxis: logPeriod }))
    } else {
      setGraphLabels(prev => ({ ...prev, yaxis: 'Produced Length and Waste (m)', xaxis: logPeriod }))
    }
  }, [setValue])

  return (
    <Fragment>
      <GStyledStickyDiv top={NAV.T_STICKY_NAV_MACH_CONTROLLER} zIndex={7}>
        <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <LogsTableController
                handlePeriodChange={handlePeriodChange}
                handleGraphTypeChange={handleGraphTypeChange}
                setSelectedFilter={setSelectedSearchFilter}
                isGraphPage
                methods={methods}
                onGetGraph={handleFormSubmit}
              />
            </Grid>
          </Grid>
        </FormProvider>
      </GStyledStickyDiv>
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
}

export default MachineGraphsTab
