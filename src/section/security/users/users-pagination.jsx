import { memo } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { Box } from '@mui/material'
import { TablePaginationCustom } from 'component'
import { StyledTablePagination } from './style'
import { LABEL } from 'constant'

const UsersListPagination = ({
 rowsPerPageOptions = [5, 10, 15, 20, 30],
 data,
 page,
 rowsPerPage,
 handleChangePage,
 handleChangeRowsPerPage,
 columnFilterButtonData,
 handleColumnButtonClick,
 showFilterStatus,
 handleFilterStatus,
 ...other
}) => {
 return (
  <Box sx={{ position: 'relative' }}>
   <TablePaginationCustom
    count={data?.length ?? 0}
    component={m.div}
    colSpan={2}
    data={data}
    page={page}
    labelRowsPerPage={LABEL.ROWS}
    rowsPerPageOptions={rowsPerPageOptions}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    rowsPerPage={rowsPerPage}
    columnFilterButtonData={columnFilterButtonData}
    columnButtonClickHandler={handleColumnButtonClick}
    showFilterStatus={showFilterStatus}
    handleFilterStatus={handleFilterStatus}
    disabled
    showLastButton
    showFirstButton
    {...other}
   />
  </Box>
 )
}

UsersListPagination.propTypes = {
 data: PropTypes.array,
 page: PropTypes.number,
 rowsPerPage: PropTypes.number,
 rowsPerPageOptions: PropTypes.array,
 handleChangePage: PropTypes.func,
 handleChangeRowsPerPage: PropTypes.func,
 columnFilterButtonData: PropTypes.array,
 handleColumnButtonClick: PropTypes.func,
 showFilterStatus: PropTypes.bool,
 handleFilterStatus: PropTypes.func
}

export default memo(UsersListPagination)
