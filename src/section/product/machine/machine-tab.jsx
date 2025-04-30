import { Fragment, useEffect, memo, useLayoutEffect, useRef } from 'react'
import _ from 'lodash'
import axios from 'axios'
import { useSelector, dispatch } from 'store'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getCustomer,
  getMachine,
  getMachines,
  setCustomerDialog,
  getConnectedMachineDialog,
  setMachineDialog,
  setMachineSiteDialog,
  setMachineFilterBy,
  ChangeMachinePage,
  resetCustomer,
  resetConnectedMachineDialog,
  resetMachineSiteDialogData,
  resetSelectedMachine,
  resetMachine,
  resetMachines,
  resetSoftwareVersion,
  getSoftwareVersion
} from 'store/slice'
import { useTempFilter, useSettingContext, getComparator, useTable, useUIMorph, Icon, ICON_NAME } from 'hook'
import { PATH_MACHINE } from 'route/path'
import { CommonFieldsCard } from 'section/common'
import { useMachineDefaultValues, fieldsKeyConfig, fieldsMachineInformationConfig } from 'section/product'
import { MachineConnectionListCard, MachineCard, MachineFieldsCard } from 'section/product/machine'
import { HowickResources } from 'section/common'
import { useTheme, Grid, Box, Typography, Tooltip } from '@mui/material'
import { AuditBox, SearchBox } from 'component'
import { GStyledScrollableHeightLockGrid, GStyledChip, GStyledStickyGrid, GStyledTooltip } from 'theme/style'
import { MARGIN, NAV, SPACING } from 'config/layout'
import { FLEX_DIR, KEY, FALLBACK } from 'constant'
import user from 'component/dialog/user'

