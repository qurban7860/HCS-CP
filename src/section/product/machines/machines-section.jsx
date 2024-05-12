import { useEffect, useState, useRef } from 'react'
import { useSelector, dispatch } from 'store'
import debounce from 'lodash/debounce'
import { snack, useTable } from 'hook'
import { Table, Typography, Grid, Box } from '@mui/material'
import { GStyledTableHeaderBox, GStyledSpanBox } from 'theme/style'
import { useGetAllMachineQuery, useGetUserQuery } from 'store/slice'
import { ChangePage, ChangeRowsPerPage, setFilterBy } from 'store/slice/product'
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

  const { page, rowsPerPage, filterBy } = useSelector((state) => state.machine)
  const { user: userState, userId } = useSelector((state) => state.auth)
  const { data: userDetail, isLoading: isUserFetching, error, refetch } = useGetUserQuery(userId)
  const { data: allMachineData, isLoading, error: allMachineError, refetch: refetchAllMachine } = useGetAllMachineQuery()

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

  useEffect(() => {
    if (allMachineError) {
      snack(RESPONSE.error.FETCH, { variant: COLOR.ERROR })
    } else if (isLoading) {
      snack(RESPONSE.FETCH_LOADING)
    } else {
      snack(RESPONSE.success.FETCH, { variant: COLOR.SUCCESS })
      refetchAllMachine()
      setTableData(allMachineData)
    }
    refetchAllMachine()
  }, [refetchAllMachine, allMachineData, isLoading, allMachineError])

  const debouncedSearch = useRef(
    debounce((value) => {
      dispatch(ChangePage(0))
      dispatch(setFilterBy(value))
    }, 500)
  )

  const handleSearch = (event) => {
    debouncedSearch.current(event.target.value)
    dispatch(setFilterBy(event.target.value))
  }

  const handleChangePage = (event, newPage) => {
    dispatch(ChangePage(newPage))
  }

  const handleChangeRowsPerPage = (event) => {
    dispatch(ChangePage(0))
    dispatch(ChangeRowsPerPage(parseInt(event.target.value, 10)))
  }
  const filteredData =
    tableData && tableData.filter((row) => Object.values(row)?.some((value) => value?.toString().toLowerCase().includes(filterBy.toLowerCase())))
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
      <SearchBox term={filterBy} mode={themeMode} handleSearch={handleSearch} />
      <Grid container flexDirection="row" {...MARGIN.PAGE_PROP}>
        <Grid item lg={12}>
          <Grid container mb={2}>
            <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper">
              <GStyledTableHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={2} />
              <MachineListPagination
                mode={themeMode}
                data={filteredData}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
              <StyledScrollTableContainer>
                <Table>
                  <MachineHeader mode={themeMode} />
                  {/* <Box gutterBottom={2} component={m.div} height={2} /> */}
                  {(isLoading ? [...Array(rowsPerPage)] : filteredData)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
