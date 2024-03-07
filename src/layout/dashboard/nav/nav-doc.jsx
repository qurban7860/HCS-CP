import { Stack, Button, Typography } from '@mui/material'
import { useAuthContext } from 'auth'
import { PATH_DOCS } from 'route/path'

export default function NavDocs() {
  // const { user } = useAuthContext()
  return (
    <Stack
      sx={{
        px: 5,
        pb: 5,
        pt: 25,
        display: 'block',
        textAlign: 'center',
        background: `url('/assets/illustrations/illustration_howick_icon.svg')`,
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '70%',
      }}
    >
      <Typography gutterBottom variant="subtitle1">
        {/* Hi, {user?.displayName} */}
        Hi, Howick
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', pb: 1 }}>
        Know more about our products and services
      </Typography>
      <Button href={PATH_DOCS.root} target="_blank" rel="noopener" variant="contained">
        SEE HOWICK
      </Button>
    </Stack>
  )
}
