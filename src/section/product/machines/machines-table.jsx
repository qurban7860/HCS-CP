import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ICON_NAME, useIcon } from 'hook'
import { Box, TableBody, TableCell } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { LinkTableCell } from 'component/table-tool'
import { PATH_MACHINE } from 'route/path'
import { fDate } from 'util'
import { KEY } from 'constant'
import { StyledIconListItemText, StyledTableRow } from './style'

const MachineTable = ({ machine, mode, index, isArchived }) => {
 const theme = useTheme()
 const navigate = useNavigate()

 const { Icon, iconSrc: activeSrc } = useIcon(ICON_NAME.ACTIVE)
 const { iconSrc: inactiveSrc } = useIcon(ICON_NAME.INACTIVE)

 const activeColor = mode === KEY.DARK ? theme.palette.howick.burnIn : theme.palette.burnIn.altDark
 const inactiveColor = theme.palette.howick.error

 const handleOnClick = id => {
  navigate(PATH_MACHINE.machines.view(id))
 }

 const openInNewPage = id => {
  const url = PATH_MACHINE.machines.view(id)
  window.open(url, '_blank')
 }

 return (
  <Fragment>
   <TableBody>
    <StyledTableRow index={index} mode={mode} machine={machine}>
     <LinkTableCell
      param={machine?.serialNo}
      onClick={() => {
       handleOnClick(machine?._id)
      }}
      openInNewTab={() => openInNewPage(machine?._id)}
     />
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

MachineTable.propTypes = {
 machine: PropTypes.object,
 mode: PropTypes.string,
 index: PropTypes.number,
 isArchived: PropTypes.bool
}

export default MachineTable
