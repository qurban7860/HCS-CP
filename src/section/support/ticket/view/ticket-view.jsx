import { Fragment, useEffect } from 'react'
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import { useAuthContext } from 'auth'
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
 const { user }   = useAuthContext()
 const { ticket } = useSelector(state => state.ticket)
 const { id }     = useParams()

 useEffect(() => {
  const debouncedFetch = _.debounce(() => {
   dispatch(getTicket(id, user?.customer))
  }, 300)
  debouncedFetch()
  return () => debouncedFetch.cancel()
 }, [dispatch])

 return (
  <Fragment>
    <TableStickyTitleBox title={`${GLOBAL.PREFIX}-${ticket?.ticketNo}`} subTitle={ticket?.issueType?.name} icon={<IconFlexi icon={ticket?.issueType?.icon} color={ticket?.issueType?.color}/>} />
    <TicketViewForm />
  </Fragment>
 )
}
