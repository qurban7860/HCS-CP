import { useEffect, useState, memo } from 'react'
import _ from 'lodash'
import { t } from 'i18next'
import { useSelector, dispatch } from 'store'
import { useAuthContext } from 'auth'
import { useTable, useFilter, getComparator, useSettingContext } from 'hook'
import { getCustomer, getSecurityUser, setCustomerTicketFilterBy, ChangeCustomerTicketPage, ChangeCustomerTicketRowsPerPage, getCustomerTickets, resetCustomerTickets } from 'store/slice'
import { Table, Grid } from '@mui/material'
import { GStyledTableHeaderBox } from 'theme/style'
import { TableNoData, MotionLazyContainer, SkeletonTable, SearchBox, TableTitleBox } from 'component'
import { TicketsTable, TicketsTableHeader, TicketsListPagination } from 'section/support'
import { MARGIN, TABLE } from 'config'
import { KEY, FLEX, FLEX_DIR } from 'constant'
import { StyledScrollTableContainer } from './style'

const TicketsListSection = () => {
 const [tableData, setTableData] = useState([])
 const [filterPeriodOption, setFilterPeriodOption] = useState(3)
 const { userId } = useAuthContext()
 const { customer } = useSelector(state => state.customer)
 const { customerTickets, initial, isLoading, customerTicketRowsPerPage, customerTicketPage } = useSelector(state => state.customerTicket)
 const { securityUser } = useSelector(state => state.user)

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

 // populate with only tix for certain org by ref, or machine by serialNo
 useEffect(() => {
  if (userId !== securityUser?._id) {
   dispatch(getSecurityUser(userId))
  }
 }, [dispatch, userId])

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   if (securityUser?.customers) {
    dispatch(getCustomer(securityUser?.customer?._id))
    dispatch(getCustomerTickets(securityUser?.customers[0]?.ref, filterPeriodOption))
   }
  }, 300)

  debouncedDispatch()

  return () => {
   debouncedDispatch.cancel()
   dispatch(resetCustomerTickets())
  }
 }, [dispatch, securityUser?.customers, filterPeriodOption])

 const onRefresh = () => {
  dispatch(getCustomerTickets(customer?.ref, filterPeriodOption))
 }

 useEffect(() => {
  if (initial) {
   setTableData(customerTickets?.issues || [])
  }
 }, [customerTickets, initial])

 const { filterName, handleFilterName, filteredData } = useFilter(getComparator(order, orderBy), tableData, initial, ChangeCustomerTicketPage, setCustomerTicketFilterBy)

 const handleChangePage = (event, newPage) => {
  if (newPage < Math.ceil(filteredData.length / customerTicketRowsPerPage)) {
   dispatch(ChangeCustomerTicketPage(newPage))
  }
 }

 const handleChangeRowsPerPage = event => {
  dispatch(ChangeCustomerTicketPage(0))
  dispatch(ChangeCustomerTicketRowsPerPage(parseInt(event.target.value, 10)))
 }

 const isNotFound = !isLoading && !filteredData?.length

 return (
  <MotionLazyContainer display={FLEX.FLEX}>
   <TableTitleBox title={t('support_tickets.label')} user={securityUser} />
   <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} onReload={onRefresh} />
   <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
    <Grid item lg={12}>
     <Grid container mb={2}>
      <Grid item lg={12} sm={12} mb={2} bgcolor='background.paper'>
       <GStyledTableHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={2} />
       <TicketsListPagination
        mode={themeMode}
        data={filteredData}
        page={customerTicketPage}
        rowsPerPage={customerTicketRowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
       />
       <StyledScrollTableContainer>
        <Table>
         <TicketsTableHeader mode={themeMode} />
         {(isLoading ? [...Array(customerTicketRowsPerPage)] : filteredData)
          .slice(customerTicketPage * customerTicketRowsPerPage, customerTicketPage * customerTicketRowsPerPage + customerTicketRowsPerPage)
          .map((row, index) => (row ? <TicketsTable key={row.key} ticket={row} mode={themeMode} index={index} /> : !isNotFound && <SkeletonTable key={index} sx={{ height: denseHeight }} />))}
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
