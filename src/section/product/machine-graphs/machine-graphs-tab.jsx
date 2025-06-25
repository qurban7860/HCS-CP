import { Fragment, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { dispatch } from 'store'
import { useForm } from 'react-hook-form'
import { useSettingContext } from 'hook'
import { yupResolver } from '@hookform/resolvers/yup'
import { getLogGraphData, setSelectedSearchFilter } from 'store/slice/log/machineLog'
import { erpGraphSchema } from 'schema/graph/erp-graph-schema'
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
    resolver: yupResolver(erpGraphSchema),
    defaultValues
  })

  const { setValue, handleSubmit, getValues } = methods
  const [graphLabels, setGraphLabels] = useState({
    yaxis: 'Produced Length and Waste (m)',
    xaxis: defaultValues.logPeriod || 'Daily'
  })

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
        : 'Produced Length and Waste (m)',
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
          : 'Produced Length and Waste (m)',
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
    <Fragment>
      <GStyledStickyDiv top={NAV.T_STICKY_NAV_MACH_GRAPG_CONTROLLER} zIndex={7}  >
        <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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

      {shouldShowLoader ? (
        <HowickLoader height={300} width={303} mode={themeMode} />
      ) : submittedValues?.logGraphType?.key === 'production_total' ? (
        <ERPProductionTotal timePeriod={graphLabels.xaxis} customer={machine?.customer} graphLabels={graphLabels} logsGraphData={logsGraphData} isDashboard dateFrom={submittedValues.dateFrom} dateTo={submittedValues.dateTo} />
      ) : (
        <ERPProductionRate timePeriod={graphLabels.xaxis} customer={machine?.customer} graphLabels={graphLabels} logsGraphData={logsGraphData} isDashboard dateFrom={submittedValues.dateFrom} dateTo={submittedValues.dateTo} />
      )}
    </Fragment>
  )
}

MachineGraphsTab.propTypes = {
  logType: PropTypes.object,
  isLogsPage: PropTypes.bool
}

export default MachineGraphsTab
