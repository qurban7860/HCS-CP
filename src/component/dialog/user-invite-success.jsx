import { Fragment, memo, useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { useSettingContext, Icon, ICON_NAME } from 'hook'
import { setUserInviteDialog, setUserInviteContactDetails } from 'store/slice'
import { PATH_SECURITY } from 'route/path'
import { useMediaQuery, Grid, Dialog, DialogContent, DialogTitle, DialogActions, Divider, Typography, Avatar, Stack, Chip, Box, Autocomplete, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledCloseButton, GStyledLoadingButton, GBackdropPropsOption, GStyledFieldChip } from 'theme/style'
import { PATH_AFTER_LOGIN } from 'config/global'
import { TEXT_SIZE } from 'config/layout'
import { TYPOGRAPHY, FLEX, KEY, FLEX_DIR } from 'constant'
import { roleCoverUp } from 'util'

const UserInviteSuccessDialog = ({ action, onConfirm, setIsConfirming, isSubmitSuccessful, userData, enableRoleDropdown, title }) => {
 const { userInviteConfirmDetails, userInviteDialog } = useSelector(state => state.user)
 const { customerRoles } = useSelector(state => state.role)
 const { customer } = useSelector(state => state.customer)
 const [role, setRole] = useState([])
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const navigate = useNavigate()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

 const handleDialog = () => {
  setIsConfirming(false)
  dispatch(setUserInviteDialog(false))
 }

 const handleCloseAndNavigateToList = () => {
  setIsConfirming(false)
  dispatch(setUserInviteDialog(false))
  navigate(PATH_SECURITY.users.list)
 }

 const handleNavigate = () => {
  dispatch(setUserInviteDialog(false))
  const url = PATH_AFTER_LOGIN
  navigate(url)
 }

 const handleUpdateUserInviteContactDetails = async (event, newValue) => {
  await dispatch(setUserInviteContactDetails({ ...userData, roles: newValue }))
 }

 return (
  <Dialog disableEnforceFocus open={userInviteDialog} onClose={handleDialog} BackdropProps={GBackdropPropsOption(themeMode)}>
   <GStyledTopBorderDivider mode={themeMode} />
   <DialogTitle sx={{ ...(isDesktop && { minWidth: 500 }), width: '100%', boxSizing: 'border-box', padding: theme.spacing(2) }}>
    <Grid container gap={2}>
     {isSubmitSuccessful ? (
      <Grid container display={FLEX.FLEX} justifyContent={FLEX.CENTER}>
       <Avatar
        sx={{
         width: 20,
         height: 20,
         bgcolor: theme.palette.howick.darkBlue
        }}>
        <Icon icon={ICON_NAME.CHECK_CICLE_OUTLINE} width={40} sx={{ color: theme.palette.grey[200] }} />
       </Avatar>
      </Grid>
     ) : (
      <Typography variant={TEXT_SIZE.DIALOG_TITLE_VARIANT}>{title.toUpperCase() || t('confirm_user_details.label').toUpperCase()} &nbsp;</Typography>
     )}
    </Grid>
   </DialogTitle>
   <Divider orientation={KEY.HORIZONTAL} flexItem />
   <DialogContent dividers sx={{ px: 3, py: 2 }}>
    {isSubmitSuccessful ? (
     <Grid container display={FLEX.FLEX} justifyContent={FLEX.CENTER}>
      <Typography variant={isDesktop ? TYPOGRAPHY.H4 : TYPOGRAPHY.H5}>{t('next_step.user_invite_process.sent').toUpperCase()} &nbsp;</Typography>
     </Grid>
    ) : (
     <Grid container spacing={2} flexDirection={FLEX_DIR.COLUMN}>
      <Grid item xs={12} sm={12} pb={1}>
       <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
         <Typography color='text.secondary' variant={TYPOGRAPHY.OVERLINE0}>
          {t('organization_name.label')}
         </Typography>
         <Typography variant={TYPOGRAPHY.BODY1} sx={{ mb: 2 }}>
          &nbsp;{userInviteConfirmDetails?.customer?.name || customer?.name}
         </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
         <Typography color='text.secondary' variant={TYPOGRAPHY.OVERLINE0}>
          {t('contact_person_name.label')}
         </Typography>
         <Typography variant={TYPOGRAPHY.BODY1} sx={{ mb: 2 }}>
          &nbsp;{userInviteConfirmDetails?.name || userData?.name}
         </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
         <Typography color='text.secondary' variant={TYPOGRAPHY.OVERLINE0}>
          {t('email.label')}
         </Typography>
         <Typography variant={TYPOGRAPHY.BODY1} sx={{ mb: 2 }}>
          &nbsp;{userInviteConfirmDetails?.email || userData?.email}
         </Typography>
        </Grid>

        {userInviteConfirmDetails?.phone && (
         <Grid item xs={12} md={6}>
          <Typography color='text.secondary' variant={TYPOGRAPHY.OVERLINE0}>
           {t('contact_number.label')}
          </Typography>
          <Typography variant={TYPOGRAPHY.BODY1} sx={{ mb: 2 }}>
           &nbsp;{userInviteConfirmDetails.phone || userData?.phone}
          </Typography>
         </Grid>
        )}

        <Grid item xs={12} md={6}>
         {enableRoleDropdown ? (
          <Autocomplete
           multiple
           id='tags-outlined'
           options={customerRoles}
           getOptionLabel={option => roleCoverUp(option)}
           defaultValue={[]}
           filterSelectedOptions
           renderInput={params => <TextField {...params} label={t('role.roles.label')} placeholder={customerRoles?.length > role?.length ? t('role.placeholder') : ''} />}
           renderTags={(value, getTagProps) =>
            value.map((option, index) => {
             const { key, ...other } = getTagProps({ index })
             return <GStyledFieldChip key={option._id} mode={themeMode} label={roleCoverUp(option)} {...other} />
            })
           }
           onChange={(event, newValue) => {
            setRole(newValue)
            handleUpdateUserInviteContactDetails(newValue)
           }}
          />
         ) : (
          <Fragment>
           <Typography color='text.secondary' variant={TYPOGRAPHY.OVERLINE0}>
            {userInviteConfirmDetails?.roles?.length > 1 ? t('role.roles.label') : t('role.label')}
           </Typography>
           <Stack direction='row' spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
            &nbsp;
            {userInviteConfirmDetails?.roles?.map((role, index) => (
             <Chip key={index} label={<Typography variant={TYPOGRAPHY.H6}>{roleCoverUp(role)}</Typography>} variant='outlined' size='small' sx={{ borderRadius: 0.2 }} />
            ))}
           </Stack>
          </Fragment>
         )}
        </Grid>

        <Grid item xs={12} md={6}>
         <Typography color='text.secondary' variant={TYPOGRAPHY.OVERLINE0}>
          {t('enable_portal_access.label')}
         </Typography>
         <Typography variant={TYPOGRAPHY.BODY1} sx={{ mb: 2 }}>
          &nbsp;{userInviteConfirmDetails?.isInvite || userData?.isInvite ? t('yes.label') : t('no.label')}
         </Typography>
        </Grid>
       </Grid>
      </Grid>
     </Grid>
    )}
   </DialogContent>
   <DialogActions>
    {isSubmitSuccessful ? (
     <Grid item sm={12}>
      <Grid container justifyContent={FLEX.FLEX_END}>
       <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
        <GStyledCloseButton icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleCloseAndNavigateToList}>
         {t('close.label').toUpperCase()}
        </GStyledCloseButton>
        <GStyledLoadingButton icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleNavigate} mode={themeMode}>
         {t('go_to_dashboard.label').toUpperCase()}
        </GStyledLoadingButton>
       </Grid>
      </Grid>
     </Grid>
    ) : (
     <Fragment>
      <GStyledCloseButton icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleDialog}>
       {t('cancel.label').toUpperCase()}
      </GStyledCloseButton>
      <Box onClick={() => onConfirm()}>{action}</Box>
     </Fragment>
    )}
   </DialogActions>
  </Dialog>
 )
}

UserInviteSuccessDialog.propTypes = {
 responseUser: PropTypes.object,
 action: PropTypes.node,
 onConfirm: PropTypes.func,
 setIsConfirming: PropTypes.func,
 isSubmitSuccessful: PropTypes.bool,
 userData: PropTypes.object,
 enableRoleDropdown: PropTypes.bool,
 title: PropTypes.string
}

export default memo(UserInviteSuccessDialog)
