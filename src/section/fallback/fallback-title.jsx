import { m } from 'framer-motion'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const FallbackTitle = ({ value }) => {
  const theme = useTheme()
  return (
    <m.div>
      <Typography variant="h3" sx={{ color: theme.palette.grey[500] }}>
        {value.title}
      </Typography>
    </m.div>
  )
}

FallbackTitle.propTypes = {
  value: PropTypes.object,
}

export default FallbackTitle
