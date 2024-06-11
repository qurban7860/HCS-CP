import PropTypes from 'prop-types'
import { LazyMotion, m } from 'framer-motion'
import { Box } from '@mui/material'

// eslint-disable-next-line import/extensions
const loadFeatures = () => import('./feature.js').then((res) => res.default)

MotionLazyContainer.propTypes = {
  children: PropTypes.node
}

export default function MotionLazyContainer({ children }) {
  return (
    <LazyMotion strict features={loadFeatures}>
      <Box component={m.div} style={{ height: '100vh' }}>
        {children}
      </Box>
    </LazyMotion>
  )
}
