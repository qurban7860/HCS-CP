import { t } from 'i18next'
import { useSettingContext } from 'hook'
import { useTheme } from '@mui/material'
import { GStyledDefLoadingButton } from 'theme/style'
import { KEY, SIZE } from 'constant'
import { PATH_DASHBOARD } from 'route/path'

const FallbackButton = () => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 return (
  <GStyledDefLoadingButton
   onClick={() => window.open(PATH_DASHBOARD.general.app, '_self')}
   size={SIZE.MEDIUM}
   bgColor={themeMode === KEY.LIGHT ? theme.palette.howick.bronze : theme.palette.howick.orange}
   textColor={themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black}>
   {t('go_back.label').toUpperCase()}
  </GStyledDefLoadingButton>
 )
}

export default FallbackButton
