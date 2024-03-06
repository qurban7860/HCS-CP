import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { Container, Typography } from '@mui/material'
import { MotionContainer, varBounce } from 'component/animate'
import { useAuthContext } from './use-auth-context'

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
  hasContent: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string),
}

export default function RoleBasedGuard({ hasContent, roles, children }) {
  const { user } = useAuthContext()

  const currentRole = user?.role

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <h2>Image here</h2>
        </m.div>
      </Container>
    ) : null
  }

  return <> {children} </>
}
