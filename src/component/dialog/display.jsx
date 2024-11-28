import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Block, ModeOption, FullScreenOption, ContrastOption, Icon, ICON_NAME, useSettingContext, useResponsive } from 'hook'
import { Box, Dialog, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { Scrollbar } from 'component/scrollbar'
import { GStyledTopBorderDivider, GBackdropPropsOption } from 'theme/style'
import { NAV } from 'config'
import { FLEX, FLEX_DIR, KEY, TITLE, TYPOGRAPHY } from 'constant'

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
     height: NAV.H_ACCOUNT_POPOVER
    }
   }}>
   <GStyledTopBorderDivider mode={themeMode} />
   <Stack direction={FLEX_DIR.ROW} alignItems={KEY.CENTER} display={FLEX.FLEX} justifyContent={FLEX.SPACE_BETWEEN} sx={{ py: 1, pr: 1, pl: NAV.SPACING }}>
    <Typography
     variant={isMobile ? TYPOGRAPHY.H5 : TYPOGRAPHY.H3}
     sx={{
      flexGrow: 1,
      textAlign: 'left'
     }}>
     {TITLE.DISPLAY_SETTING}
    </Typography>

    <Tooltip title={t('reset.label')}>
     <Box sx={{ position: 'relative' }}>
      <IconButton onClick={onResetSetting}>
       <Icon icon={ICON_NAME.REFRESH} />
      </IconButton>
     </Box>
    </Tooltip>

    {/* activate when becomes a problem */}
    {/* <IconButton onClick={handleClose}>
     <WebIcon icon={closeSrc} />
    </IconButton> */}
   </Stack>

   <Divider />

   <Scrollbar sx={{ p: NAV.SPACING, pb: 0 }}>
    <Block {...TITLE.MODE(themeMode)}>
     <ModeOption />
    </Block>
    <Block {...TITLE.CONSTRAST}>
     <ContrastOption />
    </Block>
    <Block {...TITLE.FULLSCREEN}>
     <FullScreenOption />
    </Block>
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
