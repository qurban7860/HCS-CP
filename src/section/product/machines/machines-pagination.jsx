import { useState } from 'react'
import { m } from 'framer-motion'
import { Box, TablePagination } from '@mui/material'

const MachineListPagination = ({ rowsPerPageOptions = [10, 20, 40, 50, 100], ...other }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box
      sx={{
        position: 'relative'
      }}>
      <TablePagination
        labelRowsPerPage="Rows:"
        colSpan={2}
        rowsPerPageOptions={rowsPerPageOptions}
        component={m.div}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        showLastButton
        showFirstButton
        {...other}
        sx={{
          '.MuiTablePagination-toolbar': {
            height: '5px',
            width: '!important 200px'
          }
        }}
      />
    </Box>
  )
}

export default MachineListPagination
