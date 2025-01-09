import { Fragment, memo, useState } from 'react'
import { t } from 'i18next'
import { dispatch, useSelector } from 'store'
import { useAuthContext } from 'auth/use-auth-context'
import { Icon, useSettingContext, useUIMorph } from 'hook'
import { setUserDialog, archiveSecurityUser } from 'store/slice'
import { ICON_NAME } from 'hook'
import { useUserDefaultValues } from 'section'
import { useTheme, Dialog, DialogContent, DialogTitle, DialogActions, Divider, Grid, Typography } from '@mui/material'
import { GridViewField, TitleListItemText, AuditBox, CustomAvatar, ConfirmDialog } from 'component'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledCloseButton, GBackdropPropsOption, GStyledNoPaddingChip, GStyledDefLoadingButton } from 'theme/style'
import { KEY, FLEX, SZ, TYPOGRAPHY, SIZE } from 'constant'
import { toTitleCase } from 'util'

const UserDialog = () => {
 const [openArchiveModal, setOpenArchiveModal] = useState(false)
 const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState(false)
 const { securityUser, isLoading, userDialog } = useSelector(state => state.user)
 const { customer } = useSelector(state => state.customer)
 const { userId } = useAuthContext()
 const { themeMode } = useSettingContext()
 const { isDesktop } = useUIMorph()
 const theme = useTheme()
 const defaultValues = useUserDefaultValues(securityUser, customer)

 const isAdmin = securityUser?.roles?.some(role => role.name === 'CustomerAdmin')
 const isSelf = securityUser?._id === userId

 const handleDialog = () => dispatch(setUserDialog(false))

 const handleArchiveUser = async () => {
  await dispatch(archiveSecurityUser(securityUser._id))
  setOpenArchiveModal(false)
 }

 return (
  <Fragment>
   <Dialog disableEnforceFocus maxWidth={SZ.LG} open={userDialog} onClose={handleDialog} BackdropProps={GBackdropPropsOption(themeMode)}>
    <GStyledTopBorderDivider mode={themeMode} />
    <DialogTitle
     sx={{
      ...(isDesktop && { minWidth: 600 }),
      width: '100%',
      boxSizing: 'border-box',
      padding: theme.spacing(2)
     }}>
     <GStyledSpanBox sx={{ justifyContent: FLEX.SPACE_BETWEEN }}>
      <TitleListItemText truncatedName={defaultValues?.name} roles={defaultValues?.roles} />
      <GStyledSpanBox gap={1}>
       {securityUser?.isOnline && (
        <GStyledNoPaddingChip
         label={
          <GStyledSpanBox>
           <Icon icon={ICON_NAME.ONLINE} color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main} sx={{ height: 15, width: 15 }} />
           <Typography variant={TYPOGRAPHY.H6}>{t('online.label')}</Typography>
          </GStyledSpanBox>
         }
         icon={ICON_NAME.ONLINE}
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
    <DialogActions>
     <Grid item sm={12}>
      <Grid container justifyContent={FLEX.FLEX_END} display={FLEX.FLEX} gap={2}>
       {!isAdmin && !isSelf && (
        <GStyledDefLoadingButton
         isLoading={isLoading}
         type={'button'}
         mode={themeMode}
         textColor={theme.palette.error.contrastText}
         bgColor={theme.palette.error.dark}
         onClick={() => setOpenArchiveModal(true)}>
         <Icon icon={ICON_NAME.TRASH} sx={{ height: 15, width: 15 }} />
         &nbsp;
         {t('delete_user.label').toUpperCase()}
        </GStyledDefLoadingButton>
       )}
       <GStyledCloseButton icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleDialog} gap={2}>
        {t('close.label').toUpperCase()}
       </GStyledCloseButton>
      </Grid>
     </Grid>
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
