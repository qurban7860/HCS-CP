import { memo } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { Box } from '@mui/material'
import { TablePaginationCustom } from 'component'
import { KEY, LABEL } from 'constant'

const TicketsListPagination = ({
 rowsPerPageOptions = [5, 10, 20, 50],
 count,
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
  <Box sx={{ position: KEY.RELATIVE }}>
   <TablePaginationCustom
    count={count ?? 0}
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
    disabled
    showLastButton
    showFirstButton
    {...other}
   />
  </Box>
 )
}

TicketsListPagination.propTypes = {
 count                  : PropTypes.number,
 data                   : PropTypes.array,
 mode                   : PropTypes.string,
 page                   : PropTypes.number,
 rowsPerPage            : PropTypes.number,
 handleChangePage       : PropTypes.func,
 handleChangeRowsPerPage: PropTypes.func,
 rowsPerPageOptions     : PropTypes.array,
 columnFilterButtonData : PropTypes.array,
 handleColumnButtonClick: PropTypes.func
}

export default memo(TicketsListPagination)
