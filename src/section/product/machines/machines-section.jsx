import { useEffect, useState, useRef } from 'react'
import { snack, useTable } from 'hook'
import debounce from 'lodash/debounce'
import { Table, TableContainer, Typography, Grid } from '@mui/material'
import { GStyledTableHeaderBox } from 'theme/style'
import { useGetAllMachineQuery } from 'store/slice'
import { MotionLazyContainer } from 'component/animate'
import { useSettingContext } from 'component/setting'
import { SearchBox } from 'component/search'
import { TableNoData, TableSkeleton } from 'component/table'
import { MachineTable, MachineHeader, MachineListPagination } from 'section/product'
import { Scrollbar } from 'component'
import { MARGIN, ASSET, TABLE } from 'config'
import { COLOR, KEY, TITLE, RESPONSE } from 'constant'

const MachineListSection = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [tableData, setTableData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const { data: allMachineData, isLoading, isError, refetch: refetchAllMachine } = useGetAllMachineQuery()

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
    if (isError) {
      snack(RESPONSE.error.FETCH, { variant: COLOR.ERROR })
    } else if (isLoading) {
      snack(RESPONSE.FETCH_LOADING)
    } else {
      snack(RESPONSE.success.FETCH, { variant: COLOR.SUCCESS })
      refetchAllMachine()
      setTableData(allMachineData)
    }
    refetchAllMachine()
  }, [refetchAllMachine, allMachineData, isLoading, isError])

  const debouncedSearch = useRef(
    debounce((value) => {
      setPage(0)
      setSearchTerm(value)
    }, 500)
  )

  const handleSearch = (event) => {
    debouncedSearch.current(event.target.value)
    setSearchTerm(event.target.value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0)
    setRowsPerPage(parseInt(event.target.value, 10))
  }
  const filteredData =
    tableData && tableData.filter((row) => Object.values(row)?.some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())))
  const isNotFound = !isLoading && !filteredData.length

  return (
    <MotionLazyContainer display="flex">
      <Typography variant="h2" color={themeMode === KEY.LIGHT ? 'common.black' : 'common.white'}>
        {TITLE.MACHINE_LIST}
      </Typography>
      <SearchBox term={searchTerm} mode={themeMode} handleSearch={handleSearch} />
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
              {/* <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <Scrollbar> */}
              <Table>
                <MachineHeader mode={themeMode} />

                {(isLoading ? [...Array(rowsPerPage)] : filteredData)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) =>
                    row ? (
                      <MachineTable key={row._id} machine={row} mode={themeMode} index={index} />
                    ) : (
                      !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    )
                  )}
                <TableNoData isNotFound={isNotFound} />
              </Table>
              {/* </Scrollbar>
              </TableContainer> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MotionLazyContainer>
  )
}

export default MachineListSection
