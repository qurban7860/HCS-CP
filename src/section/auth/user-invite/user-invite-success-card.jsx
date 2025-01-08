import { useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { Box, Card, CardContent, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Avatar, Chip, Stack } from '@mui/material'
import { GStyledLoadingButton } from 'theme/style'
import { GLOBAL } from 'config/global'
import { RADIUS } from 'config/layout'
import { SIZE, TYPOGRAPHY, VARIANT } from 'constant'

const UserInviteSuccessCard = ({ submittedData }) => {
 const [loading, setLoading] = useState(false)
 const { themeMode } = useSettingContext()
 const handleWebsite = () => {
  window.open(GLOBAL.WEBSITE, '_top')
  setLoading(true)
  window.focus()
 }

 if (!submittedData) return null

 return (
  <Box sx={{ maxWidth: 900, mx: 'auto', mt: 2 }}>
   <Card
    elevation={0}
    sx={{
     border: 1,
     borderColor: theme => theme.palette.divider,
     ...RADIUS.BORDER
    }}>
    <CardContent sx={{ boxShadow: 0 }}>
     <Box sx={{ textAlign: 'center', mb: 4 }}>
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
      <Typography variant='h4' gutterBottom>
       {t('next_step.registration_process.title')}
      </Typography>
     </Box>

     <Paper
      elevation={1}
      sx={{
       p: 3,
       bgcolor: theme => theme.palette.primary.light,
       color: theme => theme.palette.primary.contrastText
      }}>
      <Typography variant={TYPOGRAPHY.H6} gutterBottom>
       {t('next_step.next_steps.label')}
      </Typography>
      <List>
       <ListItem>
        <ListItemIcon>
         <Icon icon={ICON_NAME.REVIEW} sx={{ color: theme => theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText primary={t('next_step.registration_process.first')} />
       </ListItem>

       <ListItem>
        <ListItemIcon>
         <Icon icon={ICON_NAME.UPDATE} sx={{ color: theme => theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText primary={t('next_step.registration_process.second')} />
       </ListItem>

       <ListItem>
        <ListItemIcon>
         <Icon icon={ICON_NAME.EMAIL} sx={{ color: theme => theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText
         primary={
          <Trans i18nKey='next_step.registration_process.last' components={[<Typography key='1' variant={TYPOGRAPHY.BODY1} sx={{ fontStyle: 'italic' }} />]} values={{ email: submittedData.email }} />
         }
        />
       </ListItem>
      </List>
     </Paper>

     <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
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
          <Chip key={index} label={<Typography variant={TYPOGRAPHY.H6}>{serial}</Typography>} variant='outlined' size='small' sx={{ ...RADIUS.CHIP }} />
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
     </Paper>
     <Box sx={{ textAlign: 'right' }}>
      <GStyledLoadingButton mode={themeMode} loading={loading} isLoading={loading} variant={VARIANT.CONTAINED} color='primary' size={SIZE.LARGE} onClick={handleWebsite} rel='noopener noreferrer'>
       <Icon icon={ICON_NAME.WWW} /> &nbsp; {t('howick_website.label').toUpperCase()} <Icon icon={ICON_NAME.CHEVRON_RIGHT} />
      </GStyledLoadingButton>
     </Box>
    </CardContent>
   </Card>
  </Box>
 )
}

UserInviteSuccessCard.propTypes = {
 submittedData: PropTypes.object
}

export default UserInviteSuccessCard
