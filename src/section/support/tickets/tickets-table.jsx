import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ICON_NAME } from 'hook'
import { TableBody, TableCell, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSettingContext } from 'hook'
import { GStyledTableChip, GStyledSupportStatusFieldChip } from 'theme/style'
import { LinkTableCell } from 'component/table-tool'
import { GLOBAL } from 'config/global'
import { LABEL, TYPOGRAPHY, SIZE } from 'constant'
import { normalizer, fDate } from 'util'
import { StyledTableRow } from './style'

const TicketsTable = ({ ticket, mode, index, handleCustomerTicket }) => {
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 const renderStatus = fields => {
  return (
   <GStyledSupportStatusFieldChip status={normalizer(fields?.status?.name)} mode={themeMode} label={<Typography variant={TYPOGRAPHY.OVERLINE2}>{fields?.status?.name}</Typography>} size={SIZE.SMALL} />
  )
 }

 const openInNewPage = jiraKey => {
  const url = GLOBAL.JIRA_URL + jiraKey
  window.open(url, '_blank')
 }

 const { fields, key, id, self } = ticket

 return (
  <Fragment>
   <TableBody>
    <StyledTableRow index={index} mode={mode} fields={fields} key={key}>
     <TableCell>{fDate(fields?.created)}</TableCell>
     <LinkTableCell
      param={key}
      onClick={e => {
       handleCustomerTicket(e, fields?.customfield_10069, key)
      }}
      openInNewTab={() => openInNewPage(key)}
      tooltipTitle={LABEL.VIEW_IN_JIRA}
      icon={ICON_NAME.JIRA}
     />
     {/* issue */}
     <TableCell>{fields?.summary}</TableCell>
     {/* machine */}
     <TableCell>{fields?.customfield_10069}</TableCell>
     <TableCell>{fields?.customfield_10070?.value}</TableCell>
     <TableCell>{renderStatus(fields)}</TableCell>
    </StyledTableRow>
   </TableBody>
  </Fragment>
 )
}

TicketsTable.propTypes = {
 ticket: PropTypes.object,
 mode: PropTypes.string,
 index: PropTypes.number,
 handleCustomerTicket: PropTypes.func
}

export default TicketsTable
