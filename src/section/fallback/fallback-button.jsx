import { Button } from '@mui/material'
import { RADIUS } from 'config'
import { BUTTON, COLOR, KEY } from 'constant'
import { PATH_DASHBOARD } from 'route/path'
import { useSettingContext } from 'component/setting'

const FallbackButton = () => {
  const { themeMode } = useSettingContext()
  return (
    <Button
      onClick={() => window.open(PATH_DASHBOARD.general.app, '_self')}
      variant="outlined"
      size="large"
      sx={{
        color: themeMode === KEY.LIGHT ? 'howick.darkBlue' : 'common.white',
        borderColor: themeMode === KEY.LIGHT ? 'howick.darkBlue' : 'common.white',
        ...RADIUS.BORDER
      }}>
      {BUTTON.GO_BACK}
    </Button>
  )
}

export default FallbackButton
