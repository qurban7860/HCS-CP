import { Button } from '@mui/material'
import { RADIUS } from 'config'
import { BUTTON } from 'constant'
import { PATH_DASHBOARD } from 'route/path'

const FallbackButton = () => {
  return (
    <Button
      onClick={() => window.open(PATH_DASHBOARD.general.app, '_self')}
      variant="outlined"
      size="large"
      color="success"
      sx={RADIUS.BORDER}
    >
      {BUTTON.GO_BACK}
    </Button>
  )
}

export default FallbackButton
