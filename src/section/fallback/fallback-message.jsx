import { m } from 'framer-motion'
import PropTypes from 'prop-types'
import { Typography, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { LABEL } from 'constant'

const FallbackMessage = ({ value, code }) => {
  const theme = useTheme()
  return (
    <m.div>
      <Typography
        variant="p"
        sx={{ color: theme.palette.grey[500], fontSize: 16, p: 19, pt: 0, pb: 1 }}
        paragraph
      >
        {value.message}
      </Typography>
      <Grid
        container
        sx={{
          display: 'flex',
          alignItems: 'right',
          justifyContent: 'flex-end',
          pb: 2,
        }}
      >
        <Grid item lg={3}>
          <Typography variant="overline">
            {LABEL.ERROR_CODE} {code}
          </Typography>
        </Grid>
      </Grid>
    </m.div>
  )
}

FallbackMessage.propTypes = {
  value: PropTypes.object,
  code: PropTypes.number,
}

export default FallbackMessage
