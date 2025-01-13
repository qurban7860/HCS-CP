import PropTypes from 'prop-types'
import { Stack, Skeleton } from '@mui/material'

SkeletonViewFormField.propTypes = {
  variant: PropTypes.string,
  isDouble: PropTypes.bool,
  firstBarHeight: PropTypes.number,
  secondBarHeight: PropTypes.number,
  bgColor: PropTypes.string
}

export default function SkeletonViewFormField({ isDouble, firstBarHeight = 20, secondBarHeight = 6, bgColor = 'background.paper' }) {
 return (
  <Stack spacing={1} direction='row' alignItems='center' sx={{ py: 0.5, pl: 0, pr: 5 }}>
   <Stack spacing={0.6} sx={{ flexGrow: 1 }}>
    <Skeleton variant={'text'} sx={{ height: firstBarHeight, width: '100%', borderRadius: 1, backgroundColor: bgColor }} />
    {isDouble && <Skeleton variant={'text'} sx={{ height: secondBarHeight, width: '100%', borderRadius: 1, backgroundColor: bgColor }} />}
   </Stack>
  </Stack>
 )
}
