import { Fragment } from 'react'
import { t } from 'i18next'
import { UserInviteForm } from 'section/auth/user-invite'
import { TableTitleBox } from 'component'

export default function UserInvite() {
 return (
  <Fragment>
   <TableTitleBox title={t('user_invite.label')} />
   <UserInviteForm />
  </Fragment>
 )
}
