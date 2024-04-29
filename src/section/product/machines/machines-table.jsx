import { Fragment, useRef, useEffect } from 'react'
import { Box, TableBody, TableCell, Table, TableHead, TableRow, Typography, ListItemText, Chip } from '@mui/material'
import { fDate } from 'util'
import { KEY } from 'constant'

const MachineTable = ({ machine, mode }) => {
  return (
    <Fragment>
      <TableBody>
        <TableRow
          sx={{
            '&:nth-of-type(odd)': {
              backgroundColor: mode === KEY.DARK ? 'grey.800' : 'grey.300'
            },
            '&:nth-of-type(even)': {
              backgroundColor: mode === KEY.DARK ? 'grey.900' : 'grey.200'
            },
            '&:hover': {
              backgroundColor: mode === KEY.DARK ? 'grey.700' : 'common.white'
            },
            cursor: 'pointer'
          }}>
          <TableCell
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>
            {machine?.serialNo}
          </TableCell>
          <TableCell>{machine?.name}</TableCell>
          <TableCell>
            <Box>{machine?.machineModel?.name}</Box>
          </TableCell>
          <TableCell>{fDate(machine?.installationDate)}</TableCell>
          <TableCell>{fDate(machine?.shippingDate)}</TableCell>
          <TableCell>{machine?.status?.name}</TableCell>
          <TableCell>
            <ListItemText>
              <Chip
                label={<Typography variant="h6">{machine?.isActive ? 'active' : 'not active'}</Typography>}
                size="small"
                variant="outlined"
                sx={{
                  backgroundColor: !machine?.isActive ? 'error.main' : 'burnIn.main',
                  color: `common.${!machine?.isActive ? 'white' : 'black'}`,
                  fontWeight: 'bold'
                }}
              />
            </ListItemText>
          </TableCell>
        </TableRow>
      </TableBody>
    </Fragment>
  )
}

export default MachineTable
