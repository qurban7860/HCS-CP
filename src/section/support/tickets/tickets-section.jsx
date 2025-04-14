import { Fragment, useEffect, useState, memo } from 'react'
import _ from 'lodash'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector, dispatch } from 'store'
import { useAuthContext } from 'auth'
import { useTable, useTempFilter, getComparator, useSettingContext, useResponsive } from 'hook'
import {
 getCustomer,
 getTickets,
 getCustomerTicketBySerialNoAndKey,
 setCustomerTicketFilterBy,
 setSelectedCustomerTicketCard,
 setCustomerTicketDialog,
 ChangeTicketPage,
 ChangeTicketRowsPerPage
} from 'store/slice'
import { TicketsTable, TicketsTableHeader, TicketsListPagination, TicketCard, HEADER_ITEMS } from 'section/support'
import { Table, Grid, Typography } from '@mui/material'
import { TableNoData, SkeletonTable, SearchBox, TableTitleBox, HowickLoader, SupportTicketDialog } from 'component'
import { GStyledTableHeaderBox } from 'theme/style'
import { GLOBAL } from 'config/global'
import { MARGIN, TABLE } from 'config'
import { KEY, FLEX_DIR, TYPOGRAPHY } from 'constant'
import { StyledScrollTableContainer } from './style'
// import { PATH_SUPPORT } from 'route/path'

const TicketsListSection = () => {
 const [tableData, setTableData]                                      = useState([])
 const { user }                                                       = useAuthContext()
 const { customer }                                                   = useSelector(state => state.customer)
 const { tickets, initial, isLoading, ticketPage, ticketRowsPerPage } = useSelector(state => state.ticket)
 const [selectedResolvedStatus, setSelectedResolvedStatus] = useState("all");

 const navigate      = useNavigate()
 const isMobile      = useResponsive('down', 'sm')
 const { themeMode } = useSettingContext()
 const denseHeight   = TABLE.DENSE_HEIGHT

 const {
  order,
  orderBy,
  setPage: setTablePage,
  onSort
 } = useTable({
  defaultOrderBy: 'createdAt',
  defaultOrder  : KEY.DESC
 })

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   if (!customer) {
    dispatch(getCustomer(user?.customer))
   }
  }, 300)
  debouncedDispatch()
  return () => {
   debouncedDispatch.cancel()
  }
 }, [customer, user?.customer])

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
    if (customer?._id) {
      setTableData([]); 
      dispatch(getTickets(customer?._id, selectedResolvedStatus));
    }
  }, 300);
  debouncedDispatch();
  return () => debouncedDispatch.cancel();
}, [customer?._id, selectedResolvedStatus]);

const onRefresh = () => {
  setTableData([]); 
  dispatch(getTickets(customer?._id, selectedResolvedStatus));
};

useEffect(() => {
  if (!isLoading && tickets) {
    setTableData(tickets || []);
  }
}, [tickets, isLoading]);

//  const defaultValues = useTicketsDefaultValues(tableData && tableData)
 const { filterName, handleFilterName, filteredData } = useTempFilter(getComparator(order, orderBy), tableData, initial, ChangeTicketPage, setCustomerTicketFilterBy)

 const onChangePage = (event, newPage) => {
  if (newPage < Math.ceil(filteredData.length / ticketRowsPerPage)) {
   dispatch(ChangeTicketPage(newPage))
  }
 }

 const onChangeRowsPerPage = event => {
  dispatch(ChangeTicketPage(0))
  dispatch(ChangeTicketRowsPerPage(parseInt(event.target.value, 10)))
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

//  const handleCreateTicket = () => {
//   // navigate to create ticket
//   navigate(PATH_SUPPORT.tickets.create)
//  }

 const isNotFound = !isLoading && !filteredData?.length

 return (
  <Fragment>
   <TableTitleBox title={t('support_tickets.label')} />
   <SearchBox term={filterName} mode={themeMode} 
    handleSearch={handleFilterName} 
    filterResolvedStatus={selectedResolvedStatus} 
    onFilterResolvedStatus={setSelectedResolvedStatus} 
    onReload={onRefresh} 
    />
   {isMobile ? (
    <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
     <Grid item xs={12} sm={12}>
      <Grid container mb={2}>
       <Grid item xs={12} sm={12} mb={2} bgcolor='transparent'>
        <Grid container p={1}>
         {!isLoading ? (
          filteredData?.length > 0 ? (
            filteredData.map((cticket, index) => (
            <TicketCard
             key={index}
             selectedCardId={index}
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
         ) : isLoading ? (
          <Grid item xs={12} sm={12}>
           <HowickLoader mode={themeMode} />
          </Grid>
         ) : (
          <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.no'>
           <Trans i18nKey='no_found.label' values={{ value: 'Ticket' }} />
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
        <TicketsListPagination
         mode={themeMode}
         data={filteredData}
         page={ticketPage}
         rowsPerPage={ticketRowsPerPage}
         handleChangePage={onChangePage}
         handleChangeRowsPerPage={onChangeRowsPerPage}
         columnFilterButtonData={HEADER_ITEMS}
        />
        <StyledScrollTableContainer>
         <Table>
          <TicketsTableHeader columns={HEADER_ITEMS} dataFiltered={filteredData} orderBy={orderBy} order={order} onSort={onSort} />
          {(isLoading ? [...Array(ticketRowsPerPage)] : filteredData)
           .slice(ticketPage * ticketRowsPerPage, ticketPage * ticketRowsPerPage + ticketRowsPerPage)
           .map((row, index) =>
            row ? (
             <TicketsTable key={index} columns={HEADER_ITEMS} ticket={row} mode={themeMode} index={index} />
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
   {tickets && <SupportTicketDialog />}
  </Fragment>
 )
}

export default memo(TicketsListSection)
