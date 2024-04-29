import PropTypes from 'prop-types'
import { TableBody, TableRow, TableCell, Skeleton, Stack } from '@mui/material'

const TableSkeleton = ({ ...other }) => {
  return (
    <TableBody>
      <TableRow {...other}>
        <TableCell colSpan={12}>
          <Stack spacing={3} direction="row" alignItems="center">
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width={160} height={20} />
            <Skeleton variant="text" width={160} height={20} />
            <Skeleton variant="text" width={160} height={20} />
            <Skeleton variant="text" width={160} height={20} />
            <Skeleton variant="rounded" width={40} height={40} sx={{ flexShrink: 0 }} />
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
