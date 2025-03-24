import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { Block, ModeOption, FullScreenOption, ContrastOption, Icon, ICON_NAME, useSettingContext, useResponsive } from 'hook'
import { Box, Dialog, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { Scrollbar } from 'component/scrollbar'
import { GStyledTopBorderDivider, GBackdropPropsOption } from 'theme/style'
import { NAV } from 'config/layout'
import { FLEX, FLEX_DIR, KEY, TYPOGRAPHY } from 'constant'

const DisplayDialog = ({ open, handleClose, onResetSetting }) => {
 const { themeMode } = useSettingContext()
 const isMobile = useResponsive('down', 'sm')

 return (
  <Dialog
   open={open}
   onClose={handleClose}
   BackdropProps={GBackdropPropsOption(themeMode)}
   PaperProps={{
    sx: {
     width: NAV.W_BASE,
     ...(open && { '&:after': { position: 'relative', zIndex: 9999 } }),
     height: isMobile ? NAV.H_ACCOUNT_POPOVER_MOBILE : NAV.H_ACCOUNT_POPOVER
    }
   }}>
   <GStyledTopBorderDivider mode={themeMode} />
   <Stack direction={FLEX_DIR.ROW} alignItems={KEY.CENTER} display={FLEX.FLEX} justifyContent={FLEX.SPACE_BETWEEN} sx={{ py: 1, pr: 1, pl: NAV.SPACING }}>
    <Typography
     variant={isMobile ? TYPOGRAPHY.H6 : TYPOGRAPHY.H5}
     sx={{
      flexGrow: 1,
      textAlign: 'left'
     }}>
     {t('display_settings.label')}
    </Typography>

    <Tooltip title={t('reset.label')}>
     <Box sx={{ position: 'relative' }}>
      <IconButton onClick={onResetSetting}>
       <Icon icon={ICON_NAME.REFRESH} />
      </IconButton>
     </Box>
    </Tooltip>
   </Stack>
   <Divider />
   <Scrollbar sx={{ p: NAV.SPACING, pb: 0 }}>
    <Block title={t('mode.label')} tooltip={<Trans i18nKey='mode.mode_tooltip' values={{ value: themeMode === KEY.LIGHT ? KEY.DARK.toUpperCase() : KEY.LIGHT.toUpperCase() }} />}>
     <ModeOption />
    </Block>
    <Block title={t('contrast.label')} tooltip={t('contrast.contrast_tooltip')}>
     <ContrastOption />
    </Block>
    {!isMobile && (
     <Block title={t('full_screen.label')} tooltip={t('full_screen.full_screen_tooltip')}>
      <FullScreenOption />
     </Block>
    )}
   </Scrollbar>
  </Dialog>
 )
}

DisplayDialog.propTypes = {
 open: PropTypes.bool,
 handleClose: PropTypes.func,
 onResetSetting: PropTypes.func
}

export default DisplayDialog
