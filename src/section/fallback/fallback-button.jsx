import { t } from 'i18next'
import { useSettingContext } from 'hook'
import { PATH_HOME } from 'route/path'
import { useTheme } from '@mui/material'
import { GStyledDefLoadingButton } from 'theme/style'
import { KEY, SIZE } from 'constant'

const FallbackButton = () => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 return (
  <GStyledDefLoadingButton
   // HPS-1704: redir to home for now while machine logs is being restructured; then change it to dashboard/app
   onClick={() => window.open(PATH_HOME.root, '_self')}
   size={SIZE.MEDIUM}
   bgColor={themeMode === KEY.LIGHT ? theme.palette.howick.bronze : theme.palette.howick.orange}
   textColor={themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black}>
   {t('go_back.label').toUpperCase()}
  </GStyledDefLoadingButton>
 )
}

export default FallbackButton
