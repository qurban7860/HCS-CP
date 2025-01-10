import { Fragment, useEffect, useLayoutEffect, useState, memo } from 'react'
import { Trans } from 'react-i18next'
import { dispatch, useSelector } from 'store'
import { useSettingContext, useTable, getComparator, useTempFilter, useUIMorph } from 'hook'
import {
 getMachineTicketByKey,
 getMachineTickets,
 setSelectedMachineTicketCard,
 setMachineTicketDialog,
 setMachineTicketFilterBy,
 ChangeMachineTicketPage,
 resetMachineTicketRecords,
 resetSelectedMachineTicketCard
} from 'store/slice'
import { useTicketsDefaultValues, useTicketDefaultValues, TicketCard as MachineTicketCard } from 'section/support'
import { CommonFieldsContainer } from 'section/common'
import { TicketCard, fieldsTicketBasicInfoConfig, fieldsTicketQuickSpecsConfig } from 'section/product'
import { Divider, Grid, Card, Typography, Box } from '@mui/material'
import { MachineSupportTicketDialog, AuditBox, CustomerDialog, SearchBox, TableNoData, HowickLoader } from 'component'
import { GCardOption, GStyledStickyGrid, GStyledTopBorderDivider, GStyledScrollableHeightLockGrid, GStyledSpanBox, GStyledFieldChip, GStyledSupportStatusFieldChip } from 'theme/style'
import { normalizer } from 'util/format'
import { GLOBAL } from 'config/global'
import { MARGIN, NAV, SPACING } from 'config/layout'
import { KEY, FLEX, TYPOGRAPHY, FLEX_DIR, VARIANT, SIZE } from 'constant'

