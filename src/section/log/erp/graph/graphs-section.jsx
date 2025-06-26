import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { t } from 'i18next'
import { useEffect, useMemo, useState, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthContext } from 'auth/use-auth-context'
import { HowickLoader, IconTooltip, TableTitleBox } from 'component'
import { RHFAutocomplete, RHFDatePickr} from 'component/hook-form'
// import RHFDateTimePicker from 'component/hook-form/rhf-dateTime-picker'  

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

  const graphDataRef = useRef(null);
  const isInitialLoad = useRef(false);

  const defaultValues = useMemo(
    () => ({
      customer: user?.customer || null,
      machine: null,
      logPeriod: 'Daily',
      logGraphType: logGraphTypes[0],
      dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      dateTo: new Date()
      // dateFrom: new Date(new Date().setHours(0, 0, 0, 0)),
     // dateTo: new Date(new Date().setHours(23, 59, 59, 0)),
    }),
    [user]
  )
  const methods = useForm({
    resolver: yupResolver(erpGraphSchema),
    mode: 'onBlur',
    defaultValues,
  })

  const { handleSubmit, setValue, trigger, watch } = methods;
  const { logPeriod } = watch();

  const [graphLabels, setGraphLabels] = useState({
    yaxis: 'Meterage Produced Graph',
    xaxis: 'Daily',
  });

  useEffect(() => {
    dispatch(getMachines(null, null, false, null, user?.customer))
    return () => {
      dispatch(resetMachines())
      dispatch(resetLogsGraphData())
    }
  }, [user?.customer]);

  useEffect(() => {
    const now = new Date();
    const newDateFrom = new Date(now);

    newDateFrom.setHours(0, 0, 0, 0);
    now.setHours(23, 59, 59, 999);

    switch (logPeriod) {
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
        break;
    }

    setValue('dateFrom', newDateFrom);
    setValue('dateTo', now);
    trigger(['dateFrom', 'dateTo']);
  }, [logPeriod, setValue, trigger]);

  useEffect(() => {
    if (!isInitialLoad.current) {
      isInitialLoad.current = true;
      handleSubmit(onSubmit)();
    }
  }, [handleSubmit]);

  const onSubmit = (data) => {
    const { logGraphType, logPeriod } = data;

    const yLabel = logGraphType?.key === 'productionRate'
      ? 'Production Rate (m/hr)'
      : 'Meterage Produced Graph';

    setGraphLabels({
      yaxis: yLabel,
      xaxis: logPeriod,
    });

    graphDataRef.current = {
      ...data,
      graphLabels: {
        yaxis: yLabel,
        xaxis: logPeriod,
      }
    };

    dispatch(getLogGraphData(
      user?.customer,
      data?.machine?._id,
      'erp',
      data?.logPeriod,
      data?.logGraphType?.key,
      new Date(data?.dateFrom),
      new Date(data?.dateTo)
    ));
  };

  const handlePeriodChange = newPeriod => {
    setValue('logPeriod', newPeriod)
    trigger('logPeriod')
  }

  const graphData = graphDataRef.current;

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
                  <Box rowGap={2} columnGap={2} display='grid' gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}>
                    <RHFAutocomplete
                      name='machine'
                      label={t('machine.label')}
                      options={(Array.isArray(machines) && machines?.filter(ma => ma?.machineModel?.category?.name?.toLowerCase()?.includes('frama'))) || []}
                      isOptionEqualToValue={(option, value) => option._id === value._id}
                      getOptionLabel={option => `${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}
                      renderOption={(props, option) => <li {...props} key={option?._id}>{`${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}</li>}
                      size='small'
                    />
              
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
                  <Grid container alignItems="flex-start" gap={1}>
                  <Grid item xs={12} sm={12} md={6} xl={6}>
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
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} xl={2}>
                    <RHFDatePickr
                      label='From Date'
                      name='dateFrom'
                      size='small'
                      onChange={(value) => {
                      setValue('dateFrom', value, { shouldValidate: true });
                      trigger('dateFrom');
                      }}
                    />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} xl={2}>
                    <RHFDatePickr
                      label='To Date'
                      name='dateTo'
                      size='small'
                      onChange={(value) => {
                      setValue('dateTo', value, { shouldValidate: true });
                      trigger('dateTo');
                      }}
                    />
                    </Grid>
                    <Grid item md={1} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }} >
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
                    </Grid>
                    </Grid>
                </GStyledControllerCardContainer>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </GStyledStickyDiv>

      {isLoading ? (
        <HowickLoader height={300} width={303} mode={themeMode} />
      ) : graphData ? (
        graphData.logGraphType?.key === 'production_total' ? (
          <ERPProductionTotal
            timePeriod={graphData.logPeriod}
            customer={{ _id: user.customer }}
            graphLabels={graphData.graphLabels}
            logsGraphData={logsGraphData}
            dateFrom={graphData.dateFrom}
            dateTo={graphData.dateTo}
          />
        ) : (
          <ERPProductionRate
            timePeriod={graphData.logPeriod}
            customer={{ _id: user.customer }}
            graphLabels={graphData.graphLabels}
            logsGraphData={logsGraphData}
            dateFrom={graphData.dateFrom}
            dateTo={graphData.dateTo}
          />
        )
      ) : null}
    </Grid>
  )
}

export default GraphsSection
 