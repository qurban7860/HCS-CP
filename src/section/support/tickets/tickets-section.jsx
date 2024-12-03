import { Fragment, useEffect, useState, memo } from 'react'
import _ from 'lodash'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { useSelector, dispatch } from 'store'
import { useAuthContext } from 'auth'
import { useTable, useFilter, getComparator, useSettingContext, useResponsive } from 'hook'
import {
 getCustomer,
 getSecurityUser,
 getCustomerTickets,
 getCustomerTicketBySerialNoAndKey,
 setCustomerTicketFilterBy,
 setSelectedCustomerTicketCard,
 setCustomerTicketDialog,
 ChangeCustomerTicketPage,
 ChangeCustomerTicketRowsPerPage,
 resetCustomerTickets
} from 'store/slice'
import { TicketsTable, TicketsTableHeader, TicketsListPagination, TicketCard, useTicketsDefaultValues } from 'section/support'
import { Table, Grid, TableContainer, Typography } from '@mui/material'
import { TableNoData, SkeletonTable, SearchBox, TableTitleBox, HowickLoader, SupportTicketDialog } from 'component'
import { GStyledTableHeaderBox } from 'theme/style'
import { GLOBAL } from 'config/global'
import { MARGIN, TABLE } from 'config'
import { KEY, FLEX, FLEX_DIR, TYPOGRAPHY } from 'constant'

const TicketsListSection = () => {
 const [tableData, setTableData] = useState([])
 const [filterPeriodOption, setFilterPeriodOption] = useState(3)
 const { userId } = useAuthContext()
 const { customer } = useSelector(state => state.customer)
 const { customerTickets, initial, isLoading, customerTicketRowsPerPage, customerTicketPage, selectedCustomerTicketCard } = useSelector(state => state.customerTicket)
 const { securityUser } = useSelector(state => state.user)

 const isMobile = useResponsive('down', 'sm')
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

 const defaultValues = useTicketsDefaultValues(tableData && tableData)
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

 const handleSelectedCard = (event, key) => {
  event.preventDefault()
  dispatch(setSelectedCustomerTicketCard(key))
 }

 const handleCustomerTicketCard = (event, machineSerialNo, customerTicketKey) => {
  event.preventDefault()
  dispatch(getCustomerTicketBySerialNoAndKey(machineSerialNo, customerTicketKey))
  dispatch(setSelectedCustomerTicketCard(customerTicketKey))
  dispatch(setCustomerTicketDialog(true))
 }

 const handleCustomerTicketInNewTabCard = jiraKey => {
  const url = GLOBAL.JIRA_URL + jiraKey
  window.open(url, KEY.BLANK)
 }

 const isNotFound = !isLoading && !filteredData?.length

 return (
  <Fragment>
   <TableTitleBox title={t('support_tickets.label')} user={securityUser} />
   <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} onReload={onRefresh} />
   {isMobile ? (
    <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
     <Grid item xs={12} sm={12}>
      <Grid container mb={2}>
       <Grid item xs={12} sm={12} mb={2} bgcolor='transparent'>
        <Grid container p={1}>
         {!isLoading ? (
          filteredData?.length > 0 ? (
           defaultValues.map((cticket, index) => (
            <TicketCard
             key={index}
             selectedCardId={selectedCustomerTicketCard || index}
             ticket={cticket}
             handleSelected={handleSelectedCard}
             handleTicketCard={handleCustomerTicketCard}
             handleTicketInNewTabCard={handleCustomerTicketInNewTabCard}
            />
           ))
          ) : (
           <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.no'>
            <Trans i18nKey='no_found.label' values={{ value: 'Ticket' }} />
           </Typography>
          )
         ) : (
          <Grid item xs={12} sm={12}>
           <HowickLoader mode={themeMode} />
          </Grid>
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
        <TicketsListPagination
         mode={themeMode}
         data={filteredData}
         page={customerTicketPage}
         rowsPerPage={customerTicketRowsPerPage}
         handleChangePage={handleChangePage}
         handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <TableContainer>
         <Table>
          <TicketsTableHeader mode={themeMode} />
          {(isLoading ? [...Array(customerTicketRowsPerPage)] : filteredData)
           .slice(customerTicketPage * customerTicketRowsPerPage, customerTicketPage * customerTicketRowsPerPage + customerTicketRowsPerPage)
           .map((row, index) =>
            row ? (
             <TicketsTable key={row.key} handleCustomerTicket={handleCustomerTicketCard} ticket={row} mode={themeMode} index={index} />
            ) : (
             !isNotFound && <SkeletonTable key={index} sx={{ height: denseHeight }} />
            )
           )}
          <TableNoData isNotFound={isNotFound} />
         </Table>
        </TableContainer>
       </Grid>
      </Grid>
     </Grid>
    </Grid>
   )}
   {customerTickets && <SupportTicketDialog />}
  </Fragment>
 )
}

export default memo(TicketsListSection)
