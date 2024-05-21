import { useEffect, useState, useRef } from 'react'
import { useSelector, dispatch } from 'store'
import debounce from 'lodash/debounce'
import { snack, useTable } from 'hook'
import { Table, Typography, Grid } from '@mui/material'
import { GStyledTableHeaderBox, GStyledSpanBox } from 'theme/style'
import { useGetAllCustomerQuery, useGetUserQuery } from 'store/slice'
import { ChangeCustomerPage, ChangeCustomerRowsPerPage, setCustomerFilterBy } from 'store/slice/crm'
import { MotionLazyContainer } from 'component/animate'
import { useSettingContext } from 'component/setting'
import { SearchBox } from 'component/search'
import { TableNoData } from 'component'
import { SkeletonTable } from 'component/skeleton'
import { CustomerTable, CustomerHeader, CustomerListPagination } from 'section/crm'
import { MARGIN, TABLE } from 'config'
import { COLOR, KEY, TITLE, RESPONSE, VARIANT } from 'constant'
import { StyledScrollTableContainer } from './style'

const { TYPOGRAPHY } = VARIANT

const CustomerListSection = () => {
  const [tableData, setTableData] = useState([])
  const { customerFilterBy, customerPage, customerRowsPerPage } = useSelector((state) => state.customer)
  const { userId } = useSelector((state) => state.auth)
  const { data: allCustomerData, isLoading, error: allCustomerError, refetch: refetchAllCustomer } = useGetAllCustomerQuery()

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
    if (allCustomerError) {
      snack(RESPONSE.error.FETCH, { variant: COLOR.ERROR })
    } else if (isLoading) {
      snack(RESPONSE.FETCH_LOADING)
    } else {
      snack(RESPONSE.success.FETCH, { variant: COLOR.SUCCESS })
      refetchAllCustomer()
      setTableData(allCustomerData)
    }
    refetchAllCustomer()
  }, [refetchAllCustomer, allCustomerData, isLoading, allCustomerError])

  const debouncedSearch = useRef(
    debounce((value) => {
      dispatch(ChangeCustomerPage(0))
      dispatch(setCustomerFilterBy(value))
    }, 500)
  )

  const handleSearch = (event) => {
    debouncedSearch.current(event.target.value)
    dispatch(setCustomerFilterBy(event.target.value))
  }

  const handleChangePage = (event, newPage) => {
    if (newPage < Math.ceil(filteredData.length / customerRowsPerPage)) {
      dispatch(ChangeCustomerPage(newPage))
    }
  }

  const handleChangeRowsPerPage = (event) => {
    dispatch(ChangeCustomerPage(0))
    dispatch(ChangeCustomerRowsPerPage(parseInt(event.target.value, 10)))
  }
  const filteredData =
    tableData &&
    tableData.filter((row) => Object.values(row)?.some((value) => value?.toString().toLowerCase().includes(customerFilterBy.toLowerCase())))
  const isNotFound = !isLoading && !filteredData.length

  return (
    <MotionLazyContainer display="flex">
      <GStyledSpanBox>
        {/* <Typography variant="h3" color={themeMode === KEY.LIGHT ? 'common.black' : 'common.white'}>
          {userDetail?.customer?.name.toUpperCase() || TITLE.MACHINE} &nbsp;
        </Typography> */}
        <Typography variant={TYPOGRAPHY.H3} color={themeMode === KEY.LIGHT ? 'grey.200' : 'howick.bronze'}>
          {TITLE.ORGANIZATIONS.toUpperCase()}
        </Typography>
      </GStyledSpanBox>
      <SearchBox term={customerFilterBy} mode={themeMode} handleSearch={handleSearch} />
      <Grid container flexDirection="row" {...MARGIN.PAGE_PROP}>
        <Grid item lg={12}>
          <Grid container mb={2}>
            <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper">
              <GStyledTableHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={2} />
              <CustomerListPagination
                mode={themeMode}
                data={filteredData}
                page={customerPage}
                rowsPerPage={customerRowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
              <StyledScrollTableContainer>
                <Table>
                  <CustomerHeader mode={themeMode} />
                  {(isLoading ? [...Array(customerRowsPerPage)] : filteredData)
                    .slice(customerPage * customerRowsPerPage, customerPage * customerRowsPerPage + customerRowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <CustomerTable key={row._id} customer={row} mode={themeMode} index={index} />
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

export default CustomerListSection
