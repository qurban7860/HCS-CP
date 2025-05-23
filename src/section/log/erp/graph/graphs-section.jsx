import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { t } from 'i18next'
import { useEffect, useMemo, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthContext } from 'auth/use-auth-context'
import { HowickLoader, IconTooltip, TableTitleBox } from 'component'
import { RHFAutocomplete, RHFDatePickr } from 'component/hook-form'
import { FLEX, FLEX_DIR, KEY, TYPOGRAPHY } from 'constant'
import { erpGraphSchema } from 'schema/graph/erp-graph-schema'
import { ICON_NAME, useResponsive, useSettingContext } from 'hook'
import { dispatch } from 'store'
import { getLogGraphData, resetLogsGraphData, getMachines, resetMachines } from 'store/slice'
import { GStyledControllerCardContainer, GStyledStickyDiv } from 'theme/style'
import { NAV } from 'config'
import { logGraphTypes } from 'config'
import ERPProductionTotal from './production-total'
import ERPProductionRate from './production-rate'

const GraphsSection = () => {
  const { machines } = useSelector(state => state.machine)
  const { isLoading, logsGraphData } = useSelector(state => state.log)
  const { user } = useAuthContext()
  const theme = useTheme()
  const { themeMode } = useSettingContext()

  const defaultValues = useMemo(
    () => ({
      customer: user?.customer || null,
      machine: null,
      logPeriod: 'Daily',
      logGraphType: logGraphTypes[0],
      dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      dateTo: new Date()
    }),
    [user]
  )

  const methods = useForm({
    resolver: yupResolver(erpGraphSchema),
    defaultValues,
    mode: 'onChange'
  })

  const { handleSubmit, setValue, trigger, getValues } = methods

  const [graphLabels, setGraphLabels] = useState({
    yaxis: 'Produced Length and Waste (m)',
    xaxis: 'Daily'
  })

  useEffect(() => {
    dispatch(getMachines(null, null, false, null, user?.customer))
    return () => {
      dispatch(resetMachines())
      dispatch(resetLogsGraphData())
    }
  }, [])

  useEffect(() => {
    handleSubmit(onSubmit)()
  }, [])

  const onSubmit = data => {
    const { logPeriod, logGraphType, dateFrom, dateTo, machine } = data

    if (logGraphType?.key === 'productionRate') {
      setGraphLabels(prev => ({
        ...prev,
        yaxis: 'Production Rate (m/hr)',
        xaxis: logPeriod
      }))
    } else {
      setGraphLabels(prev => ({
        ...prev,
        yaxis: 'Produced Length and Waste (m)',
        xaxis: logPeriod
      }))
    }

    dispatch(getLogGraphData(user?.customer, machine?._id, 'erp', logPeriod, logGraphType?.key, new Date(dateFrom), new Date(dateTo)))
  }

  const handlePeriodChange = newPeriod => {
    setValue('logPeriod', newPeriod)
    trigger('logPeriod')
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
                    <RHFAutocomplete
                      name='machine'
                      label={t('machine.label')}
                      options={(Array.isArray(machines) && machines?.filter(ma => ma?.machineModel?.category?.name?.toLowerCase()?.includes('frama'))) || []}
                      isOptionEqualToValue={(option, value) => option._id === value._id}
                      getOptionLabel={option => `${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}
                      renderOption={(props, option) => <li {...props} key={option?._id}>{`${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}</li>}
                      size='small'
                    />
                    <RHFDatePickr
                      label='From Date'
                      name='dateFrom'
                      size='small'
                      onChange={newValue => {
                        setValue('dateFrom', newValue)
                        trigger(['dateFrom', 'dateTo'])
                      }}
                    />
                    <RHFDatePickr
                      label='To Date'
                      name='dateTo'
                      size='small'
                      onChange={newValue => {
                        setValue('dateTo', newValue)
                        trigger(['dateFrom', 'dateTo'])
                      }}
                    />
                  </Box>

                  <Box display='flex' gap={2} alignItems='center'>
                    
                    <Box flexGrow={1}>
                      <RHFAutocomplete
                        name='logGraphType'
                        label={t('graph_type.label')}
                        options={logGraphTypes}
                        getOptionLabel={option => option?.name || ''}
                        isOptionEqualToValue={(option, value) => option?.key === value?.key}
                        renderOption={(props, option) => (
                          <li {...props} key={option.key}>
                            {option.name}
                          </li>
                        )}
                        disableClearable
                        size='small'
                        fullWidth
                      />
                    </Box>
                    <Box flexGrow={1}>
                      <RHFAutocomplete
                        name='logPeriod'
                        label={t('log.period.label')}
                        options={['Hourly', 'Daily', 'Monthly', 'Quarterly', 'Yearly']}
                        onChange={(e, newVal) => handlePeriodChange(newVal)}
                        size='small'
                        disableClearable
                        required
                        fullWidth
                      />
                    </Box>

                   
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconTooltip
                        title={t('log.button_graph.get_graph').toUpperCase()}
                        icon={ICON_NAME.SEARCH}
                        color={theme.palette.common.white}
                        tooltipColor={theme.palette.primary.main}
                        buttonColor={theme.palette.howick.darkBlue}
                        variant="contained"
                        size="small"
                        type="submit"
                        onClick={() => { }}
                      />
                      {/* <GStyledLoadingButton mode={themeMode} type='submit' variant='contained' size='large' startIcon={<Icon icon={ICON_NAME.SEARCH} />}>
                        {t('log.button_graph.get_graph').toUpperCase()}
                      </GStyledLoadingButton> */}
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
      ) : getValues('logGraphType')?.key === 'production_total' ? (
        <ERPProductionTotal
          timePeriod={getValues('logPeriod')}
          customer={{ _id: user.customer }}
          graphLabels={graphLabels}
          logsGraphData={logsGraphData}
          dateFrom={getValues('dateFrom')}
          dateTo={getValues('dateTo')}
        />
      ) : (
        <ERPProductionRate
          timePeriod={getValues('logPeriod')}
          customer={{ _id: user.customer }}
          graphLabels={graphLabels}
          logsGraphData={logsGraphData}
          dateFrom={getValues('dateFrom')}
          dateTo={getValues('dateTo')}
        />
      )}
    </Grid>
  )
}

export default GraphsSection
