import PropTypes from 'prop-types'
import { TableBody, TableRow, TableCell, Stack } from '@mui/material'
import { GStyledTableSkeleton } from 'theme/style'
import { useSettingContext } from 'component/setting'

const SkeletonTable = ({ ...other }) => {
  const { themeMode } = useSettingContext()
  return (
    <TableBody>
      <TableRow {...other}>
        <TableCell colSpan={12}>
          <Stack spacing={3} direction="row" alignItems="center">
            <GStyledTableSkeleton themeMode={themeMode} variant="text" width={100} height={20} sx={{}} />
            <GStyledTableSkeleton themeMode={themeMode} variant="text" width="40%" height={20} />
            <GStyledTableSkeleton themeMode={themeMode} variant="text" width={160} height={20} />
            <GStyledTableSkeleton themeMode={themeMode} variant="text" width={160} height={20} />
            <GStyledTableSkeleton themeMode={themeMode} variant="text" width={160} height={20} />
            <GStyledTableSkeleton themeMode={themeMode} variant="text" width={160} height={20} />
            <GStyledTableSkeleton themeMode={themeMode} variant="rounded" width={40} height={40} sx={{ flexShrink: 0 }} />
          </Stack>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

SkeletonTable.propTypes = {
  other: PropTypes.any
}

export default SkeletonTable
