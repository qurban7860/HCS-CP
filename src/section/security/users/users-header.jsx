import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { TableHead, TableRow, TableSortLabel } from '@mui/material'
import { StyledHeaderTableCell } from './style'

const UserHeader = ({ dataFiltered, columns, orderBy, order, onSort }) => {
 const { themeMode } = useSettingContext()

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
          {headCell.label}
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

UserHeader.propTypes = {
 dataFiltered: PropTypes.array,
 columns: PropTypes.array,
 orderBy: PropTypes.string,
 order: PropTypes.string,
 onSort: PropTypes.func
}

export default UserHeader
