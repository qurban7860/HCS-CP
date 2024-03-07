import PropTypes from 'prop-types'
import { Container, Card } from '@mui/material'
import SecurityUserAddForm from './security-user-addform'
import { Cover } from 'component/Defaults/Cover'

SecurityUserAdd.propTypes = {
  isInvite: PropTypes.bool,
}

export default function SecurityUserAdd({ isInvite }) {
  const title = isInvite ? 'Invite User' : 'Create User'
  return (
    <Container maxWidth={false}>
      <Card
        sx={{
          mb: 3,
          height: 160,
          position: 'relative',
        }}
      >
        <Cover name={title} icon="mdi:user-circle" />
      </Card>
      <SecurityUserAddForm isInvite={isInvite} />
    </Container>
  )
}
