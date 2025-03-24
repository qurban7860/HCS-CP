import { memo } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { Box } from '@mui/material'
import { StyledTablePagination } from './style'
import { KEY, LABEL } from 'constant'

const CustomerListPagination = ({ rowsPerPageOptions = [5, 10, 15, 20], data, page, mode, rowsPerPage, handleChangePage, handleChangeRowsPerPage, ...other }) => {
 return (
  <Box
   sx={{
    position: KEY.RELATIVE
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

CustomerListPagination.propTypes = {
 rowsPerPageOptions: PropTypes.array,
 data: PropTypes.array,
 mode: PropTypes.string,
 page: PropTypes.number,
 rowsPerPage: PropTypes.number,
 handleChangePage: PropTypes.func,
 handleChangeRowsPerPage: PropTypes.func
}

export default memo(CustomerListPagination)
