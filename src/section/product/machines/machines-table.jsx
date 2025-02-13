import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { dispatch } from 'store'
import { ICON_NAME, Icon, useSettingContext } from 'hook'
import { PATH_MACHINE } from 'route/path'
import { getMachine } from 'store/slice'
import { TableBody, TableCell } from '@mui/material'
import { LinkWrap } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledSpanBox } from 'theme/style'
import { KEY } from 'constant'
import { StyledIconListItemText, StyledTableRow } from './style'

const MachineTable = ({ columns, onViewRow, machine, index, selected }) => {
 const { themeMode } = useSettingContext()
 const theme         = useTheme()
 const navigate      = useNavigate()
 const lowercaseRow  = {}

 const activeColor = themeMode === KEY.DARK ? theme.palette.howick.burnIn : theme.palette.burnIn.altDark
 const inactiveColor = theme.palette.howick.error

 const handleOnClick = (event, id) => {
  event.preventDefault()
  navigate(PATH_MACHINE.machines.view(id))
 }

 Object.entries(machine).forEach(([key, value]) => {
  if (typeof key === 'string') lowercaseRow[key.toLocaleLowerCase()] = value
 })

 const openInNewPage = id => {
  const url = PATH_MACHINE.machines.view(id)
  dispatch(getMachine(id, machine?.customer?._id))
  window.open(url, KEY.BLANK)
 }

 return (
  <Fragment>
   <TableBody>
    <StyledTableRow index={index} mode={themeMode} machine={machine} selected={selected}>
     {columns?.map((column, index) => {
      const cellValue = lowercaseRow?.[column.id.toLocaleLowerCase()] || ''
      return (
       <TableCell key={index} onClick={onViewRow} sx={{ cursor: 'pointer', '&:hover': { transform: 'scale(0.97)', transition: 'ease-in-out 0.2s' } }} align={column?.numerical ? 'right' : 'left'}>
        {column.checked &&
         (column.id === 'serialNo' ? (
          <GStyledSpanBox>
           <LinkWrap param={machine?.serialNo} onClick={e => handleOnClick(e, machine?._id)} openInNewTab={() => openInNewPage(machine?._id)} />
          </GStyledSpanBox>
         ) : column.id === 'isActive' ? (
          <StyledIconListItemText inActive={machine?.isActive}>
           <m.div>{machine?.isActive ? <Icon icon={ICON_NAME.ACTIVE} color={activeColor} /> : <Icon icon={ICON_NAME.INACTIVE} color={inactiveColor} />}</m.div>
          </StyledIconListItemText>
         ) : column?.value ? (
          column?.value(machine)
         ) : (
          cellValue
         ))}
       </TableCell>
      )
     })}
    </StyledTableRow>
   </TableBody>
  </Fragment>
 )
}

MachineTable.propTypes = {
 machine: PropTypes.object,
 index: PropTypes.number,
 isArchived: PropTypes.bool,
 selected: PropTypes.bool,
 onViewRow: PropTypes.func,
 handleOnClick: PropTypes.func,
 columns: PropTypes.array
}

export default MachineTable
