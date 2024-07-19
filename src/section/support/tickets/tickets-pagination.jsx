import { memo } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { Box, TablePagination } from '@mui/material'
import { StyledTablePagination } from './style'
import { KEY, LABEL } from 'constant'

const TicketsListPagination = ({
  rowsPerPageOptions = [10, 20, 40, 50, 100],
  data,
  page,
  mode,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  ...other
}) => {
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

TicketsListPagination.propTypes = {
  data: PropTypes.array,
  mode: PropTypes.string,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func
}

export default memo(TicketsListPagination)
