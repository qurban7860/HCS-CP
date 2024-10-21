import { m } from 'framer-motion'
import PropTypes from 'prop-types'
import { Typography, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { HTTP_CODE, KEY, LABEL, TYPOGRAPHY, FLEX } from 'constant'

const FallbackMessage = ({ value, code }) => {
 const theme = useTheme()

 return (
  <m.div>
   <Typography variant={TYPOGRAPHY.BODY1} sx={{ color: theme.palette.grey[500], p: 19, pt: 0, pb: 1 }} paragraph>
    {value.message}
   </Typography>
   <Grid
    container
    sx={{
     display: FLEX.FLEX,
     alignItems: KEY.RIGHT,
     justifyContent: FLEX.FLEX_END,
     pb: 2,
     pr: 5
    }}>
    <Grid item lg={3}>
     <Typography variant={TYPOGRAPHY.OVERLINE}>
      {LABEL.ERROR_CODE} {code}
     </Typography>
    </Grid>
   </Grid>
  </m.div>
 )
}

FallbackMessage.propTypes = {
 value: PropTypes.object,
 code: PropTypes.oneOf(Object.values(HTTP_CODE))
}

export default FallbackMessage
