import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { dispatch, useSelector } from 'store'
import { useSettingContext, Icon, ICON_NAME } from 'hook'
import { setCustomerTicketDialog } from 'store/slice'
import { useTicketDefaultValues } from 'section/support'
import { useMediaQuery, Grid, Dialog, DialogContent, DialogTitle, Divider, Typography, Box, Paper, List, ListItem, ListItemIcon, ListItemText, Avatar, Stack, Chip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledCloseButton } from 'theme/style'
import { GLOBAL } from 'config/global'
import { TYPOGRAPHY, FLEX, KEY, FLEX_DIR } from 'constant'
import { normalizer } from 'util/format'
import { parseArrDesc } from 'util/parse-arr-desc'
import { truncate } from 'util'

const UserInviteSuccessDialog = ({ submittedData }) => {
 const { customer, isLoading, customerUserInviteDialog } = useSelector(state => state.customer)
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

 //  const defaultValues = useTicketDefaultValues(customerTicket)
 const handleDialog = () => dispatch(setCustomerTicketDialog(false))

 const handleCustomerTicketOverview = jiraKey => {
  dispatch(setCustomerTicketDialog(false))
  const url = GLOBAL.JIRA_URL + jiraKey
  window.open(url, KEY.BLANK)
 }

 return (
  <Dialog disableEnforceFocus maxWidth={KEY.LG} open={customerUserInviteDialog} onClose={handleDialog} aria-describedby='alert-dialog-slide-description'>
   <GStyledTopBorderDivider mode={themeMode} />
   <DialogTitle
    sx={{
     ...(isDesktop && { minWidth: 500 }),
     width: '100%',
     boxSizing: 'border-box',
     padding: theme.spacing(2)
    }}>
    <GStyledSpanBox>
     <Grid container flexDirection={FLEX_DIR.ROW} justifyContent='space-between'>
      <Grid item sm={6}>
       <GStyledSpanBox>
        <Avatar
         sx={{
          width: 60,
          height: 60,
          bgcolor: 'success.light',
          mx: 'auto',
          mb: 2
         }}>
         <Icon icon={ICON_NAME.CHECK_CICLE_OUTLINE} width={40} sx={{ color: theme => theme.palette.primary.contrastText }} />
        </Avatar>
        <Typography variant={isDesktop ? TYPOGRAPHY.H5 : TYPOGRAPHY.H6}>{t('next_step.user_invite_process.title')} &nbsp;</Typography>
       </GStyledSpanBox>
      </Grid>
     </Grid>
    </GStyledSpanBox>
   </DialogTitle>
   <Divider orientation={KEY.HORIZONTAL} flexItem />
   <DialogContent dividers sx={{ px: 3, py: 2 }}>
    <Grid container spacing={2} flexDirection={FLEX_DIR.COLUMN}>
     <Grid item xs={12} sm={12} pb={1}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
       <Typography variant={TYPOGRAPHY.H4} gutterBottom>
        {t('next_step.user_invite_process.title')}
       </Typography>
      </Box>

      <Typography variant='h6' gutterBottom>
       {t('submitted_details.label')} :
      </Typography>

      <Grid container spacing={3}>
       <Grid item xs={12} md={6}>
        <Typography color='text.secondary' variant={TYPOGRAPHY.OVERLINE0}>
         {t('organization_name.label')}
        </Typography>
        <Typography variant={TYPOGRAPHY.BODY1} sx={{ mb: 2 }}>
         &nbsp;{submittedData.customerName}
        </Typography>
       </Grid>

       <Grid item xs={12} md={6}>
        <Typography color='text.secondary' variant={TYPOGRAPHY.OVERLINE0}>
         {t('contact_person_name.label')}
        </Typography>
        <Typography variant={TYPOGRAPHY.BODY1} sx={{ mb: 2 }}>
         &nbsp;{submittedData.contactPersonName}
        </Typography>
       </Grid>

       <Grid item xs={12} md={6}>
        <Typography color='text.secondary' variant={TYPOGRAPHY.OVERLINE0}>
         {t('email.label')}
        </Typography>
        <Typography variant={TYPOGRAPHY.BODY1} sx={{ mb: 2 }}>
         &nbsp;{submittedData.email}
        </Typography>
       </Grid>

       {submittedData.phoneNumber && (
        <Grid item xs={12} md={6}>
         <Typography color='text.secondary' variant={TYPOGRAPHY.OVERLINE0}>
          {t('contact_number.label')}
         </Typography>
         <Typography variant={TYPOGRAPHY.BODY1} sx={{ mb: 2 }}>
          &nbsp;{submittedData.phoneNumber}
         </Typography>
        </Grid>
       )}

       {submittedData.address && (
        <Grid item xs={12} md={6}>
         <Typography color='text.secondary' variant={TYPOGRAPHY.OVERLINE0}>
          {t('address.label')}
         </Typography>
         <Typography variant={TYPOGRAPHY.BODY1} sx={{ mb: 2 }}>
          &nbsp;{submittedData.address}
         </Typography>
        </Grid>
       )}

       <Grid item xs={12} md={6}>
        <Typography color='text.secondary' variant={TYPOGRAPHY.OVERLINE0}>
         {t('country.label')}
        </Typography>
        <Typography variant={TYPOGRAPHY.BODY1} sx={{ mb: 2 }}>
         &nbsp;{submittedData.country.label}
        </Typography>
       </Grid>

       <Grid item xs={12}>
        <Typography color='text.secondary' variant={TYPOGRAPHY.OVERLINE0}>
         {submittedData.machineSerialNos.length > 1 ? t('machine.machines.label') : t('machine.label')}
        </Typography>
        <Stack direction='row' spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
         &nbsp;
         {submittedData.machineSerialNos.map((serial, index) => (
          <Chip key={index} label={<Typography variant={TYPOGRAPHY.H6}>{serial}</Typography>} variant='outlined' size='small' sx={{ borderRadius: 0.2 }} />
         ))}
        </Stack>
       </Grid>

       {submittedData.customerNote && (
        <Grid item xs={12}>
         <Typography color='text.secondary' variant={TYPOGRAPHY.OVERLINE0}>
          {t('additional_notes.label')}
         </Typography>
         <Typography variant={TYPOGRAPHY.BODY1} sx={{ mb: 2 }}>
          {submittedData.customerNote}
         </Typography>
        </Grid>
       )}
      </Grid>

      <Grid item sm={12} my={2}>
       <Grid container justifyContent={FLEX.FLEX_END}>
        <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
         <GStyledCloseButton icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleDialog}>
          {t('close.label').toUpperCase()}
         </GStyledCloseButton>
         {/* <Button label={t('view_jira.label')} icon={ICON_NAME.JIRA} onClick={() => handleCustomerTicketOverview(defaultValues?.key)} /> */}
        </Grid>
       </Grid>
      </Grid>
     </Grid>
    </Grid>
   </DialogContent>
  </Dialog>
 )
}

UserInviteSuccessDialog.propTypes = {
 submittedData: PropTypes.object.isRequired
}

export default UserInviteSuccessDialog
