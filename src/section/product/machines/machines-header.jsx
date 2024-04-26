import { TableHead, TableCell, TableRow } from '@mui/material'
import { HEADER } from './constant'
import { KEY } from 'constant'

const MachineHeader = ({ mode }) => {
  return (
    <TableHead>
      <TableRow>
        {HEADER.map((item) => (
          <TableCell
            key={item.key}
            sx={{
              backgroundColor: 'gray.100',
              color: mode === KEY.DARK ? 'common.white' : 'common.black',
              margin: 0,
              fontWeight: 'bold',
              fontSize: '1.1rem',
              padding: '0.5rem 1rem'
            }}>
            {item.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default MachineHeader
