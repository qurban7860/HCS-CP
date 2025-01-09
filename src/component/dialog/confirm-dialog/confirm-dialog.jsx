import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSettingContext } from 'hook'
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'
import { GStyledTopBorderDivider, GBackdropPropsOption, GStyledCloseButton, GStyledDefLoadingButton } from 'theme/style'
import { SZ, TYPOGRAPHY } from 'constant'

function ConfirmDialog({ title, content, action, open, onClose, onClick, actionButtonTextColor, actionButtonBgColor, i18SubButtonLabel = 'cancel.label', i18ActionButtonLabel, isLoading, ...other }) {
 const { themeMode } = useSettingContext()
 return (
  <Dialog fullWidth maxWidth={SZ.XS} open={open} onClose={onClose} {...other} BackdropProps={GBackdropPropsOption(themeMode)}>
   <GStyledTopBorderDivider mode={themeMode} />
   <DialogTitle variant={TYPOGRAPHY.H4} sx={{ pb: 1, pt: 2 }}>
    {title}
   </DialogTitle>
   {content && <DialogContent sx={{ typography: TYPOGRAPHY.BODY2, pt: 2 }}> {content} </DialogContent>}
   <DialogActions>
    <GStyledCloseButton onClick={onClose}>{t(i18SubButtonLabel).toUpperCase()}</GStyledCloseButton>
    {action ? (
     action
    ) : (
     <GStyledDefLoadingButton isLoading={isLoading} type={'button'} textColor={actionButtonTextColor} bgColor={actionButtonBgColor} loading={isLoading} onClick={onClick}>
      {t(i18ActionButtonLabel).toUpperCase()}
     </GStyledDefLoadingButton>
    )}
   </DialogActions>
  </Dialog>
 )
}

ConfirmDialog.propTypes = {
 open: PropTypes.bool,
 title: PropTypes.string,
 action: PropTypes.node,
 content: PropTypes.any,
 onClose: PropTypes.func,
 onClick: PropTypes.func,
 isLoading: PropTypes.bool,
 actionButtonTextColor: PropTypes.string,
 actionButtonBgColor: PropTypes.string,
 i18SubButtonLabel: PropTypes.string,
 i18ActionButtonLabel: PropTypes.string
}

export default ConfirmDialog
