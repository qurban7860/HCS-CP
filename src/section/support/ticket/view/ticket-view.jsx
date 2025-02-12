import { Fragment, useEffect } from 'react'
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { getTicket } from 'store/slice'
import { IconFlexi } from 'hook'
import { TicketViewForm } from 'section/support/ticket'
import { Box, Typography } from '@mui/material'
import { TableStickyTitleBox, BackButton } from 'component'
import { GStyledSpanBox } from 'theme/style'
import { GLOBAL } from 'config/global'
import { FLEX, TYPOGRAPHY } from 'constant'

export default function TicketViewLayout() {
 const { ticket } = useSelector(state => state.ticket)
 const { id }     = useParams()

 useEffect(() => {
  const debouncedFetch = _.debounce(() => {
   dispatch(getTicket(id))
  }, 300)
  debouncedFetch()
  return () => debouncedFetch.cancel()
 }, [dispatch])

 return (
  <Fragment>
   <Box display={FLEX.FLEX} sx={{ alignItems: 'center' }} gap={2}>
   <IconFlexi icon={ticket?.issueType?.icon} color={ticket?.issueType?.color}/>
    <GStyledSpanBox>
     <TableStickyTitleBox title={`${GLOBAL.PREFIX}-${ticket?.ticketNo}`} />
    </GStyledSpanBox>
   </Box>
   <Typography variant={TYPOGRAPHY.BODY1} color={'grey.500'}>{ticket?.issueType?.name}</Typography>
   <TicketViewForm />
  </Fragment>
 )
}
