import { useEffect, useState, useRef } from 'react'
import { useSelector, dispatch } from 'store'
import debounce from 'lodash/debounce'
import { snack, useTable, useFilter, getComparator } from 'hook'
import { Table, Typography, Grid, Box } from '@mui/material'
import { GStyledTableHeaderBox, GStyledSpanBox } from 'theme/style'
import { useGetAllMachineQuery, useGetUserQuery, getMachines, resetMachines } from 'store/slice'
import { ChangeMachinePage, ChangeMachineRowsPerPage, setMachineFilterBy } from 'store/slice/product'
import { MotionLazyContainer } from 'component/animate'
import { useSettingContext } from 'component/setting'
import { SearchBox } from 'component/search'
import { TableNoData } from 'component'
import { SkeletonTable } from 'component/skeleton'
import { MachineTable, MachineHeader, MachineListPagination } from 'section/product'
import { MARGIN, TABLE } from 'config'
import { COLOR, KEY, TITLE, RESPONSE } from 'constant'
import { StyledScrollTableContainer } from './style'

const MachineListSection = () => {
  const [tableData, setTableData] = useState([])
  const { machines, initial, isLoading, machinePage, machineRowsPerPage, machineFilterBy, responseMessage } = useSelector((state) => state.machine)
  const { userId } = useSelector((state) => state.auth)
  const { data: userDetail, isLoading: isUserFetching, error, refetch } = useGetUserQuery(userId)
  // const { data: allMachineData, isLoading, error: allMachineError, refetch: refetchAllMachine } = useGetAllMachineQuery()

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
    defaultOrderBy: 'createdAt',
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
    dispatch(getMachines(null, null, false))
    return () => {
      dispatch(resetMachines())
    }
  }, [dispatch])

  useEffect(() => {
    setTableData(machines || [])
  }, [machines])

  // useEffect(() => {
  //   if (allMachineError) {
  //     snack(RESPONSE.error.FETCH, { variant: COLOR.ERROR })
  //   } else if (isLoading) {
  //     snack(RESPONSE.FETCH_LOADING)
  //   } else {
  //     snack(RESPONSE.success.FETCH, { variant: COLOR.SUCCESS })
  //     refetchAllMachine()
  //     setTableData(allMachineData)
  //   }
  //   refetchAllMachine()
  // }, [refetchAllMachine, allMachineData, isLoading, allMachineError])

  // const debouncedSearch = useRef(
  //   debounce((value) => {
  //     dispatch(ChangeMachinePage(0))
  //     dispatch(setMachineFilterBy(value))
  //   }, 500)
  // )

  // const handleSearch = (event) => {
  //   debouncedSearch.current(event.target.value)
  //   dispatch(setMachineFilterBy(event.target.value))
  // }

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
    <MotionLazyContainer display="flex">
      <GStyledSpanBox>
        <Typography variant="h3" color={themeMode === KEY.LIGHT ? 'common.black' : 'common.white'}>
          {userDetail?.customer?.name.toUpperCase() || TITLE.MACHINE} &nbsp;
        </Typography>
        <Typography variant="h3" color={themeMode === KEY.LIGHT ? 'grey.200' : 'howick.bronze'}>
          / {TITLE.MACHINE_LIST}
        </Typography>
      </GStyledSpanBox>
      <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} />
      <Grid container flexDirection="row" {...MARGIN.PAGE_PROP}>
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