const MachineTab = () => {
  const { machine, machines, isLoading, initial } = useSelector(state => state.machine)
  const { customer } = useSelector(state => state.customer)
  const { softwareVersion } = useSelector(state => state.ticket)
  const { id } = useParams()
  const { themeMode } = useSettingContext()
  const selectedMachineRef = useRef(null)
  const { isDesktop, isMobile } = useUIMorph()
  const theme = useTheme()
  const navigate = useNavigate()
  const axiosToken = () => axios.CancelToken.source()
  const cancelTokenSource = axiosToken()

  const { order, orderBy } = useTable({
    defaultOrderBy: KEY.CREATED_AT,
    defaultOrder: 'asc'
  })

  useLayoutEffect(() => {
    dispatch(setCustomerDialog(false))
    dispatch(setMachineDialog(false))
    dispatch(setMachineSiteDialog(false))
    dispatch(resetMachines())
    // dispatch(resetSelectedMachine())
    // dispatch(resetCustomer())
    dispatch(resetSoftwareVersion())
    dispatch(resetConnectedMachineDialog())
    dispatch(resetMachineSiteDialogData())
  }, [])

  useEffect(() => {
    if (machine?.customer) {
      if (!customer) {
        dispatch(getCustomer(user?.customer))
      }
    }
  }, [machine?.customer, dispatch])

  useEffect(() => {
    const debounce = _.debounce(() => {
      dispatch(getMachine(id, customer?._id))
    }, 300)
    debounce()
    return () => debounce.cancel()
  }, [id, dispatch])

  useEffect(() => {
    const debounce = _.debounce(() => {
      dispatch(getSoftwareVersion(id, customer?._id))
    }, 300)
    debounce()
    return () => debounce.cancel()
  }, [id, dispatch, customer])

  useEffect(() => {
    const debounce = _.debounce(() => {
      if (!machines?.length) {
        dispatch(getMachines(null, null, false, null, customer?._id))
      }
    }, 300)
    debounce()
    return () => debounce.cancel()
  }, [dispatch, machines])

  useEffect(() => {
    const debounce = _.debounce(() => {
      dispatch(getMachineCategories())
    }, 300)
    debounce()
    return () => debounce.cancel()
  }, [dispatch])

  useEffect(() => {
    if (selectedMachineRef.current) {
      selectedMachineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [machine?._id])

  const defaultValues = useMachineDefaultValues(machine, customer, null, softwareVersion)
  const { filterName, handleFilterName, filteredData, filterCategory, handleFilterCategory } = useTempFilter(
    getComparator(order, orderBy),
    machines,
    initial,
    ChangeMachinePage,
    setMachineFilterBy,
    'machine'
  )

  const CATEGORIES = [
    {
      _id: 'machine',
      name: (
        <Tooltip title="Machines" arrow placement="top">
          <Icon icon={ICON_NAME.FRAMA} color="grey.500" sx={{ height: 15, width: 15 }} />
        </Tooltip>
      ),
    },
    {
      _id: 'decoiler',
      name: (
        <Tooltip title="Decoilers" arrow placement="top">
          <Icon icon={ICON_NAME.DECOILER_DEF} color="grey.500" sx={{ height: 15, width: 15 }} />
        </Tooltip>
      ),
    },
    { _id: 'all', name: 'All' }
  ]

  const handleCustomerDialog = (event, customerId) => {
    event.preventDefault()
    dispatch(resetCustomer())
    dispatch(getCustomer(customerId))
    dispatch(setCustomerDialog(true))
  }

  const handleConnectedMachineDialog = (event, machineId) => {
    event.preventDefault()
    dispatch(resetConnectedMachineDialog())
    dispatch(getConnectedMachineDialog(machineId))
    dispatch(setMachineDialog(true))
  }

  const handleSelectedMachine = (event, machineId) => {
    event.preventDefault()
    navigate(PATH_MACHINE.machines.view(machineId))
  }

  const handleMachineInNewTabCard = async (event, machineId) => {
    event.preventDefault()
    const url = PATH_MACHINE.machines.view(machineId)
    window.open(url, KEY.BLANK)
  }

  const disabledColor = themeMode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[700]

  const renderCategoryChipContainer = () => {
    return (
      <Grid container mb={1} sx={{ backgroundColor: 'transparent' }}>
        {CATEGORIES.map(category => (
          <GStyledTooltip
            key={category._id}
            title={category?.label || ''}
            placement="top"
            disableFocusListener
            tooltipcolor={disabledColor}
            color={theme.palette.grey[500]}
          >
            <GStyledChip
              label={category.name}
              bgColor={
                filterCategory === category._id
                  ? themeMode === KEY.LIGHT
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900]
                  : undefined
              }
              onClick={event => handleFilterCategory(event, category._id)}
              sx={{ p: 0, m: 0.5 }}
            />
          </GStyledTooltip>
        ))}
      </Grid>
    )
  }

  return (
    <Fragment>
      <Grid container columnSpacing={SPACING.COLUMN_SPACING} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
        {(isDesktop) && (
          <GStyledStickyGrid item xs={12} md={12} lg={3}>
            {machines.length >= 5 ? (
              <Box>
                <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} increasedFilterSize mt={0} />
                {renderCategoryChipContainer()}
              </Box>
            ) : (
              renderCategoryChipContainer()
            )}
            <GStyledScrollableHeightLockGrid isMobile={isMobile} mode={themeMode} totalCount={machines?.length}>
              <Grid container gap={2} p={1} py={2} pb={4} height={'auto'} sx={{ maxHeight: NAV.H_MAX_SIDE_PANEL, overflow: 'auto' }}>
                {filteredData.map((mach, index) => (
                  <MachineCard
                    key={mach?._id}
                    selectedCardId={machine?._id}
                    value={defaultValues}
                    handleSelected={handleSelectedMachine}
                    handleMachineCard={handleSelectedMachine}
                    handleMachineInNewTabCard={handleMachineInNewTabCard}
                    machine={mach}
                  />
                ))}
                {filteredData?.length < 1 && (
                  <Grid
                    container
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '300px',
                      textAlign: 'center'
                    }}
                  >
                    <Typography variant="h6">
                      {FALLBACK.NO_DATA.title}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </GStyledScrollableHeightLockGrid>
          </GStyledStickyGrid>
        )}
        <Grid item xs={12} sm={12} lg={9} >
          <MachineFieldsCard i18nKey={'key_detail.key_details.label'} defaultValues={defaultValues} fieldsConfig={fieldsKeyConfig} isLoading={isLoading} handleDialog={handleCustomerDialog} />
          <MachineFieldsCard
            i18nKey={'machine_information.label'}
            defaultValues={defaultValues}
            fieldsConfig={fieldsMachineInformationConfig}
            isLoading={isLoading}
            handleDialog={handleCustomerDialog}
            mountSupportExpiryChip
          />
          {!isDesktop && machines.length >= 5 && (
            <Grid item xs={12}>
              <MachineConnectionListCard value={defaultValues} isLoading={isLoading} handleConnectionDialog={handleConnectedMachineDialog} />
            </Grid>
          )}
          <CommonFieldsCard isChildren i18nKey={'howick_resources.label'} defaultValues={defaultValues} isLoading={isLoading}>
            <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} />
          </CommonFieldsCard>
        </Grid>
      </Grid>
      <AuditBox value={defaultValues} />
    </Fragment>
  )
}

export default memo(MachineTab)
