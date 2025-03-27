import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { getTicket } from 'store/slice'
import { IconFlexi, ICON_NAME, useSettingContext } from 'hook'
import { PATH_SUPPORT } from 'route/path'
import { TableBody, TableCell, Typography } from '@mui/material'
import { GStyledSupportStatusFieldChip } from 'theme/style'
import { LinkWrap } from 'component'
import { GLOBAL } from 'config/global'
import { TYPOGRAPHY, SIZE } from 'constant'
import { normalizer } from 'util'

import { StyledTableRow } from './style'
import { dispatch } from 'store'
import { useAuthContext } from 'auth'

const TicketsTable = ({ columns, onViewRow, ticket, mode, index  }) => {
 const { user }      = useAuthContext()
 const { themeMode } = useSettingContext()
 const navigate      = useNavigate()

 const renderStatus  = _status => {
  return (
   <GStyledSupportStatusFieldChip status={normalizer(_status?.name)} mode={themeMode} label={<Typography variant={TYPOGRAPHY.OVERLINE2}>{_status?.name}</Typography>} size={SIZE.SMALL} />
  )
 }

 const renderPriority = _priority => {
   return <IconFlexi icon={_priority?.icon} color={_priority?.color} />
 }

 const renderIssueType = _issueType => {
   return <IconFlexi icon={_issueType?.icon}  color={_issueType.color} />
 }

const openInNewPage = id => {
   const url = PATH_SUPPORT.tickets.view(id)
   window.open(url, '_blank')
}

const handleNavigateTicket = (id) => {
  dispatch(getTicket(id, user?.customer))
  navigate(PATH_SUPPORT.tickets.view(id))
}

 const renderTicketNo = (_tix, id) => {
  return (
   <LinkWrap
    param={`${GLOBAL.PREFIX}-${_tix}`}
    onClick={() => handleNavigateTicket(id)}
    // disabled for now; enable once Jira auth is refactored to take customer based token #1629
    openInNewTab={() => openInNewPage(id)}
    tooltipTitle={t('open_in_new_tab.label', { value: `${GLOBAL.PREFIX}-${_tix}`})}
    icon={ICON_NAME.OPEN_IN_NEW}
   />
  )
 }



 const { ticketNo,  status, priority, issueType } = ticket

 return (
  <Fragment>
   <TableBody>
    <StyledTableRow index={index} mode={mode} fields={ticket}>
     {columns?.map((column, index) => {
      return (
       <TableCell
        key={index}
        onClick={onViewRow}
        sx={{
         cursor: 'pointer',
         '&:hover': { transform: 'scale(0.97)', transition: 'ease-in-out 0.2s' }
        }}
        align={column?.align ? column.align : 'left'}>
        {column.id === 'issueType.name' ? renderIssueType(issueType) :   column.id === 'ticketNo' ? renderTicketNo(ticketNo, ticket?._id) : column.id === 'status.name' ? renderStatus(status)  :  column.id === 'priority.name' ? renderPriority(priority) : column?.value(ticket)}
       </TableCell>
      )
     })}
    </StyledTableRow>
   </TableBody>
  </Fragment>
 )
}

TicketsTable.propTypes = {
 ticket              : PropTypes.object,
 mode                : PropTypes.string,
 index               : PropTypes.number,
 handleCustomerTicket: PropTypes.func,
 onViewRow           : PropTypes.func,
 columns             : PropTypes.array
}

export default TicketsTable
