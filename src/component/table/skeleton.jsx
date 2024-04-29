import PropTypes from 'prop-types'
import { TableBody, TableRow, TableCell, Skeleton, Stack } from '@mui/material'

const TableSkeleton = ({ ...other }) => {
  return (
    <TableBody>
      <TableRow {...other}>
        <TableCell colSpan={12}>
          <Stack spacing={3} direction="row" alignItems="center">
            <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: 1, flexShrink: 0 }} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width={160} height={20} />
            <Skeleton variant="text" width={160} height={20} />
            <Skeleton variant="text" width={160} height={20} />
            <Skeleton variant="text" width={160} height={20} />
          </Stack>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

TableSkeleton.propTypes = {
  other: PropTypes.any
}

export default TableSkeleton
