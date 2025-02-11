import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { IconFlexi, ICON_NAME } from 'hook'
import { useSettingContext } from 'hook'
import { TableBody, TableCell, Typography } from '@mui/material'
import { GStyledSupportStatusFieldChip } from 'theme/style'
import { LinkWrap } from 'component'
import { GLOBAL } from 'config/global'
import { LABEL, TYPOGRAPHY, SIZE } from 'constant'
import { normalizer } from 'util'
import { StyledTableRow } from './style'

const TicketsTable = ({ columns, onViewRow, ticket, mode, index  }) => {
 const { themeMode } = useSettingContext()
 const renderStatus = _status => {
  return (
   <GStyledSupportStatusFieldChip status={normalizer(_status?.name)} mode={themeMode} label={<Typography variant={TYPOGRAPHY.OVERLINE2}>{_status?.name}</Typography>} size={SIZE.SMALL} />
  )
 }

 const renderPriority = _priority => {
 return ( <IconFlexi icon={_priority?.icon} color={_priority?.color} />)
 }
 const renderKey = (key) => {
  return (
   <LinkWrap
    param={key}
    onClick={e => {}}
    // disabled for now; enable once Jira auth is refactored to take customer based token #1629
    // openInNewTab={() => openInNewPage(key)}
    tooltipTitle={LABEL.VIEW_IN_JIRA}
    icon={ICON_NAME.JIRA}
   />
  )
 }

 const openInNewPage = jiraKey => {
  const url = GLOBAL.JIRA_URL + jiraKey
  window.open(url, '_blank')
 }

 const { ticketNo,  status, priority } = ticket

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
        {column.id === 'ticketNo' ? renderKey(ticketNo) : column.id === 'status.name' ? renderStatus(status)  :  column.id === 'priority.name' ? renderPriority(priority) : column?.value(ticket)}
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
