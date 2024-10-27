import { Fragment } from 'react'
import { Skeleton } from '@mui/material'

const SkeletonLoading = () => {
 return (
  <Fragment>
   <Skeleton variant='rectangular' width='100%' height={200} />
   <Skeleton variant='rectangular' width='100%' height={50} sx={{ mt: 2 }} />
   <Skeleton variant='rectangular' width='100%' height={100} sx={{ mt: 2 }} />
  </Fragment>
 )
}

export default SkeletonLoading
