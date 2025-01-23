import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state'
import { useTheme, Fade, Card, Typography, Popper, Box } from '@mui/material'
import { GStyledDefLoadingButton, GStyledIconLoadingButton, GStyledTopBorderDivider } from 'theme/style'
import { delay } from 'util'
import { FLEX, KEY } from 'constant'

const DefaultPopper = ({ content, openPopper, openAnchorEl, isLoading, onConfirmClick, i18ConfirmButtonLabel, onCancelClick, i18CancelButtonLabel, disableConfirm, disableCancel }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 return (
  <PopupState variant='popper' popupId='demo-popup-popper'>
   {popupState => (
    <div>
    <GStyledIconLoadingButton loading={isLoading}  textColor={theme.palette.common.white} bgColor={theme.palette.grey[500]} {...bindToggle(popupState)} gap={2}>
        <Icon icon={ICON_NAME.MAIL_USER} sx={{ width: 15, height: 15, p: 0 }}/> &nbsp; {t('send_invite.label').toUpperCase()}
    </GStyledIconLoadingButton>
     <Popper {...bindPopper(popupState)} transition sx={{ zIndex: theme.zIndex.modal + 12 }} placement='bottom-end'>
      {({ TransitionProps }) => (
       <Fade  {...TransitionProps} timeout={350}>
        <Card sx={{ paddingBottom: 2 }}  >
        <GStyledTopBorderDivider mode={themeMode} />
         <Typography sx={{ p: 2 }}>{content}</Typography>
         <Box display={FLEX.FLEX} justifyContent={KEY.CENTER} gap={2}>
          <GStyledDefLoadingButton
           type={'button'}
           loading={isLoading}
           mode={themeMode}
           textColor={theme.palette.common.white}
           bgColor={theme.palette.howick.midBlue}
           onClick={() => {
            onConfirmClick()
            delay(500).then(() => {
                    popupState.close()
                })
            }}
           disabled={isLoading}>
           {t(i18ConfirmButtonLabel).toUpperCase()}
          </GStyledDefLoadingButton>
          <span>
           <GStyledDefLoadingButton
            type={'button'}
            loading={isLoading}
            mode={themeMode}
            textColor={theme.palette.error.contrastText}
            bgColor={theme.palette.error.dark}
            onClick={() => popupState.close()}
            disabled={isLoading}>
            {t(i18CancelButtonLabel).toUpperCase()}
           </GStyledDefLoadingButton>
          </span>
         </Box>
        </Card>
       </Fade>
      )}
     </Popper>
    </div>
   )}
  </PopupState>
 )
}

DefaultPopper.propTypes = {
 content: PropTypes.node,
 openPopper: PropTypes.bool,
 openAnchorEl: PropTypes.object,
 isLoading: PropTypes.bool,
 onConfirmClick: PropTypes.func,
 onCancelClick: PropTypes.func,
 i18ConfirmButtonLabel: PropTypes.string,
 i18CancelButtonLabel: PropTypes.string,
 disableConfirm: PropTypes.bool,
 disableCancel: PropTypes.bool
}

export default DefaultPopper
