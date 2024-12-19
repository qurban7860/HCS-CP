import { memo } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { Box } from '@mui/material'
import { TablePaginationCustom } from 'component'
import { KEY, LABEL } from 'constant'

const TicketsListPagination = ({
 // check if how many max rows per page can be displayed from the data, and round it up to the nearest 5
 rowsPerPageOptions = [5, 10, 15, 20, 30],
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
    position: KEY.RELATIVE
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
    disabled
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
 handleChangeRowsPerPage: PropTypes.func,
 rowsPerPageOptions: PropTypes.array,
 columnFilterButtonData: PropTypes.array,
 handleColumnButtonClick: PropTypes.func
}

export default memo(TicketsListPagination)
