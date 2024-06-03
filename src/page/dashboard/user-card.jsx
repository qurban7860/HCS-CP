import { Container, Box } from '@mui/material'
import { PATH_DASHBOARD } from '../../routes/paths'
import { _userCards } from '../../_mock/arrays'
import { useSettingContext } from 'hook'
import CustomBreadcrumbs from '../../components/custom-breadcrumbs'
import UserCard from '../../sections/@dashboard/user/cards/UserCard'

export default function UserCardsPage() {
  const { themeStretch } = useSettingContext()

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="User Cards"
        links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'User', href: PATH_DASHBOARD.user.root }, { name: 'Cards' }]}
      />

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        }}>
        {_userCards.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Box>
    </Container>
  )
}
