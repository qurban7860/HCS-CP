import PropTypes from 'prop-types'
import { Typography, Stack } from '@mui/material'
import { Image } from 'component/image'
import { ASSET } from 'config/asset-directory'

const EmptyContent = ({ title, description, img, sx, ...other }) => {
 return (
  <Stack
   alignItems='center'
   justifyContent='center'
   sx={{
    height: 1,
    textAlign: 'center',
    p: theme => theme.spacing(8, 2),
    ...sx
   }}
   {...other}>
   <Image disabledEffect alt='empty content' src={img || ASSET.LOGO} sx={{ height: 240, mb: 3, filter: 'grayscale(100%) opacity(10%)' }} />

   <Typography variant='h4' gutterBottom>
    {title}
   </Typography>

   {description && (
    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
     {description}
    </Typography>
   )}
  </Stack>
 )
}

EmptyContent.propTypes = {
 sx: PropTypes.object,
 img: PropTypes.string,
 title: PropTypes.string,
 description: PropTypes.string
}

export default EmptyContent
