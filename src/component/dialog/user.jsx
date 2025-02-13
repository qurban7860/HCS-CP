import { Fragment, memo, useState } from 'react'
import { t } from 'i18next'
import { dispatch, useSelector } from 'store'
import { useAuthContext } from 'auth/use-auth-context'
import { Icon, snack, useSettingContext, useUIMorph } from 'hook'
import { setUserDialog, archiveSecurityUser, updateStatusSecurityUser, sendUserInvite } from 'store/slice'
import { ICON_NAME } from 'hook'
import { useUserDefaultValues } from 'section'
import { useTheme, Dialog, DialogContent, DialogTitle, DialogActions, Divider, Grid, Typography, FormControlLabel, Box } from '@mui/material'
import { GridViewField, DefaultPopper, AuditBox, CustomAvatar, ConfirmDialog, IconTooltip, TitleTextIcon } from 'component'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledCloseButton, GBackdropPropsOption, GStyledNoPaddingChip, GStyledIconLoadingButton, GStyledSwitch } from 'theme/style'
import { ICON } from 'config/layout'
import { KEY, FLEX, SZ, TYPOGRAPHY, SIZE } from 'constant'
import { toTitleCase } from 'util'
import { delay } from 'util'

const UserDialog = () => {
 const [openArchiveModal, setOpenArchiveModal]                 = useState(false)
 const [openUpdateStatusModal, setOpenUpdateStatusModal]       = useState(false)
 const [openSendInvitePopper, setOpenSendInvitePopper]         = useState(false)
 const [openAnchorEl, setOpenAnchorEl]                         = useState(null)
 const { securityUser, securityUsers,  isLoading, userDialog } = useSelector(state => state.user)
 const { customer }                                            = useSelector(state => state.customer)
 const { contact }                                             = useSelector(state => state.contact)
 const { userId }                                              = useAuthContext()
 const { themeMode }                                           = useSettingContext()
 const { isDesktop }                                           = useUIMorph()
 const theme                                                   = useTheme()
 const defaultValues                                           = useUserDefaultValues(securityUser, customer)

 const isAdmin = securityUser?.roles?.some(role => role.name === KEY.CUSTOMER_ADMIN)
 const isSelf = securityUser?._id === userId

 const handleDialog = () => dispatch(setUserDialog(false))

 const handleArchiveUser = async () => {
  await dispatch(archiveSecurityUser(securityUser._id))
  setOpenArchiveModal(false)
 }

 const handleUpdateStatusUser = async () => {
  const securityUserData = { isActive: !securityUser.isActive }
  await dispatch(updateStatusSecurityUser(securityUser._id, securityUserData))
 }

 const handleSendUserInvite = async () => {
  await dispatch(sendUserInvite(securityUser._id, customer?._id))
  snack(t('invite_sent.label'), 'success')
  delay(2000).then(() => {
    setOpenSendInvitePopper(false)
  })
 }

//  check if user has already has a user
 const contactHasActiveUser = securityUsers?.some(user => user.email === securityUser?.email && user.isActive)

 return (
  <Fragment>
   <Dialog maxWidth={SZ.LG} open={userDialog} onClose={handleDialog} BackdropProps={GBackdropPropsOption(themeMode)}>
    <GStyledTopBorderDivider mode={themeMode} />
    <DialogTitle
     sx={{
      ...(isDesktop && { minWidth: 600 }),
      width: '100%',
      boxSizing: 'border-box',
      padding: theme.spacing(2)
     }}>
     <GStyledSpanBox sx={{ justifyContent: FLEX.SPACE_BETWEEN }}>
      <TitleTextIcon
       truncatedName={defaultValues?.name}
       icon={
        <IconTooltip
         title={defaultValues?.isActive ? t('active.label') : t('inactive.label')}
         icon={defaultValues?.isActive ? ICON_NAME.ACTIVE : ICON_NAME.INACTIVE}
         color={defaultValues?.isActive ? (themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main) : theme.palette.error.main}
         tooltipColor={defaultValues?.isActive ? (themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main) : theme.palette.error.main}
         tooltipTextColor={theme.palette.common.white}
         iconOnly
         dimension={15}
        />
       }
       roles={defaultValues?.roles}
      />
      <GStyledSpanBox gap={1}>
       {securityUser?.isOnline && (
        <GStyledNoPaddingChip
         label={
          <GStyledSpanBox>
           <Icon icon={ICON_NAME.ONLINE} color={theme.palette.burnIn.main} sx={{ height: 15, width: 15 }} />
           &nbsp;
           <Typography variant={TYPOGRAPHY.OVERLINE2}>{t('online.label')}</Typography>
          </GStyledSpanBox>
         }
         variant={KEY.CONTAINED}
         bgColor={themeMode === KEY.LIGHT ? theme.palette.grey[200] : theme.palette.grey[700]}
         size={SIZE.SMALL}
        />
       )}
       <CustomAvatar name={defaultValues?.name} dimension={40} />
      </GStyledSpanBox>
     </GStyledSpanBox>
    </DialogTitle>
    <Divider orientation={KEY.HORIZONTAL} flexItem />
    <DialogContent dividers sx={{ px: 3 }}>
     <Grid item xs={12} sm={12} my={1}>
      <Grid container rowSpacing={1} columnSpacing={1}>
       <GridViewField heading={t('full_name.label')} isLoading={isLoading}>
        {defaultValues?.name}
       </GridViewField>
       <GridViewField heading={t('email.label')} isLoading={isLoading}>
        {defaultValues?.email}
       </GridViewField>
       <GridViewField heading={t('phone.label')} isLoading={isLoading}>
        {defaultValues?.phone}
       </GridViewField>
      </Grid>
     </Grid>
     <Divider orientation={KEY.HORIZONTAL} flexItem />
     <Grid item xs={12} sm={12} my={1}>
      <Grid container rowSpacing={1} columnSpacing={1}>
       <GridViewField heading={t('organization.label')} isLoading={isLoading}>
        {defaultValues?.customer?.name}
       </GridViewField>
       <GridViewField heading={t('contact.label')} isLoading={isLoading}>
        {defaultValues?.contact?.firstName} {defaultValues?.contact?.lastName}
       </GridViewField>
      </Grid>
     </Grid>
     <AuditBox value={defaultValues} pb={0} />
    </DialogContent>
    <DialogActions sx={{ display: FLEX.FLEX, justifyContent: !isAdmin && !isSelf ? FLEX.SPACE_BETWEEN : FLEX.FLEX_END }}>
     {!isAdmin && !isSelf && (
      <Box>
       <FormControlLabel
        control={
         <GStyledSwitch
          checked={!!defaultValues?.isActive}
          onChange={handleUpdateStatusUser}
          mode={themeMode}
          isActive={defaultValues?.isActive}
          color={defaultValues?.isActive ? (themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main) : theme.palette.error.dark}
         />
        }
        label={
         <Typography variant={TYPOGRAPHY.BODY2} color={themeMode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[700]}>
          {defaultValues?.isActive ? t('deactivate.label') : t('activate.label')}
         </Typography>
        }
       />
      </Box>
     )}

     <GStyledSpanBox gap={1}>
      {!isAdmin && !isSelf && (
       <GStyledIconLoadingButton
        loading={isLoading}
        type={'button'}
        mode={themeMode}
        textColor={theme.palette.error.contrastText}
        bgColor={theme.palette.error.dark}
        onClick={() => setOpenArchiveModal(true)}>
        <Icon icon={ICON_NAME.TRASH} sx={{...ICON.SIZE_XS }}/>&nbsp;{t('delete.label').toUpperCase()}
       </GStyledIconLoadingButton>
      )}
      {!contactHasActiveUser && (
        <DefaultPopper
        openPopper={openSendInvitePopper}
        openAnchorEl={openAnchorEl}
        isLoading={isLoading}
        content={t('send_portal_invite.label', { user: toTitleCase(defaultValues?.name) })}
        i18ConfirmButtonLabel={'yes.label'}
        i18CancelButtonLabel={'no.label'}
        onConfirmClick={handleSendUserInvite}
      />
      )}

      <GStyledCloseButton onClick={handleDialog} gap={2}>
       {t('close.label').toUpperCase()}
      </GStyledCloseButton>
     </GStyledSpanBox>
    </DialogActions>
   </Dialog>

   {openArchiveModal && (
    <ConfirmDialog
     open={openArchiveModal}
     onClose={() => setOpenArchiveModal(false)}
     title={t('delete_user.label')}
     content={t('delete_user.confirm_delete_user', { user: toTitleCase(defaultValues?.name) })}
     onClick={handleArchiveUser}
     actionButtonBgColor={theme.palette.error.main}
     actionButtonTextColor={theme.palette.error.contrastText}
     i18ActionButtonLabel={'delete.label'}
    />
   )}
   {openUpdateStatusModal && (
    <ConfirmDialog
     open={openUpdateStatusModal}
     onClose={() => setOpenUpdateStatusModal(false)}
     title={t('delete_user.label')}
     content={t('delete_user.confirm_delete_user', { user: toTitleCase(defaultValues?.name) })}
     onClick={handleArchiveUser}
     actionButtonBgColor={theme.palette.error.main}
     actionButtonTextColor={theme.palette.error.contrastText}
     i18ActionButtonLabel={'delete.label'}
    />
   )}
  </Fragment>
 )
}

export default memo(UserDialog)
