import { Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { t } from 'i18next'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from 'auth/use-auth-context'
import { HowickLoader, RHFAutocomplete, TableTitleBox } from 'component'
import { FLEX, FLEX_DIR, KEY, TYPOGRAPHY } from 'constant'
import { Icon, ICON_NAME, useResponsive, useSettingContext } from 'hook'
import { dispatch } from 'store'
import { getLogGraphData, resetLogsGraphData, getMachines, resetMachines } from 'store/slice'
import { GStyledControllerCardContainer, GStyledStickyDiv } from 'theme/style'
import { NAV } from 'config'
import { PATH_LOGS } from 'route/path'
import { logGraphTypes } from 'config'
import ERPProductionTotal from './production-total'
import ERPProductionRate from './production-rate'
import { useGraphDefaultValues } from 'section/log/logs'

const GraphsSection = () => {
  const navigate = useNavigate()
  const { machines } = useSelector(state => state.machine)
  const { isLoading, logsGraphData } = useSelector(state => state.log)
  const { user } = useAuthContext()

  const defaultValues = useMemo(
    () => ({
      customer: user?.customer || null,
      machine: null,
      logPeriod: 'Monthly',
      logGraphType: logGraphTypes[0]
    }
    ), []
  );

  const methods = useForm({
    defaultValues,
    mode: 'onChange',
  })

  const { watch, setValue, handleSubmit } = methods
  const { machine, logPeriod, logGraphType } = watch()
  const [graphLabels, setGraphLabels] = useState({ yaxis: 'Cumulative Total Value', xaxis: logPeriod })

  const { themeMode } = useSettingContext()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const isMobile = useResponsive('down', 'sm')

  useEffect(() => {
    dispatch(getMachines(null, null, false, null, user?.customer))
    return () => {
      dispatch(resetMachines());
      dispatch(resetLogsGraphData());
    }
  }, [dispatch]);

  const getLogsGraph = useCallback(() => {
    dispatch(getLogGraphData(user?.customer, machine?._id, 'erp', logPeriod, logGraphType));
  }, [dispatch, machine?._id, logPeriod, logGraphType]);

  useEffect(() => {
    getLogsGraph();
  }, [getLogsGraph]);

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
          <TableTitleBox title={t('log.logs.label')} />
          <Button
            size='small'
            startIcon={<Icon icon={ICON_NAME.LIST} sx={{ mr: 0.3 }} />}
            variant='outlined'
            sx={{
              color: themeMode === KEY.LIGHT ? theme.palette.common.black : theme.palette.common.white,
              borderColor: theme.palette.grey[500]
            }}
            onClick={() => navigate(PATH_LOGS.root)}>
            {!isMobile && <Typography variant={isDesktop ? TYPOGRAPHY.BODY0 : TYPOGRAPHY.BODY2}>{'Machine Logs'}</Typography>}
          </Button>
        </Grid>
      </GStyledStickyDiv>
      <GStyledStickyDiv top={NAV.T_STICKY_NAV_LOGS_CONTROLLER} zIndex={11}>
        <FormProvider {...methods} onSubmit={handleSubmit(() => { })}>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} sm={12}>
              <GStyledControllerCardContainer height={'auto'} sx={{ display: FLEX.FLEX, flexDirection: FLEX_DIR.COLUMN, gap: 2 }}>
                <Box rowGap={2} columnGap={2} display='grid' gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }}>
                  <RHFAutocomplete
                    name='machine'
                    label={t('machine.label')}
                    options={
                      Array.isArray(machines) && machines?.filter(ma => ma?.machineModel?.category?.name?.toLowerCase()?.includes('frama'))
                      || []
                    }
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    getOptionLabel={option => `${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}
                    renderOption={(props, option) => <li {...props} key={option?._id}>{`${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}</li>}
                    size='small'
                  />
                  <RHFAutocomplete
                    name='logPeriod'
                    label={t('log.period.label')}
                    options={['Hourly', 'Daily', 'Monthly', 'Quarterly', 'Yearly']}
                    onChange={(e, newValue) => handlePeriodChange(newValue)}
                    size='small'
                    disableClearable
                    required
                  />
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
                  />
                </Box>
              </GStyledControllerCardContainer>
            </Grid>
          </Grid>
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
