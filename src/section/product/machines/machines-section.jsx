import { useEffect, useState, useRef } from 'react'
import { useSelector, dispatch } from 'store'
import { useAuthContext } from 'auth'
import { snack, useTable, useFilter, getComparator, useSettingContext } from 'hook'
import { Table, Typography, Grid, Box } from '@mui/material'
import { GStyledTableHeaderBox, GStyledSpanBox } from 'theme/style'
import { useGetUserQuery, getMachines, resetMachines, getSecurityUser, resetSecurityUser } from 'store/slice'
import { ChangeMachinePage, ChangeMachineRowsPerPage, setMachineFilterBy } from 'store/slice/product'
import { MotionLazyContainer } from 'component/animate'
import { SearchBox } from 'component/search'
import { TableNoData } from 'component'
import { SkeletonTable } from 'component/skeleton'
import { MachineTable, MachineHeader, MachineListPagination } from 'section/product'
import { MARGIN, TABLE } from 'config'
import { COLOR, KEY, TITLE, RESPONSE, FLEX, FLEX_DIR } from 'constant'
import { StyledScrollTableContainer } from './style'

const MachineListSection = () => {
  const [tableData, setTableData] = useState([])
  const { machines, initial, isLoading, machinePage, machineRowsPerPage } = useSelector((state) => state.machine)
  const { userId } = useAuthContext()
  const { securityUser } = useSelector((state) => state.user)

  const { themeMode } = useSettingContext()
  const denseHeight = TABLE.DENSE_HEIGHT

  const {
    order,
    orderBy,
    setPage: setTablePage,
    selected,
    onSelectRow,
    onSelectAllRows,
    onSort
  } = useTable({
    defaultOrderBy: KEY.CREATED_AT,
    defaultOrder: KEY.DESC
  })

  const { filterName, handleFilterName, filteredData } = useFilter(
    getComparator(order, orderBy),
    machines,
    initial,
    ChangeMachinePage,
    setMachineFilterBy
  )

  useEffect(() => {
    if (userId) {
      dispatch(getSecurityUser(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    dispatch(getMachines(null, null, false))
    return () => {
      dispatch(resetMachines())
    }
  }, [dispatch])

  useEffect(() => {
    setTableData(machines || [])
  }, [machines])

  const handleChangePage = (event, newPage) => {
    if (newPage < Math.ceil(filteredData.length / machineRowsPerPage)) {
      dispatch(ChangeMachinePage(newPage))
    }
  }

  const handleChangeRowsPerPage = (event) => {
    dispatch(ChangeMachinePage(0))
    dispatch(ChangeMachineRowsPerPage(parseInt(event.target.value, 10)))
  }

  const isNotFound = !isLoading && !filteredData.length

  return (
    <MotionLazyContainer display={FLEX.FLEX}>
      <GStyledSpanBox>
        <Typography variant="h3" color={themeMode === KEY.LIGHT ? 'common.black' : 'common.white'}>
          {securityUser?.customer?.name.toUpperCase() || TITLE.ORGANIZATION} &nbsp;
        </Typography>
        <Typography variant="h3" color={themeMode === KEY.LIGHT ? 'grey.200' : 'howick.bronze'}>
          / {TITLE.MACHINE_LIST}
        </Typography>
      </GStyledSpanBox>
      <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} />
      <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
        <Grid item lg={12}>
          <Grid container mb={2}>
            <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper">
              <GStyledTableHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={2} />
              <MachineListPagination
                mode={themeMode}
                data={filteredData}
                page={machinePage}
                rowsPerPage={machineRowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
              <StyledScrollTableContainer>
                <Table>
                  <MachineHeader mode={themeMode} />
                  {(isLoading ? [...Array(machineRowsPerPage)] : filteredData)
                    .slice(machinePage * machineRowsPerPage, machinePage * machineRowsPerPage + machineRowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <MachineTable key={row._id} machine={row} mode={themeMode} index={index} />
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
    </MotionLazyContainer>
  )
}

export default MachineListSection
