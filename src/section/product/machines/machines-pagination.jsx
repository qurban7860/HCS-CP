import { memo } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { Box, TablePagination } from '@mui/material'
import { StyledTablePagination } from './style'
import { LABEL } from 'constant'

const MachineListPagination = ({ rowsPerPageOptions = [5, 10, 15, 20, 30, 50], data, page, mode, rowsPerPage, handleChangePage, handleChangeRowsPerPage, ...other }) => {
 return (
  <Box
   sx={{
    position: 'relative'
   }}>
   <StyledTablePagination
    count={data?.length ?? 0}
    component={m.div}
    colSpan={2}
    data={data}
    mode={mode}
    page={page}
    labelRowsPerPage={LABEL.ROWS}
    rowsPerPageOptions={rowsPerPageOptions}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    rowsPerPage={rowsPerPage}
    showLastButton
    showFirstButton
    {...other}
   />
  </Box>
 )
}

MachineListPagination.propTypes = {
 data: PropTypes.array,
 mode: PropTypes.string,
 page: PropTypes.number,
 rowsPerPage: PropTypes.number,
 rowsPerPageOptions: PropTypes.array,
 handleChangePage: PropTypes.func,
 handleChangeRowsPerPage: PropTypes.func
}

export default memo(MachineListPagination)
