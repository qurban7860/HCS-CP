import { useEffect, useState, memo, useLayoutEffect } from 'react'
import axios from 'axios'
import { useSelector, dispatch } from 'store'
import { useAuthContext } from 'auth'
import { snack, useTable, useFilter, getComparator, useSettingContext } from 'hook'
import {
  getMachines,
  getSecurityUser,
  setMachineFilterBy,
  ChangeMachinePage,
  ChangeMachineRowsPerPage,
  resetMachine,
  resetMachines,
  resetSecurityUser
} from 'store/slice'
import { Table, Typography, Grid, Box } from '@mui/material'
import { GStyledTableHeaderBox, GStyledSpanBox } from 'theme/style'
import { TableNoData, MotionLazyContainer, SkeletonTable, SearchBox, TableTitleBox } from 'component'
import { MachineTable, MachineHeader, MachineListPagination } from 'section/product'
import { MARGIN, TABLE } from 'config'
import { COLOR, KEY, TITLE, RESPONSE, FLEX, FLEX_DIR } from 'constant'
import { StyledScrollTableContainer } from './style'

const MachineListSection = ({ isArchived }) => {
  const [tableData, setTableData] = useState([])
  const { machines, error, initial, isLoading, responseMessage, machinePage, machineRowsPerPage } = useSelector((state) => state.machine)
  const { userId } = useAuthContext()
  const { securityUser } = useSelector((state) => state.user)

  const { themeMode } = useSettingContext()
  const denseHeight = TABLE.DENSE_HEIGHT

  const axiosToken = () => axios.CancelToken.source()
  const cancelTokenSource = axiosToken()

  const {
    order,
    orderBy,
    setPage: setTablePage
  } = useTable({
    defaultOrderBy: KEY.CREATED_AT,
    defaultOrder: KEY.DESC
  })

  useLayoutEffect(() => {
    dispatch(resetMachine())
    dispatch(resetMachines())
    dispatch(resetSecurityUser())
  }, [dispatch])

  useEffect(() => {
    if (userId) {
      dispatch(getSecurityUser(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    dispatch(getMachines(null, null, isArchived, cancelTokenSource))
    // return () => {
    //   cancelTokenSource.cancel()
    // }
  }, [dispatch, machinePage, machineRowsPerPage, isArchived])

  useEffect(() => {
    if (initial) {
      setTableData(machines || [])
    }
  }, [machines, error, responseMessage, initial])

  const { filterName, handleFilterName, filteredData } = useFilter(
    getComparator(order, orderBy),
    tableData,
    initial,
    ChangeMachinePage,
    setMachineFilterBy
  )

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
      <TableTitleBox title={TITLE.MACHINE_LIST} user={securityUser} />
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
