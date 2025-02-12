import { memo } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { Box } from '@mui/material'
import { TablePaginationCustom } from 'component'
import { KEY, LABEL } from 'constant'

const MachineListPagination = ({
 rowsPerPageOptions = [5, 10, 15, 20, 30, 50],
 data,
 page,
 mode,
 rowsPerPage,
 handleChangePage,
 handleChangeRowsPerPage,
 columnFilterButtonData,
 handleColumnButtonClick,
 showFilterStatus,
 currentFilterStatus,
 handleFilterStatus,
 showFilterCategory,
 currentFilterCategory,
 handleFilterCategory,
 categoryTypes,
 ...other
}) => {
 return (
  <Box sx={{ position:  KEY.RELATIVE}}>
   <TablePaginationCustom
    count={data?.length ?? 0}
    component={m.div}
    colSpan={2}
    data={data}
    page={page}
    mode={mode}
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
    showFilterCategory={showFilterCategory}
    currentFilterCategory={currentFilterCategory}
    handleFilterCategory={handleFilterCategory}
    categoryTypes={categoryTypes}
    showLastButton
    showFirstButton
    {...other}
   />
  </Box>
 )
}

MachineListPagination.propTypes = {
 data                   : PropTypes.array,
 mode                   : PropTypes.string,
 page                   : PropTypes.number,
 rowsPerPage            : PropTypes.number,
 rowsPerPageOptions     : PropTypes.arrayOf(PropTypes.number),
 handleChangePage       : PropTypes.func,
 handleChangeRowsPerPage: PropTypes.func,
 columnFilterButtonData : PropTypes.array,
 handleColumnButtonClick: PropTypes.func,
 showFilterStatus       : PropTypes.bool,
 currentFilterStatus    : PropTypes.any,
 handleFilterStatus     : PropTypes.func,
 showFilterCategory     : PropTypes.bool,
 currentFilterCategory  : PropTypes.any,
 handleFilterCategory   : PropTypes.func,
 categoryTypes          : PropTypes.array
}

export default memo(MachineListPagination)
