import { memo } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { Box } from '@mui/material'
import { TablePaginationCustom } from 'component'
import { StyledTablePagination } from './style'
import { applySort } from 'util'
import { LABEL } from 'constant'

const LogsPagination = ({
 rowsPerPageOptions = [10, 20, 40, 80, 100],
 data,
 page,
 mode,
 rowsPerPage,
 handleChangePage,
 handleChangeRowsPerPage,
 columnFilterButtonData,
 handleColumnButtonClick,
 ...other
}) => {
 return (
  <Box
   sx={{
    position: 'relative'
   }}>
   <TablePaginationCustom
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
    columnFilterButtonData={columnFilterButtonData}
    columnButtonClickHandler={handleColumnButtonClick}
    showLastButton
    showFirstButton
    {...other}
   />
  </Box>
 )
}

LogsPagination.propTypes = {
 rowsPerPageOptions: PropTypes.array,
 data: PropTypes.array,
 mode: PropTypes.string,
 page: PropTypes.number,
 rowsPerPage: PropTypes.number,
 handleChangePage: PropTypes.func,
 handleChangeRowsPerPage: PropTypes.func,
 columnFilterButtonData: PropTypes.array,
 handleColumnButtonClick: PropTypes.func
}

export default memo(LogsPagination)
