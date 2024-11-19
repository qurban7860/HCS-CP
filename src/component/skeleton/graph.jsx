import PropTypes from 'prop-types'
import { Stack, Skeleton } from '@mui/material'

export default function SkeletonGraphLoader({ width = '100%', height = 300 }) {
 return (
  <Stack spacing={1} alignItems='center' sx={{ py: 2, px: 1 }}>
   <Skeleton variant='rectangular' width={width} height={height} />
   <Stack direction='row' spacing={1} sx={{ width: '100%', mt: 1 }}>
    <Skeleton variant='text' width='30%' />
    <Skeleton variant='text' width='20%' />
    <Skeleton variant='text' width='25%' />
    <Skeleton variant='text' width='15%' />
   </Stack>
  </Stack>
 )
}

SkeletonGraphLoader.propTypes = {
 width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
 height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
