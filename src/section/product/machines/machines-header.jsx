import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { TableHead, TableRow, TableSortLabel, Typography, Box } from '@mui/material'
import { StyledHeaderTableCell } from './style'
import { TYPOGRAPHY } from 'constant'

const MachineHeader = ({ dataFiltered, columns, orderBy, order, onSort }) => {
 const { themeMode } = useSettingContext()
 const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)'
 }

 return (
  <TableHead>
   <TableRow>
    {dataFiltered.length > 0 &&
     columns?.map((headCell, index) => {
      if (!headCell?.checked) return null
      return (
       <StyledHeaderTableCell
        key={headCell.id}
        mode={themeMode}
        align={headCell?.align}
        sortDirection={orderBy === headCell.id ? order : false}
        sx={{ width: headCell.width, minWidth: headCell.minWidth }}>
        {onSort ? (
         <TableSortLabel hideSortIcon active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={() => onSort(headCell.id)} sx={{ textTransform: 'capitalize' }}>
          <Typography variant={TYPOGRAPHY.OVERLINE0} p={0}>
           {headCell.label}
           {orderBy === headCell.id ? <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box> : null}
          </Typography>
         </TableSortLabel>
        ) : (
         headCell.label
        )}
       </StyledHeaderTableCell>
      )
     })}
   </TableRow>
  </TableHead>
 )
}

MachineHeader.propTypes = {
 dataFiltered: PropTypes.array,
 columns: PropTypes.array,
 orderBy: PropTypes.string,
 order: PropTypes.string,
 onSort: PropTypes.func
}

export default MachineHeader
