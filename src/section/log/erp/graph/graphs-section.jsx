import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { t } from 'i18next'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from 'auth/use-auth-context'
import { HowickLoader, TableTitleBox } from 'component'
import { RHFAutocomplete, RHFDatePickr } from 'component/hook-form'
import { FLEX, FLEX_DIR, KEY, TYPOGRAPHY } from 'constant'
import { Icon, ICON_NAME, useResponsive, useSettingContext } from 'hook'
import { dispatch } from 'store'
import { getLogGraphData, resetLogsGraphData, getMachines, resetMachines } from 'store/slice'
import { GStyledControllerCardContainer, GStyledStickyDiv, GStyledLoadingButton } from 'theme/style'
import { NAV } from 'config'
import { PATH_LOGS } from 'route/path'
import { logGraphTypes } from 'config'
import ERPProductionTotal from './production-total'
import ERPProductionRate from './production-rate'

const GraphsSection = () => {
  const navigate = useNavigate()
  const { machines } = useSelector(state => state.machine)
  const { isLoading, logsGraphData } = useSelector(state => state.log)
  const { user } = useAuthContext()

  const defaultValues = useMemo(
    () => ({
      customer: user?.customer || null,
      machine: null,
      logPeriod: 'Daily',
      logGraphType: logGraphTypes[0],
      dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      dateTo: new Date()
      // dateFrom: new Date(new Date().setHours(0, 0, 0, 0)),
      // dateTo: new Date(new Date().setHours(23, 59, 59, 999)),
    }),
    []
  )

  const methods = useForm({
    defaultValues,
    mode: 'onChange'
  })

  const { watch, setValue, trigger, handleSubmit } = methods
  const { machine, logPeriod, logGraphType, dateFrom, dateTo } = watch()
  const [graphLabels, setGraphLabels] = useState({ yaxis: 'Produced Length and Waste (m)', xaxis: logPeriod })

  const { themeMode } = useSettingContext()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const isMobile = useResponsive('down', 'sm')

  useEffect(() => {
    dispatch(getMachines(null, null, false, null, user?.customer))
    return () => {
      dispatch(resetMachines())
      dispatch(resetLogsGraphData())
    }
  }, [dispatch])

  useEffect(() => {
    if (logGraphType?.key === 'productionRate') {
      setGraphLabels(prev => ({ ...prev, yaxis: 'Production Rate (m/hr) ', xaxis: logPeriod }))
    } else {
      setGraphLabels(prev => ({ ...prev, yaxis: 'Produced Length and Waste (m)', xaxis: logPeriod }))
    }
  }, [logGraphType])

  useEffect(() => {
    dispatch(
      getLogGraphData(
        user?.customer,
        null,
        'erp',
        defaultValues.logPeriod,
        defaultValues.logGraphType?.key,
        new Date(new Date(defaultValues.dateFrom).setHours(0, 0, 0, 0)),
        new Date(new Date(defaultValues.dateTo).setHours(23, 59, 59, 999))
      )
    )
  }, [dispatch, user?.customer])

  const onSubmit = data => {
    dispatch(
      getLogGraphData(
        user?.customer,
        data?.machine?._id,
        'erp',
        data?.logPeriod,
        data?.logGraphType?.key,
        new Date(new Date(data?.dateFrom).setHours(0, 0, 0, 0)),
        new Date(new Date(data?.dateTo).setHours(23, 59, 59, 999))
      )
    )
  }

  const handlePeriodChange = newPeriod => {
    setValue('logPeriod', newPeriod)
    switch (newPeriod) {
      case 'Monthly':
        setGraphLabels(prev => ({ ...prev, xaxis: 'Months' }))
        break
      case 'Hourly':
        setGraphLabels(prev => ({ ...prev, xaxis: 'Hours' }))
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
  }

  return (
    <Grid container rowGap={2} flexDirection={FLEX_DIR.COLUMN}>
      <GStyledStickyDiv top={0} zIndex={11} height={20}>
        <Grid container sx={{ display: FLEX.FLEX, justifyContent: FLEX.SPACE_BETWEEN }}>
          <TableTitleBox title={t('graph.label')} />
        </Grid>
      </GStyledStickyDiv>
      <GStyledStickyDiv top={NAV.T_STICKY_NAV_LOGS_CONTROLLER} zIndex={11}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} mt={3}>
              <Grid item xs={12} sm={12}>
                <GStyledControllerCardContainer height={'auto'} sx={{ display: FLEX.FLEX, flexDirection: FLEX_DIR.COLUMN, gap: 2 }}>
                  <Box rowGap={2} columnGap={2} display='grid' gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}>
                    <RHFDatePickr
                      label='Start Date'
                      name='dateFrom'
                      size='small'
                      value={dateFrom}
                      onChange={newValue => {
                        setValue('dateFrom', newValue)
                        trigger(['dateFrom', 'dateTo'])
                      }}
                    />
                    <RHFDatePickr
                      label='End Date'
                      name='dateTo'
                      size='small'
                      value={dateTo}
                      onChange={newValue => {
                        setValue('dateTo', newValue)
                        trigger(['dateFrom', 'dateTo'])
                      }}
                    />
                    <RHFAutocomplete
                      name='machine'
                      label={t('machine.label')}
                      options={(Array.isArray(machines) && machines?.filter(ma => ma?.machineModel?.category?.name?.toLowerCase()?.includes('frama'))) || []}
                      isOptionEqualToValue={(option, value) => option._id === value._id}
                      getOptionLabel={option => `${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}
                      renderOption={(props, option) => <li {...props} key={option?._id}>{`${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}</li>}
                      size='small'
                    />
                  </Box>
                  <Box display='flex' gap={2} alignItems='center' sx={{ flexGrow: 1 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <RHFAutocomplete
                        name='logPeriod'
                        label={t('log.period.label')}
                        options={['Hourly', 'Daily', 'Monthly', 'Quarterly', 'Yearly']}
                        onChange={(e, newValue) => handlePeriodChange(newValue)}
                        size='small'
                        disableClearable
                        required
                        fullWidth
                      />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <RHFAutocomplete
                        name='logGraphType'
                        label={t('graph_type.label')}
                        options={logGraphTypes}
                        getOptionLabel={option => option.name || ''}
                        isOptionEqualToValue={(option, value) => option?.key === value?.key}
                        renderOption={(props, option) => (
                          <li {...props} key={option?.key}>
                            {option.name || ''}
                          </li>
                        )}
                        disableClearable
                        size='small'
                        fullWidth
                      />
                    </Box>
                    <Box sx={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
                      <GStyledLoadingButton mode={themeMode} type={'submit'} variant='contained' size='large'>
                        {t('log.button_graph.get_graph').toUpperCase()}
                      </GStyledLoadingButton>
                    </Box>
                  </Box>
                </GStyledControllerCardContainer>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </GStyledStickyDiv>
      {isLoading ? (
        <HowickLoader height={300} width={303} mode={themeMode} />
      ) : logGraphType.key === 'production_total' ? (
        <ERPProductionTotal timePeriod={logPeriod} customer={{ _id: user.customer }} graphLabels={graphLabels} logsGraphData={logsGraphData} />
      ) : (
        <ERPProductionRate timePeriod={logPeriod} customer={{ _id: user.customer }} graphLabels={graphLabels} logsGraphData={logsGraphData} />
      )}
    </Grid>
  )
}
export default GraphsSection
