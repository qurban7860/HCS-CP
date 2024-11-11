import PropTypes from 'prop-types'
import { TableHead, TableRow } from '@mui/material'
import { StyledHeaderTableCell } from './style'
import { HEADER } from './header'

const TicketsTableHeader = ({ mode }) => {
 return (
  <TableHead>
   <TableRow>
    {HEADER.map(item => (
     <StyledHeaderTableCell key={item.key} item={item} mode={mode}>
      {item.label}
     </StyledHeaderTableCell>
    ))}
   </TableRow>
  </TableHead>
 )
}

TicketsTableHeader.propTypes = {
 mode: PropTypes.string
}

export default TicketsTableHeader
