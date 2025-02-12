import { Fragment } from 'react'
import { t } from 'i18next'
import { TicketCreateForm } from 'section/support/ticket'
import { TableStickyTitleBox } from 'component'

export default function TicketCreateLayout() {
 return (
  <Fragment>
   <TableStickyTitleBox title={t('create_ticket.label')} />
   <TicketCreateForm />
  </Fragment>
 )
}
