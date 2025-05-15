import { Fragment } from 'react'
import { useSelector } from 'store'
import { IconFlexi } from 'hook'
import { TicketViewForm } from 'section/support/ticket'
import { TableStickyTitleBox } from 'component'
import { GLOBAL } from 'config/global'

export default function TicketViewLayout() {
  const { ticket } = useSelector(state => state.ticket)

  return (
    <Fragment>
      <TableStickyTitleBox title={`${GLOBAL.PREFIX}-${ticket?.ticketNo || ""}`} subTitle={ticket?.issueType?.name} icon={<IconFlexi icon={ticket?.issueType?.icon} color={ticket?.issueType?.color} />} />
      <TicketViewForm />
    </Fragment>
  )
}
