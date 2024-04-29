import { memo } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { Box, TablePagination } from '@mui/material'
import { KEY } from 'constant'

const MachineListPagination = ({
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
        position: 'relative'
      }}>
      <TablePagination
        count={data?.length ?? 0}
        labelRowsPerPage="Rows:"
        colSpan={2}
        rowsPerPageOptions={rowsPerPageOptions}
        component={m.div}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
        showLastButton
        showFirstButton
        {...other}
        sx={{
          '.MuiTablePagination-toolbar': {
            height: '5px',
            width: '!important 200px',
            '& .MuiTablePagination-actions': {
              '& .MuiIconButton-root': {
                '&:first-of-type': {
                  color: page <= 0 ? (mode === KEY.LIGHT ? 'grey.300' : 'grey.700') : mode === KEY.LIGHT ? 'grey.800' : 'howick.orange'
                },
                '&:nth-of-type(2)': {
                  color: page <= 0 ? (mode === KEY.LIGHT ? 'grey.300' : 'grey.700') : mode === KEY.LIGHT ? 'grey.800' : 'howick.orange'
                },
                '&:nth-of-type(3)': {
                  color:
                    page === Math.ceil((data?.length ?? 0) / rowsPerPage) - 1
                      ? mode === KEY.LIGHT
                        ? 'grey.300'
                        : 'grey.700'
                      : mode === KEY.LIGHT
                      ? 'grey.800'
                      : 'howick.orange'
                },
                '&:last-of-type': {
                  color:
                    page === Math.ceil((data?.length ?? 0) / rowsPerPage) - 1
                      ? mode === KEY.LIGHT
                        ? 'grey.300'
                        : 'grey.700'
                      : mode === KEY.LIGHT
                      ? 'grey.800'
                      : 'howick.orange'
                }
              }
            }
          }
        }}
      />
    </Box>
  )
}

MachineListPagination.propTypes = {
  data: PropTypes.array,
  mode: PropTypes.string,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func
}

export default memo(MachineListPagination)
