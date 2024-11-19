import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { ICON_NAME } from 'hook'
import { Box, TableBody, TableCell, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSettingContext } from 'hook'
import { GStyledTableChip } from 'theme/style'
import { LinkTableCell } from 'component/table-tool'
import { PATH_MACHINE } from 'route/path'
import { LABEL, TYPOGRAPHY } from 'constant'
import { GLOBAL } from 'config/global'
import { normalizer, fDate } from 'util'
import { StyledTableRow } from './style'

const TicketsTable = ({ ticket, mode, index }) => {
 const theme = useTheme()
 const navigate = useNavigate()
 const { themeMode } = useSettingContext()

 const renderStatus = status => {
  const statusColorSwitch = status => (normalizer(status) === 'done' ? theme.palette.howick.burnIn : normalizer(status) === 'in progress' ? theme.palette.howick.orange : theme.palette.grey[500])

  return (
   <GStyledTableChip
    mode={themeMode}
    sx={{
     backgroundColor: statusColorSwitch(status)
    }}
    label={
     <Typography variant={TYPOGRAPHY.BODY2} color={theme.palette.common.black}>
      {status}
     </Typography>
    }
   />
  )
 }

 // implement when page view for tickets is ready
 const handleOnClick = id => {
  navigate(PATH_MACHINE.machines.view(id))
 }

 const openInNewPage = jiraKey => {
  // dispatch(setMachineTab('info'))
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
      onClick={() => {
       openInNewPage(key)
      }}
      openInNewTab={() => openInNewPage(key)}
      tooltipTitle={LABEL.VIEW_IN_JIRA}
      icon={ICON_NAME.JIRA}
     />
     {/* issue */}
     <TableCell>{fields?.summary}</TableCell>
     <TableCell>
      {/* organization */}
      <Box>{fields?.customfield_10002[0]?.name}</Box>
     </TableCell>
     {/* machine */}
     <TableCell>{fields?.customfield_10069}</TableCell>
     <TableCell>{fields?.customfield_10070?.value}</TableCell>
     <TableCell>{renderStatus(fields?.status?.statusCategory?.name)}</TableCell>
    </StyledTableRow>
   </TableBody>
  </Fragment>
  /**
      * <TableCell>
          <StyledIconListItemText inActive={ticket?.fields?.status?.statusCategory?.name}>
            <m.div>
              {machine?.isActive ? <Icon icon={ICON_NAME.ACTIVE} color={activeColor} /> : <Icon icon={ICON_NAME.INACTIVE} color={inactiveColor} />}
            </m.div>
          </StyledIconListItemText>
        </TableCell>
     *
     */
 )
}

TicketsTable.propTypes = {
 ticket: PropTypes.object,
 mode: PropTypes.string,
 index: PropTypes.number
}

export default TicketsTable
