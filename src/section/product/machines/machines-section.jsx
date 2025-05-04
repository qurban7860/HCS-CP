import { Fragment, useEffect, useState, memo } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import axios from 'axios'
import _ from 'lodash'
import { Trans } from 'react-i18next'
import { useAuthContext } from 'auth/use-auth-context'
import { useSelector, dispatch } from 'store'
import { useNavigate } from 'react-router-dom'
import { useTable, useFilter, getComparator, useSettingContext, useResponsive } from 'hook'
import { PATH_MACHINE } from 'route/path'
import {
  getMachine,
  getMachines,
  getMachineCategories,
  setMachineFilterBy,
  setSelectedMachineCard,
  ChangeMachinePage,
  ChangeMachineRowsPerPage,
  resetMachines,
  resetMachine
} from 'store/slice'
import { MachineTable, MachineHeader, MachineListPagination, MachinesCard, HEADER_ITEMS } from 'section/product'
import { Table, Grid, Typography } from '@mui/material'
import { GStyledTableHeaderBox } from 'theme/style'
import { TableNoData, SkeletonTable, SearchBox, TableTitleBox } from 'component'
import { MARGIN, TABLE } from 'config'
import { KEY, FLEX_DIR, TYPOGRAPHY, DECOILER_TYPE_ARR } from 'constant'
import { StyledScrollTableContainer } from './style'

const MachineListSection = ({ isArchived }) => {
  const [tableData, setTableData] = useState([])
  const { machines, machineCategories, selectedMachineCard, initial, isLoading, machinePage, machineRowsPerPage } = useSelector(state => state.machine)
  const { user } = useAuthContext()
  const { themeMode } = useSettingContext()

  const isMobile = useResponsive('down', 'sm')
  const navigate = useNavigate()
  const denseHeight = TABLE.DENSE_HEIGHT

  // const axiosToken = () => axios.CancelToken.source()
  // const cancelTokenSource = axiosToken()

  const {
    order,
    orderBy,
    selected,
    setPage: setTablePage,
    onSort
  } = useTable({
    defaultOrderBy: 'serialNo',
    defaultOrder: KEY.DESC
  })

  useEffect(() => {
    dispatch(getMachines(null, null, false, null, user?.customer))
    return () => {
      dispatch(resetMachine())
      dispatch(resetMachines())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getMachineCategories())
  }, [dispatch])

  useEffect(() => {
    if (initial && !_.isEqual(machines, tableData)) {
      setTableData(machines || [])
    }
  }, [machines, tableData])

  const { filterName, handleFilterName, filteredData, filterStatus, handleFilterStatus, filterCategory, handleFilterCategory } = useFilter(
    getComparator(order, orderBy),
    tableData,
    initial,
    ChangeMachinePage,
    setMachineFilterBy,
    'serialNo',
    KEY.ROLLFORMER
  )

  const MACHINES = machineCategories?.filter(category => !DECOILER_TYPE_ARR.some(type => category?.name?.includes(type)))
  const filteredDataCategories = Array.from(new Set(machines.map(mach => mach?.machineModel?.category)))
  const FILTERED_MACHINES_CATEGORY = MACHINES.filter(category => filteredDataCategories.includes(category?._id))
  const CATEGORIES = [{ _id: 'all', name: 'All' }, { _id: 'decoiler', name: 'Decoiler' }, { _id: 'rollformer', name: 'Rollformer' }, ...FILTERED_MACHINES_CATEGORY]

  const handleChangePage = (event, newPage) => {
    if (newPage < Math.ceil(filteredData.length / machineRowsPerPage)) {
      dispatch(ChangeMachinePage(newPage))
    }
  }

  const handleChangeRowsPerPage = event => {
    dispatch(ChangeMachinePage(0))
    dispatch(ChangeMachineRowsPerPage(parseInt(event.target.value, 10)))
  }

  const handleSelectedCard = (event, id) => {
    event.preventDefault()
    dispatch(setSelectedMachineCard(id))
  }

  const handleMachineCard = (event, id) => {
    event.preventDefault()
    dispatch(setSelectedMachineCard(id))
    dispatch(resetMachine())
    dispatch(getMachine(id, user?.customer))
    const url = PATH_MACHINE.machines.view(id)
    navigate(url)
  }

  const handleMachineInNewTabCard = (event, id) => {
    event.preventDefault()
    dispatch(setSelectedMachineCard(id))
    dispatch(resetMachine())
    dispatch(getMachine(id, user?.customer))
    const url = PATH_MACHINE.machines.view(id)
    window.open(url, KEY.BLANK)
  }

  const isNotFound = !isLoading && !filteredData.length


  return (
    <Fragment>
      <TableTitleBox title={t('machine.machines.label')} />
      <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} />
      {isMobile ? (
        <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
          <Grid item xs={12} sm={12}>
            <Grid container mb={2}>
              <Grid item xs={12} sm={12} mb={2} bgcolor='transparent'>
                <Grid container p={1}>
                  {machines?.length > 0 ? (
                    filteredData.map((cmach, index) => (
                      <MachinesCard
                        key={index}
                        selectedCardId={selectedMachineCard || index}
                        machine={cmach}
                        handleSelected={handleSelectedCard}
                        handleMachineCard={handleMachineCard}
                        handleMachineInNewTabCard={handleMachineInNewTabCard}
                      />
                    ))
                  ) : (
                    <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.no'>
                      <Trans i18nKey='no_found.label' values={{ value: 'Machine' }} />
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
          <Grid item xs={12} sm={12}>
            <Grid container mb={2}>
              <Grid item xs={12} sm={12} mb={2} bgcolor='background.paper'>
                <GStyledTableHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={2} />
                <MachineListPagination
                  mode={themeMode}
                  data={filteredData}
                  page={machinePage}
                  rowsPerPage={machineRowsPerPage}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  columnFilterButtonData={HEADER_ITEMS}
                  currentFilterStatus={filterStatus}
                  handleFilterStatus={handleFilterStatus}
                  currentFilterCategory={filterCategory}
                  handleFilterCategory={handleFilterCategory}
                  categoryTypes={CATEGORIES}
                  showFilterStatus
                  showFilterCategory
                />
                <StyledScrollTableContainer>
                  <Table>
                    <MachineHeader columns={HEADER_ITEMS} dataFiltered={filteredData} orderBy={orderBy} order={order} onSort={onSort} />
                    {(isLoading ? [...Array(machineRowsPerPage)] : filteredData)
                      .slice(machinePage * machineRowsPerPage, machinePage * machineRowsPerPage + machineRowsPerPage)
                      .map((row, index) =>
                        row ? (
                          <MachineTable key={row._id} machine={row} index={index} columns={HEADER_ITEMS} onViewRow={() => { }} selected={selected.includes(row._id)} isArchived={isArchived} />
                        ) : (
                          !isNotFound && <SkeletonTable key={index} sx={{ height: denseHeight }} />
                        )
                      )}
                    <TableNoData isNotFound={isNotFound} />
                  </Table>
                </StyledScrollTableContainer>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Fragment>
  )
}

MachineListSection.propTypes = {
  isArchived: PropTypes.bool
}

export default memo(MachineListSection)
