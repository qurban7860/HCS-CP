import { useEffect, useState, memo, useLayoutEffect } from 'react'
import { useSelector, dispatch } from 'store'
import { useAuthContext } from 'auth'
import { snack, useTable, useFilter, getComparator, useSettingContext } from 'hook'
import {
  getTickets,
  getSecurityUser,
  setTicketFilterBy,
  ChangeTicketPage,
  ChangeTicketRowsPerPage,
  resetTickets,
  resetSecurityUser
} from 'store/slice'
import { Table, Typography, Grid, Box } from '@mui/material'
import { GStyledTableHeaderBox, GStyledSpanBox } from 'theme/style'
import { TableNoData, MotionLazyContainer, SkeletonTable, SearchBox, TableTitleBox } from 'component'
import { TicketsTable, TicketsTableHeader, TicketsListPagination } from 'section/support'
import { MARGIN, TABLE } from 'config'
import { COLOR, KEY, TITLE, RESPONSE, FLEX, FLEX_DIR } from 'constant'
import { StyledScrollTableContainer } from './style'

const TicketsListSection = () => {
  const [tableData, setTableData] = useState([])
  const [filterPeriodOption, setFilterPeriodOption] = useState(3)
  const { tickets, initial, isLoading, ticketRowsPerPage, ticketPage } = useSelector((state) => state.ticket)
  const { userId } = useAuthContext()
  const { securityUser } = useSelector((state) => state.user)

  const { themeMode } = useSettingContext()
  const denseHeight = TABLE.DENSE_HEIGHT

  const {
    order,
    orderBy,
    setPage: setTablePage
  } = useTable({
    defaultOrderBy: KEY.CREATED_AT,
    defaultOrder: KEY.DESC
  })

  useEffect(() => {
    dispatch(getTickets(filterPeriodOption))
  }, [filterPeriodOption])

  const onRefresh = () => {
    dispatch(getTickets(filterPeriodOption))
  }

  useEffect(() => {
    if (initial) {
      setTableData(tickets.issues || [])
    }
  }, [tickets.issues])

  useEffect(() => {
    if (userId) {
      dispatch(getSecurityUser(userId))
    }
  }, [dispatch, userId])

  const { filterName, handleFilterName, filteredData } = useFilter(
    getComparator(order, orderBy),
    tableData,
    initial,
    ChangeTicketPage,
    setTicketFilterBy
  )

  const handleFilterStatus = (event) => {
    // debouncedStatus.current(event.target.value)
    setFilterStatusOption(event.target.value)
    ChangeTicketPage(0)
  }

  const handleChangePage = (event, newPage) => {
    if (newPage < Math.ceil(filteredData.length / ticketRowsPerPage)) {
      dispatch(ChangeTicketPage(newPage))
    }
  }

  const handleChangeRowsPerPage = (event) => {
    dispatch(ChangeTicketPage(0))
    dispatch(ChangeTicketRowsPerPage(parseInt(event.target.value, 10)))
  }

  const isNotFound = !isLoading && !filteredData?.length

  return (
    <MotionLazyContainer display={FLEX.FLEX}>
      <TableTitleBox title={TITLE.SUPPORT_TICKETS} user={securityUser} />
      <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} onReload={onRefresh} />
      <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
        <Grid item lg={12}>
          <Grid container mb={2}>
            <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper">
              <GStyledTableHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={2} />
              <TicketsListPagination
                mode={themeMode}
                data={filteredData}
                page={ticketPage}
                rowsPerPage={ticketRowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
              <StyledScrollTableContainer>
                <Table>
                  <TicketsTableHeader mode={themeMode} />
                  {(isLoading ? [...Array(ticketRowsPerPage)] : filteredData)
                    .slice(ticketPage * ticketRowsPerPage, ticketPage * ticketRowsPerPage + ticketRowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <TicketsTable key={row.key} ticket={row} mode={themeMode} index={index} />
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

export default memo(TicketsListSection)
