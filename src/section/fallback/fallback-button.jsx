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
      variant={themeMode === KEY.LIGHT ? 'contained' : 'contained'}
      size="small"
      sx={{
        color: themeMode === KEY.LIGHT ? 'grey.300' : 'common.white',
        backgroundColor: themeMode === KEY.LIGHT ? 'howick.bronze' : COLOR.PRIMARY,
        borderColor: themeMode === KEY.LIGHT ? 'howick.darkBlue' : 'common.white'
      }}>
      {BUTTON.GO_BACK}
    </Button>
  )
}

export default FallbackButton
