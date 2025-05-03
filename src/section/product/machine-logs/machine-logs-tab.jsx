import { Fragment, useEffect, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getLogs, ChangeLogPage, resetLogs } from 'store/slice/log/machineLog'
import { useAuthContext } from 'auth/use-auth-context'
import { addLogSchema } from 'schema'
import { LogsTableController } from 'section/log/logs'
import { MachineLogsTable } from 'section/product'
import { Grid } from '@mui/material'
import { GStyledStickyDiv } from 'theme/style'
import FormProvider from 'component/hook-form'
import { NAV, SPACING } from 'config/layout'
import { getLogTypeConfigForGenerationAndType, logGraphTypes } from 'config/log-types'

const MachineLogsTab = () => {
  const { user } = useAuthContext()
  const [selectedSearchFilter] = useState('');
  const { logPage, logRowsPerPage } = useSelector(state => state.machineLog)
  const { machine } = useSelector(state => state.machine)
  const { id } = useParams()

  const defaultValues = useMemo(
    () => ({
      customer: user?.customer || null,
      machine: machine,
      logType: getLogTypeConfigForGenerationAndType(5, 'ERP') || null,
      dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      dateTo: new Date(),
      logPeriod: 'Monthly',
      logGraphType: logGraphTypes[0]
    }
    ), []
  );

  const methods = useForm({
    resolver: yupResolver(addLogSchema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const { watch, setValue, handleSubmit } = methods
  const { dateFrom, dateTo, logType, filteredSearchKey } = watch()

  useEffect(() => {
    if (id) {
      dispatch(
        getLogs({
          customerId: user?.customer,
          machineId: id,
          page: logPage,
          pageSize: logRowsPerPage,
          fromDate: dateFrom,
          toDate: dateTo,
          isArchived: false,
          isMachineArchived: false,
          selectedLogType: logType?.type,
          searchKey: filteredSearchKey,
          searchColumn: selectedSearchFilter
        })
      )
    }
  }, [dispatch])

  const onGetLogs = useCallback(data => {
    dispatch(
      getLogs({
        customerId: user?.customer,
        machineId: id,
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
  }, [dispatch, logPage, logRowsPerPage, dateFrom, dateTo, logType, filteredSearchKey, selectedSearchFilter])

  const handleLogTypeChange = useCallback(
    newLogType => {
      dispatch(ChangeLogPage(0))
      setValue('logType', newLogType)
    },
    [setValue]
  )

  const handlePeriodChange = useCallback(
    newPeriod => {
      dispatch(ChangeLogPage(0))
      setValue('logPeriod', newPeriod)
    },
    [setValue]
  )

  return (
    <Fragment>
      <GStyledStickyDiv top={NAV.T_STICKY_NAV_MACH_CONTROLLER} zIndex={12}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onGetLogs)}>
          <Grid container spacing={SPACING.TAB}>
            <Grid item xs={12} md={12}>
              <LogsTableController handlePeriodChange={handlePeriodChange} handleLogTypeChange={handleLogTypeChange} methods={methods} />
            </Grid>
          </Grid>
        </FormProvider>
      </GStyledStickyDiv>
      <MachineLogsTable isLogsPage logType={logType} />
    </Fragment>
  )
}

MachineLogsTab.propTypes = {
  logType: PropTypes.object,
  isLogsPage: PropTypes.bool
}

export default MachineLogsTab
