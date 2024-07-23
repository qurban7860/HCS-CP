import { useEffect, useLayoutEffect, useState, useRef, memo, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { useSettingContext, useFilter, useTable, getComparator, ICON_NAME } from 'hook'
import {
  getCustomerTicketByKey,
  getCustomerTickets,
  ChangeCustomerTicketPage,
  setSelectedCustomerTicketCard,
  setCustomerTicketFilterBy,
  resetCustomerTicketRecords,
  resetSelectedCustomerTicketCard
} from 'store/slice'
import { ticketsDefaultValues, ticketDefaultValues } from 'section/crm'
import { Divider, Grid, Card, Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GCardOption, GStyledTopBorderDivider, GStyledFlexEndBox, GStyledSpanBox, GStyledFieldChip, GStyledSupportStatusFieldChip } from 'theme/style'
import { MotionLazyContainer, GridViewTitle, GridViewField, AuditBox, CustomerDialog, SearchBox, IconTooltip, TableNoData } from 'component'
import { TicketCard } from 'section/crm'
import { parseArrDesc } from 'util/parse-arr-desc'
import { normalizer } from 'util/format'
import { MARGIN } from 'config'
import { KEY, TITLE, FLEX, TYPOGRAPHY, VIEW_FORM, SUPPORT_TICKET, FLEX_DIR, LABEL, VARIANT, ADDRESS, SIZE } from 'constant'

const TicketsTab = () => {
  const [tableData, setTableData] = useState([])
  const [filterPeriodOption, setFilterPeriodOption] = useState(3)
  const { customerTicket, customerTickets, initial, isLoading, selectedCustomerTicketCard } = useSelector((state) => state.customerTicket)
  const { customer, customerDialog } = useSelector((state) => state.customer)

  const theme = useTheme()
  const { themeMode } = useSettingContext()
  const { order, orderBy } = useTable({
    defaultOrderBy: 'created',
    defaultOrder: 'desc'
  })
  useEffect(() => {
    if (customer?.ref) {
      dispatch(getCustomerTickets(customer?.ref, filterPeriodOption))
    }
    return () => {
      dispatch(resetCustomerTicketRecords())
    }
  }, [dispatch, customer?.ref])

  useEffect(() => {
    if (initial) {
      setTableData(customerTickets?.issues || [])
    }
  }, [customerTickets?.issues, initial])

  useEffect(() => {
    if (customerTickets?.issues?.length > 0) {
      dispatch(setSelectedCustomerTicketCard(customerTickets?.issues[0]?.key))
      dispatch(getCustomerTicketByKey(customer.ref, selectedCustomerTicketCard))
    }
  }, [customerTickets, dispatch])

  const defaultValues = ticketsDefaultValues(tableData && tableData)
  const ticket = ticketDefaultValues(customerTicket)

  const { filterName, handleFilterName, filteredData } = useFilter(
    getComparator(order, orderBy),
    tableData || [],
    initial,
    ChangeCustomerTicketPage,
    setCustomerTicketFilterBy
  )

  const handleCustomerTicketKey = (event, customerTicketKey) => {
    event.preventDefault()
    dispatch(getCustomerTicketByKey(customer.ref, customerTicketKey))
    dispatch(setSelectedCustomerTicketCard(customerTicketKey))
  }

  const isNotFound = !isLoading && !filteredData.length

  return (
    <MotionLazyContainer display={FLEX.FLEX}>
      {/*  TODO: Make responsive */}
      <Grid container spacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
        <Grid item xs={12} sm={3} sx={{ height: '600px', overflow: KEY.AUTO, scrollBehavior: 'smooth' }}>
          <Grid container mb={2}>
            <Grid item lg={12} sm={12} mb={2}>
              {filteredData?.length >= 5 && (
                <Grid item sm={12} pb={2}>
                  <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} mt={0} />
                </Grid>
              )}
              <Grid container p={1}>
                {/* TODO: table filters */}
                {filteredData?.length > 0 && !isLoading ? (
                  defaultValues?.map((t, index) => (
                    <TicketCard
                      key={index}
                      selectedCardId={selectedCustomerTicketCard}
                      value={t}
                      handleCustomerTicketCard={handleCustomerTicketKey}
                      t={t}
                    />
                  ))
                ) : isLoading ? (
                  <Box justifyContent={KEY.CENTER}>
                    <Typography variant={TYPOGRAPHY.OVERLINE1}>Please wait...</Typography>
                  </Box>
                ) : (
                  <Typography variant={TYPOGRAPHY.OVERLINE1} color="text.no">
                    {LABEL.NO_SUPPORT_TICKET}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} lg={9}>
          <Grid container>
            <Grid item sm={12}>
              <Card {...GCardOption}>
                <GStyledTopBorderDivider mode={themeMode} />
                {customerTickets?.issues?.length > 0 && !isLoading ? (
                  <Fragment>
                    <Grid container spacing={2} px={1.5} mb={10}>
                      <Grid item xs={12} sm={12}>
                        <GStyledSpanBox justifyContent={FLEX.SPACE_BETWEEN} spacing={1} py={1}>
                          <Box>
                            <GStyledSpanBox justifyContent={FLEX.FLEX_START}>
                              <Typography variant={TYPOGRAPHY.H3}>{ticket?.key}: &nbsp;</Typography>
                              <Typography variant={TYPOGRAPHY.H4} color="text.secondary">
                                {ticket?.issue}
                              </Typography>
                            </GStyledSpanBox>
                            {ticket?.tags.map((tag, index) => (
                              <GStyledFieldChip
                                key={index}
                                mode={themeMode}
                                label={<Typography variant={TYPOGRAPHY.OVERLINE1}>{tag?.name}</Typography>}
                                size={SIZE.SMALL}
                              />
                            ))}
                          </Box>
                          <GStyledSpanBox justifyContent={FLEX.FLEX_END} spacing={1} py={1}>
                            <Box mt={1} spacing={2}>
                              <IconTooltip
                                title={TITLE.QUICK_SPECS}
                                icon={ICON_NAME.QUICK}
                                color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
                                dimension={18}
                              />
                              <GStyledSupportStatusFieldChip
                                status={normalizer(ticket?.status)}
                                mode={themeMode}
                                label={<Typography variant={TYPOGRAPHY.OVERLINE2}>{ticket?.status}</Typography>}
                                size={SIZE.SMALL}
                              />
                            </Box>
                          </GStyledSpanBox>
                        </GStyledSpanBox>
                      </Grid>
                      <Grid item lg={12}>
                        <GridViewTitle title={TITLE.KEY_DETAILS} />
                        <Divider variant={VARIANT.MIDDLE} style={{ width: '100%', marginBottom: 5 }} />
                      </Grid>
                      <Grid item lg={12} sm={12}>
                        <Grid container spacing={2} p={2} pb={2}>
                          <GridViewField heading={SUPPORT_TICKET.ASSIGNEE} isLoading={isLoading} children={ticket?.assigneeName} />
                          <GridViewField heading={SUPPORT_TICKET.REPORTER} isLoading={isLoading} children={ticket?.reporterName} />
                          <GridViewField
                            heading={VIEW_FORM.DESCRIPTION}
                            isLoading={isLoading}
                            children={parseArrDesc(ticket.descriptionContents)}
                            gridSize={12}
                          />
                        </Grid>
                      </Grid>
                      <Grid item lg={12}>
                        <GridViewTitle title={TITLE.QUICK_SPECS} />
                        <Divider variant={VARIANT.MIDDLE} style={{ width: '100%', marginBottom: 5 }} />
                      </Grid>
                      <Grid item lg={12} sm={12}>
                        <Grid container spacing={2} p={2} pb={2}>
                          <GridViewField heading={SUPPORT_TICKET.PLC_VERSION} isLoading={isLoading} children={ticket?.plcVersion} />
                          <GridViewField heading={SUPPORT_TICKET.HMI_VERSION} isLoading={isLoading} children={ticket?.hmiVersion} />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12} p={2}>
                      <GStyledFlexEndBox>
                        <AuditBox value={ticket} />
                      </GStyledFlexEndBox>
                    </Grid>
                  </Fragment>
                ) : (
                  <Box display={FLEX.CENTER} justifyContent={FLEX.CENTER} alignItems={FLEX.CENTER} style={{ height: '100%' }}>
                    <TableNoData ticketNotFound={isNotFound} />
                  </Box>
                )}
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {customerDialog && <CustomerDialog />}
    </MotionLazyContainer>
  )
}

export default memo(TicketsTab)