const TicketsTab = () => {
 const [tableData, setTableData] = useState([])
 const { machineTicket, machineTickets, initial, isLoading, selectedMachineTicketCard } = useSelector(state => state.machineTicket)
 const { machine } = useSelector(state => state.machine)
 const { customerDialog } = useSelector(state => state.customer)
 const { themeMode } = useSettingContext()
 const { isMobile, isDesktop } = useUIMorph()
 const { order, orderBy } = useTable({
  defaultOrderBy: 'created',
  defaultOrder: 'desc'
 })
 useLayoutEffect(() => {
  if (machine?.serialNo) {
   dispatch(getMachineTickets(machine?.serialNo))
  }
  return () => {
   dispatch(resetSelectedMachineTicketCard())
   dispatch(resetMachineTicketRecords([]))
  }
 }, [dispatch, machine?.serialNo])

 useEffect(() => {
  if (initial) {
   setTableData(machineTickets?.issues || [])
  }
 }, [machineTickets, initial])

 useEffect(() => {
  if (machineTickets?.issues?.length > 0) {
   dispatch(setSelectedMachineTicketCard(machineTickets?.issues[0]?.key))
   dispatch(getMachineTicketByKey(machine.serialNo, selectedMachineTicketCard))
  }
 }, [machineTickets, dispatch])

 const defaultValues = useTicketsDefaultValues(tableData && tableData)
 const ticket = useTicketDefaultValues(machineTicket)

 const { filterName, handleFilterName, filteredData } = useTempFilter(getComparator(order, orderBy), tableData || [], initial, ChangeMachineTicketPage, setMachineTicketFilterBy)

 const handleMachineTicketCard = (event, machineTicketKey) => {
  event.preventDefault()
  dispatch(getMachineTicketByKey(machine.serialNo, machineTicketKey))
  dispatch(setSelectedMachineTicketCard(machineTicketKey))
 }

 const handleSelectedCard = (event, key) => {
  event.preventDefault()
  dispatch(setSelectedMachineTicketCard(key))
 }

 const handleMachineTicketCardMobile = (event, machineSerialNo, machineTicketKey) => {
  event.preventDefault()
  dispatch(getMachineTicketByKey(machineSerialNo, machineTicketKey))
  dispatch(setSelectedMachineTicketCard(machineTicketKey))
  dispatch(setMachineTicketDialog(true))
 }

 const handleMachineTicketInNewTabCard = jiraKey => {
  const url = GLOBAL.JIRA_URL + jiraKey
  window.open(url, KEY.BLANK)
 }

 const isNotFound = !isLoading && !filteredData.length

 const renderTitlebar = () => {
  return (
   <Grid item xs={12} sm={12}>
    <GStyledSpanBox justifyContent={FLEX.SPACE_BETWEEN} spacing={1} py={1}>
     <Box>
      <GStyledSpanBox justifyContent={FLEX.FLEX_START}>
       <Typography variant={isDesktop ? TYPOGRAPHY.H3 : TYPOGRAPHY.H5}>{ticket?.key}: &nbsp;</Typography>
      </GStyledSpanBox>
      <Typography variant={isDesktop ? TYPOGRAPHY.BODY1 : TYPOGRAPHY.BODY2} color='text.secondary'>
       &nbsp; {ticket?.issue}
      </Typography>
      {ticket?.tags.map((tag, index) => (
       <GStyledFieldChip key={index} mode={themeMode} label={<Typography variant={TYPOGRAPHY.OVERLINE1}>{tag?.name}</Typography>} size={SIZE.SMALL} />
      ))}
     </Box>
     <GStyledSpanBox justifyContent={FLEX.FLEX_END} spacing={1} py={1}>
      <Box mt={1} spacing={2}>
       <GStyledSupportStatusFieldChip
        status={normalizer(ticket?.status)}
        mode={themeMode}
        label={<Typography variant={isDesktop ? TYPOGRAPHY.OVERLINE2 : TYPOGRAPHY.OVERLINE_MINI}>{ticket?.status}</Typography>}
        size={SIZE.SMALL}
       />
      </Box>
     </GStyledSpanBox>
    </GStyledSpanBox>
   </Grid>
  )
 }

 const renderSidebar = () => {
  return (
   <Fragment>
    {filteredData?.length >= 5 && (
     <Grid item sm={12} pb={2}>
      <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} mt={0} />
     </Grid>
    )}
    <GStyledScrollableHeightLockGrid isMobile={isMobile} mode={themeMode} totalCount={filteredData?.length}>
     <Grid container gap={2} p={1} height={'auto'} sx={{ maxHeight: NAV.H_MAX_SIDE_PANEL, overflow: 'auto' }}>
      {filteredData?.length > 0 && !isLoading ? (
       defaultValues?.map((t, index) => <TicketCard key={index} selectedCardId={selectedMachineTicketCard || index} value={t} handleMachineTicketCard={handleMachineTicketCard} t={t} />)
      ) : isLoading ? (
       <Grid item xs={12} md={12}>
        <HowickLoader mode={themeMode} />
       </Grid>
      ) : (
       <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.no'>
        <Trans i18nKey='no_found.label' values={{ value: 'support ticket' }} />
       </Typography>
      )}
     </Grid>
    </GStyledScrollableHeightLockGrid>
   </Fragment>
  )
 }

 return (
  <Fragment>
   {isDesktop ? (
    <Grid container columnSpacing={SPACING.COLUMN_SPACING} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
     <GStyledStickyGrid item xs={12} sm={3}>
      {renderSidebar()}
     </GStyledStickyGrid>
     <Grid item xs={12} md={9}>
      {machineTickets?.issues?.length > 0 && !isLoading ? (
       <Fragment>
        <Box mb={2}>
         <Card {...GCardOption(themeMode)}>
          <GStyledTopBorderDivider mode={themeMode} />
          <Grid container spacing={2} px={1.5} mb={10}>
           {renderTitlebar()}
           <Grid item lg={12}>
            <Divider variant={VARIANT.MIDDLE} style={{ width: '100%', marginBottom: 5 }} />
           </Grid>
           <Grid item lg={12} sm={12}>
            <CommonFieldsContainer defaultValues={ticket} fieldsConfig={fieldsTicketBasicInfoConfig} isLoading={isLoading} />
           </Grid>
           <Grid item lg={12} sm={12}>
            <CommonFieldsContainer defaultValues={ticket} fieldsConfig={fieldsTicketQuickSpecsConfig} isLoading={isLoading} />
           </Grid>
          </Grid>
         </Card>
        </Box>
        <AuditBox value={ticket} />
       </Fragment>
      ) : (
       <Box display={FLEX.CENTER} justifyContent={FLEX.CENTER} alignItems={FLEX.CENTER} style={{ height: '100%' }}>
        <TableNoData ticketNotFound={isNotFound} />
       </Box>
      )}
     </Grid>
    </Grid>
   ) : (
    <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
     <Grid item xs={12} sm={12}>
      <Grid container mb={2}>
       <Grid item xs={12} sm={12} mb={2} bgcolor='transparent'>
        <Grid container p={1}>
         {!isLoading ? (
          filteredData?.length > 0 ? (
           defaultValues.map((cticket, index) => (
            <MachineTicketCard
             key={index}
             selectedCardId={selectedMachineTicketCard || index}
             ticket={cticket}
             handleSelected={handleSelectedCard}
             handleTicketCard={handleMachineTicketCardMobile}
             handleTicketInNewTabCard={handleMachineTicketInNewTabCard}
             isMachinePage
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
   )}
   {machineTickets && <MachineSupportTicketDialog />}
   {customerDialog && <CustomerDialog />}
  </Fragment>
 )
}

export default memo(TicketsTab)
