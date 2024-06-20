import { Fragment } from 'react'
import { m } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ICON_NAME, Icon } from 'hook'
import { Box, TableBody, TableCell } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { LinkTableCell } from 'component/table-tool'
import { PATH_MACHINE } from 'route/path'
import { fDate } from 'util'
import { KEY, LABEL } from 'constant'
import { StyledIconListItemText, StyledTableRow } from './style'

const TicketsTable = ({ ticket, mode, index }) => {
  const theme = useTheme()
  const navigate = useNavigate()

  const activeColor = mode === KEY.DARK ? theme.palette.howick.burnIn : theme.palette.burnIn.altDark
  const inactiveColor = theme.palette.howick.error

  const handleOnClick = (id) => {
    navigate(PATH_MACHINE.machines.view(id))
  }

  const openInNewPage = (id) => {
    // dispatch(setMachineTab('info'))
    const url = PATH_MACHINE.machines.view(id)
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
              handleOnClick(self)
            }}
            openInNewTab={() => openInNewPage(self)}
            tooltipTitle={LABEL.VIEW_IN_JIRA}
            icon={ICON_NAME.JIRA}
          />
          <TableCell>{fields?.summary}</TableCell>
          <TableCell>
            <Box>{fields?.customfield_10002[0]?.name}</Box>
          </TableCell>
          <TableCell>{fields?.customfield_10069}</TableCell>
          <TableCell>{fields?.customfield_10070?.value}</TableCell>
          <TableCell>{fields?.status?.statusCategory?.name}</TableCell>
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

export default TicketsTable
