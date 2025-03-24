import PropTypes from 'prop-types'
import { Typography, Stack } from '@mui/material'
import { Image } from 'component/image'
import { ASSET } from 'config/asset-directory'

const EmptyContent = ({ title, description, img, sx, ...other }) => {
 const isMobile = window.innerWidth < 600
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
   <Image
    disabledEffect
    alt='empty content'
    src={img || (isMobile ? ASSET.ICON : ASSET.LOGO)}
    sx={{
     height: { xs: 120, sm: 240 },
     width: { xs: 125, sm: 450, md: 900 },
     mb: 3,
     filter: 'grayscale(100%) opacity(10%)'
    }}
   />

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
