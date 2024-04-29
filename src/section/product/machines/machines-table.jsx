import { Fragment } from 'react'
import { m } from 'framer-motion'
import { ICON_NAME, useIcon } from 'hook'
import { Box, TableBody, TableCell } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { fDate } from 'util'
import { KEY } from 'constant'
import { StyledIconListItemText, StyledPopTableCell, StyledTableRow } from './style'

const MachineTable = ({ machine, mode, index }) => {
  const theme = useTheme()
  const { Icon, iconSrc: activeSrc } = useIcon(ICON_NAME.ACTIVE)
  const { iconSrc: inactiveSrc } = useIcon(ICON_NAME.INACTIVE)

  const activeColor = mode === KEY.DARK ? theme.palette.howick.burnIn : theme.palette.burnIn.altDark
  const inactiveColor = theme.palette.howick.error

  return (
    <Fragment>
      <TableBody>
        <StyledTableRow index={index} mode={mode}>
          <StyledPopTableCell>{machine?.serialNo}</StyledPopTableCell>
          <TableCell>{machine?.name}</TableCell>
          <TableCell>
            <Box>{machine?.machineModel?.name}</Box>
          </TableCell>
          <TableCell>{fDate(machine?.installationDate)}</TableCell>
          <TableCell>{fDate(machine?.shippingDate)}</TableCell>
          <TableCell>{machine?.status?.name}</TableCell>
          <TableCell>
            <StyledIconListItemText inActive={machine?.isActive}>
              <m.div>{machine?.isActive ? <Icon icon={activeSrc} color={activeColor} /> : <Icon icon={inactiveSrc} color={inactiveColor} />}</m.div>
            </StyledIconListItemText>
          </TableCell>
        </StyledTableRow>
      </TableBody>
    </Fragment>
  )
}

export default MachineTable
