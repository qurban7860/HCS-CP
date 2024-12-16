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
 currentFilterStatus,
 showFilterStatus,
 handleFilterStatus,
 currentFilterRole,
 showFilterRole,
 handleFilterRole,
 noPaginationToolbar,
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
    currentFilterStatus={currentFilterStatus}
    showFilterStatus={showFilterStatus}
    handleFilterStatus={handleFilterStatus}
    currentFilterRole={currentFilterRole}
    showFilterRole={showFilterRole}
    handleFilterRole={handleFilterRole}
    noPaginationToolbar={noPaginationToolbar}
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
 currentFilterStatus: PropTypes.any,
 showFilterStatus: PropTypes.bool,
 handleFilterStatus: PropTypes.func,
 currentFilterRole: PropTypes.any,
 showFilterRole: PropTypes.bool,
 handleFilterRole: PropTypes.func,
 noPaginationToolbar: PropTypes.bool
}

export default memo(UsersListPagination)
