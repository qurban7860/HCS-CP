import { Skeleton, Card } from '@mui/material'
import { KEY } from 'constant'

const SkeletonGallery = () => {
    return (
        <Card sx={{ cursor: 'pointer', position: KEY.RELATIVE }}>
          <Skeleton animation={"wave"} height={115} variant="rectangular" />
          <Skeleton animation={"wave"} height={15} width="90%" sx={{margin:1}} />
        </Card>
    )
  }

export default SkeletonGallery