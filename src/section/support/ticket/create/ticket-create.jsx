import { Fragment } from 'react'
import { t } from 'i18next'
import { UserInviteForm } from 'section/auth/user-invite'
import { TableTitleBox } from 'component'

export default function TicketCreateLayout() {
 return (
  <Fragment>
   <TableTitleBox title={t('create_ticket.label')} />
   <UserInviteForm />
  </Fragment>
 )
}
