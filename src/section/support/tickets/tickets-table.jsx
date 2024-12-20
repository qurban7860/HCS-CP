import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ICON_NAME } from 'hook'
import { useSettingContext } from 'hook'
import { TableBody, TableCell, Typography } from '@mui/material'
import { GStyledSupportStatusFieldChip } from 'theme/style'
import { LinkWrap } from 'component'
import { GLOBAL } from 'config/global'
import { LABEL, TYPOGRAPHY, SIZE } from 'constant'
import { normalizer } from 'util'
import { StyledTableRow } from './style'

const TicketsTable = ({ columns, onViewRow, ticket, mode, index, handleCustomerTicket }) => {
 const { themeMode } = useSettingContext()
 const lowercaseRow = {}

 const renderStatus = fields => {
  return (
   <GStyledSupportStatusFieldChip status={normalizer(fields?.status?.name)} mode={themeMode} label={<Typography variant={TYPOGRAPHY.OVERLINE2}>{fields?.status?.name}</Typography>} size={SIZE.SMALL} />
  )
 }

 const renderKey = (key, fields) => {
  return (
   <LinkWrap
    param={key}
    onClick={e => {
     handleCustomerTicket(e, fields?.customfield_10069, key)
    }}
    // disabled for now; enable once Jira auth is refactored to take customer based token
    // openInNewTab={() => openInNewPage(key)}
    tooltipTitle={LABEL.VIEW_IN_JIRA}
    icon={ICON_NAME.JIRA}
   />
  )
 }

 Object.entries(ticket).forEach(([key, value]) => {
  if (typeof key === 'string') lowercaseRow[key.toLocaleLowerCase()] = value
 })

 const openInNewPage = jiraKey => {
  const url = GLOBAL.JIRA_URL + jiraKey
  window.open(url, '_blank')
 }

 const { fields, key, id, self } = ticket

 return (
  <Fragment>
   <TableBody>
    <StyledTableRow index={index} mode={mode} fields={fields} key={key}>
     {columns?.map((column, index) => {
      const cellValue = lowercaseRow?.[column.id.toLocaleLowerCase()] || ''
      return (
       <TableCell
        key={index}
        onClick={onViewRow}
        sx={{
         cursor: 'pointer',
         '&:hover': { transform: 'scale(0.97)', transition: 'ease-in-out 0.2s' }
        }}
        align={column?.numerical ? 'right' : 'left'}>
        {column.id === 'key' ? renderKey(key, fields) : column.id === 'fields.status.statusCategory.name' ? renderStatus(fields) : column?.value ? column?.value(fields) : cellValue}
       </TableCell>
      )
     })}
    </StyledTableRow>
   </TableBody>
  </Fragment>
 )
}

TicketsTable.propTypes = {
 ticket: PropTypes.object,
 mode: PropTypes.string,
 index: PropTypes.number,
 handleCustomerTicket: PropTypes.func,
 onViewRow: PropTypes.func,
 columns: PropTypes.array
}

export default TicketsTable
