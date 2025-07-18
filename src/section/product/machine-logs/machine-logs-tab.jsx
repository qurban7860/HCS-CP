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
  const [unit, setUnit] = useState('Metric')
  const [selectedMultiSearchFilter, setSelectedMultiSearchFilter] = useState([])
  const { logPage, logRowsPerPage } = useSelector(state => state.machineLog)
  const { machine } = useSelector(state => state.machine)
  const { machineId } = useParams()

  const defaultValues = useMemo(
    () => ({
      customer: user?.customer || null,
      machine: machine,
      logType: getLogTypeConfigForGenerationAndType(5, 'ERP') || null,
      dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      dateTo: new Date(),
      unitType: 'Metric',
      logPeriod: 'Monthly',
      logGraphType: logGraphTypes[0]
    }
    ), []
  );

  const methods = useForm({
    resolver: yupResolver(addLogSchema),
    defaultValues,
    mode: 'all',
    reValidateMode: 'onChange'
  })

  const { watch, setValue, handleSubmit } = methods
  const { dateFrom, dateTo, logType, filteredSearchKey, unitType } = watch()

  useEffect(() => {
    setUnit(unitType)
    dispatch(getLogs({
      customerId: user?.customer,
      machineId,
      page: logPage,
      pageSize: logRowsPerPage,
      fromDate: dateFrom,
      toDate: dateTo,
      isArchived: false,
      isMachineArchived: machine?.isArchived,
      selectedLogType: logType?.type,
      searchKey: filteredSearchKey,
      searchColumn: selectedMultiSearchFilter
    }))
  }, [logPage, logRowsPerPage])

  const handleFormSubmit = async (data) => {
    setUnit(unitType)
    if (logPage == 0) {
      await dispatch(getLogs({
        customerId: user?.customer,
        machineId,
        page: logPage,
        pageSize: logRowsPerPage,
        fromDate: dateFrom,
        toDate: dateTo,
        isArchived: false,
        isMachineArchived: machine?.isArchived,
        selectedLogType: logType?.type,
        searchKey: filteredSearchKey,
        searchColumn: selectedMultiSearchFilter
      }))
    } else {
      await dispatch(ChangeLogPage(0))
    }
  }

  const handleLogTypeChange = useCallback(newLogType => {
    setValue('logType', newLogType)
  }, [setValue])

  const handlePeriodChange = useCallback(newPeriod => {
    setValue('logPeriod', newPeriod)
  }, [setValue])

  const handleGraphTypeChange = useCallback(
    newGraphType => {
      setValue('logGraphType', newGraphType)
    },
    [setValue]
  )

  const dataForApi = {
    customerId: user?.customer,
    machineId: machine?._id || undefined,
    page: logPage,
    pageSize: logRowsPerPage,
    fromDate: dateFrom,
    toDate: dateTo,
    isArchived: false,
    isMachineArchived: machine?.isArchived,
    selectedLogType: logType?.type,
    searchKey: filteredSearchKey,
    searchColumn: selectedMultiSearchFilter
  }

  return (
    <Fragment>
      <GStyledStickyDiv top={NAV.T_STICKY_NAV_MACH_CONTROLLER} zIndex={1}>
        <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={SPACING.TAB}>
            <Grid item xs={12} md={12}>
              <LogsTableController
                handlePeriodChange={handlePeriodChange}
                handleLogTypeChange={handleLogTypeChange}
                handleGraphTypeChange={handleGraphTypeChange}
                methods={methods}
                onGetLogs={handleFormSubmit}
                dataForApi={dataForApi}
                unit={unit}
                selectedMultiSearchFilter={selectedMultiSearchFilter}
                setSelectedMultiSearchFilter={setSelectedMultiSearchFilter}
              />
            </Grid>
          </Grid>
        </FormProvider>
        <MachineLogsTable logType={logType} unitType={unit} />
      </GStyledStickyDiv>
    </Fragment>
  )
}

MachineLogsTab.propTypes = {
  logType: PropTypes.object,
  isLogsPage: PropTypes.bool
}

export default MachineLogsTab
