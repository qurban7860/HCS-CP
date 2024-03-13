import { m } from 'framer-motion'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export const FallbackMessage = ({ value }) => {
  const theme = useTheme()
  return (
    <m.div>
      <Typography
        variant="p"
        sx={{ color: theme.palette.grey[500], fontSize: 16, p: 19, pt: 0, pb: 2 }}
        paragraph
      >
        {value.message}
      </Typography>
    </m.div>
  )
}

FallbackMessage.propTypes = {
  value: PropTypes.object,
}
