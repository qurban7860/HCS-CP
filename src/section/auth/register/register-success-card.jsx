import React from 'react'
import PropTypes from 'prop-types'
import { Box, Card, CardContent, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Avatar, Chip, Stack } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EmailIcon from '@mui/icons-material/Email'
import ReviewsIcon from '@mui/icons-material/Reviews'
import UpdateIcon from '@mui/icons-material/Update'
import { TYPOGRAPHY } from 'constant'

const RegisterSuccessCard = ({ submittedData }) => {
 if (!submittedData) return null

 return (
  <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
   <Card
    elevation={0}
    sx={{
     //  bgcolor: theme => theme.palette.background.default,
     border: 1,
     borderColor: theme => theme.palette.divider,
     borderRadius: 1
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
       <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />
      </Avatar>
      <Typography variant='h4' gutterBottom>
       Registration Request was submitted
      </Typography>
     </Box>

     <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
      <Typography variant='h6' gutterBottom>
       Submitted Details:
      </Typography>

      <Grid container spacing={3}>
       <Grid item xs={12} md={6}>
        <Typography color='text.secondary' variant='subtitle2'>
         Organization Name
        </Typography>
        <Typography variant='body1' sx={{ mb: 2 }}>
         {submittedData.customerName}
        </Typography>
       </Grid>

       <Grid item xs={12} md={6}>
        <Typography color='text.secondary' variant='subtitle2'>
         Contact Person
        </Typography>
        <Typography variant='body1' sx={{ mb: 2 }}>
         {submittedData.contactPersonName}
        </Typography>
       </Grid>

       <Grid item xs={12} md={6}>
        <Typography color='text.secondary' variant='subtitle2'>
         Email
        </Typography>
        <Typography variant='body1' sx={{ mb: 2 }}>
         {submittedData.email}
        </Typography>
       </Grid>

       {submittedData.phoneNumber && (
        <Grid item xs={12} md={6}>
         <Typography color='text.secondary' variant='subtitle2'>
          Phone Number
         </Typography>
         <Typography variant='body1' sx={{ mb: 2 }}>
          {submittedData.phoneNumber}
         </Typography>
        </Grid>
       )}

       {submittedData.address && (
        <Grid item xs={12} md={6}>
         <Typography color='text.secondary' variant='subtitle2'>
          Address
         </Typography>
         <Typography variant='body1' sx={{ mb: 2 }}>
          {submittedData.address}
         </Typography>
        </Grid>
       )}

       <Grid item xs={12} md={6}>
        <Typography color='text.secondary' variant='subtitle2'>
         Country
        </Typography>
        <Typography variant='body1' sx={{ mb: 2 }}>
         {submittedData.country.label}
        </Typography>
       </Grid>

       <Grid item xs={12}>
        <Typography color='text.secondary' variant='subtitle2'>
         Machine Serial Numbers
        </Typography>
        <Stack direction='row' spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
         {submittedData.machineSerialNos.map((serial, index) => (
          <Chip key={index} label={<Typography variant={TYPOGRAPHY.H6}>{serial}</Typography>} variant='outlined' size='small' sx={{ borderRadius: 0.2 }} />
         ))}
        </Stack>
       </Grid>

       {submittedData.customerNote && (
        <Grid item xs={12}>
         <Typography color='text.secondary' variant='subtitle2'>
          Additional Notes
         </Typography>
         <Typography variant='body1' sx={{ mb: 2 }}>
          {submittedData.customerNote}
         </Typography>
        </Grid>
       )}
      </Grid>
     </Paper>

     <Paper
      elevation={1}
      sx={{
       p: 3,
       bgcolor: theme => theme.palette.primary.light,
       color: theme => theme.palette.primary.contrastText
      }}>
      <Typography variant='h6' gutterBottom>
       Next Steps:
      </Typography>
      <List>
       <ListItem>
        <ListItemIcon>
         <EmailIcon sx={{ color: theme => theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText primary='Check your email for confirmation' />
       </ListItem>
       <ListItem>
        <ListItemIcon>
         <ReviewsIcon sx={{ color: theme => theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText primary='Our team will review your registration request' />
       </ListItem>
       <ListItem>
        <ListItemIcon>
         <UpdateIcon sx={{ color: theme => theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText primary='You will receive further instructions within 24-48 hours' />
       </ListItem>
      </List>
     </Paper>
    </CardContent>
   </Card>
  </Box>
 )
}

RegisterSuccessCard.propTypes = {
 submittedData: PropTypes.object
}

export default RegisterSuccessCard
