import { memo } from 'react'
import { t } from 'i18next'
import PropTypes from 'prop-types'
import { dispatch, useSelector } from 'store'
import { useNavigate } from 'react-router-dom'
import { useSettingContext } from 'hook'
import { useAuthContext } from 'auth'
import { ICON_NAME } from 'hook'
import { PATH_CUSTOMER } from 'route/path'
import { setContactDialog, resetSelectedContactCard, setSelectedContactCard, setFromDialog, getContact } from 'store/slice'
import { useContactDefaultValues } from 'section/crm'
import { useMediaQuery, Grid, Dialog, DialogContent, DialogTitle, DialogActions, Divider, Typography } from '@mui/material'
import { GridViewField, GridViewTitle, IconTooltip, Button, AuditBox } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledCloseButton, GBackdropPropsOption } from 'theme/style'
import { VIEW_FORM, TITLE, TYPOGRAPHY, FLEX, LABEL, KEY, FLEX_DIR, BUTTON } from 'constant'
import { delay } from 'util'

const ContactDialog = ({ contact }) => {
 const { isLoading, contactDialog } = useSelector(state => state.contact)
 const { customer } = useSelector(state => state.customer)

 const { user } = useAuthContext()
 const customerId = user?.customer
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 const navigate = useNavigate()

 const defaultValues = useContactDefaultValues(contact, customer)

 const { ADDRESS } = VIEW_FORM
 const handleDialog = () => dispatch(setContactDialog(false))

 const handleContactOverview = () => {
  dispatch(setContactDialog(false))
  dispatch(resetSelectedContactCard())
  navigate(PATH_CUSTOMER.customers.contacts.view(customerId))
  delay(200).then(() => {
      dispatch(setFromDialog(true))
      dispatch(setSelectedContactCard(defaultValues?.id))
      dispatch(getContact(customerId, defaultValues?.id))
  })
 }

 return (
  <Dialog disableEnforceFocus maxWidth={KEY.LG} open={contactDialog} onClose={handleDialog} BackdropProps={GBackdropPropsOption(themeMode)}>
   <GStyledTopBorderDivider mode={themeMode} />
   <DialogTitle
    sx={{
     width: '100%',
     boxSizing: 'border-box',
     padding: theme.spacing(2)
    }}>
    <GStyledSpanBox>
     <Grid container flexDirection={FLEX_DIR.ROW} justifyContent={FLEX.SPACE_BETWEEN}>
      <Grid item sm={6}>
       <GStyledSpanBox>
        <Typography variant={isDesktop ? TYPOGRAPHY.H3 : TYPOGRAPHY.H5}>{defaultValues?.fullName} &nbsp;</Typography>
       </GStyledSpanBox>
      </Grid>
      <Grid item sm={6}>
       <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
        {defaultValues?.machineConnection?.length > 0 && <IconTooltip title={LABEL.PARENT_MACHINE} icon={ICON_NAME.PARENT} color={theme.palette.grey[500]} iconOnly />}
        {defaultValues?.isActive ? (
         <IconTooltip
          title={LABEL.ACTIVE}
          icon={ICON_NAME.ACTIVE}
          color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
          tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
          isActiveIcon
          iconOnly
         />
        ) : (
         <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} iconOnly />
        )}
       </Grid>
      </Grid>
     </Grid>
    </GStyledSpanBox>
   </DialogTitle>
   <Divider orientation={KEY.HORIZONTAL} flexItem />
   <DialogContent dividers sx={{ px: 3, py: 2 }}>
    <Grid container spacing={2} flexDirection={FLEX_DIR.COLUMN}>
     <Grid item sm={12}>
      <Grid container flexDirection='row'>
       <GridViewTitle title={TITLE.KEY_DETAILS} />
       <Grid container spacing={1} pb={1}>
        <GridViewField heading={VIEW_FORM.FIRST_NAME} isLoading={isLoading}>
         {defaultValues?.firstName}
        </GridViewField>
        <GridViewField heading={VIEW_FORM.LAST_NAME} isLoading={isLoading}>
         {defaultValues?.lastName}
        </GridViewField>
        <GridViewField heading={VIEW_FORM.HEADING_EMAIL} isLoading={isLoading}>
         {defaultValues?.email}
        </GridViewField>
        <GridViewField heading={VIEW_FORM.PHONE} isLoading={isLoading}>
         {defaultValues?.phone}{' '}
        </GridViewField>
        <GridViewField
         heading={VIEW_FORM.ORGANIZATION}
         isLoading={isLoading}
         gridSize={12}
         country={defaultValues?.customerCountry}
         customerLink={PATH_CUSTOMER.customers.view(defaultValues?.customerId)}>
         {defaultValues?.customerName}
        </GridViewField>
       </Grid>
      </Grid>
     </Grid>
     <Grid item sm={12}>
      <Grid container flexDirection={FLEX_DIR.ROW}>
       <GridViewTitle title={TITLE.ADDRESS_INFO} />
       <Grid container spacing={1} pb={1}>
        <GridViewField heading={ADDRESS.STREET} isLoading={isLoading} gridSize={8}>
         {defaultValues?.street}
        </GridViewField>
        <GridViewField heading={ADDRESS.SUBURB} isLoading={isLoading} gridSize={4}>
         {defaultValues?.suburb}
        </GridViewField>
        <GridViewField heading={ADDRESS.CITY} isLoading={isLoading}>
         {defaultValues?.city}
        </GridViewField>
        <GridViewField heading={ADDRESS.REGION} isLoading={isLoading}>
         {defaultValues?.region}{' '}
        </GridViewField>
        <GridViewField heading={ADDRESS.POST_CODE} isLoading={isLoading} gridSize={4}>
         {defaultValues?.postCode}
        </GridViewField>
        <GridViewField heading={ADDRESS.STATE} isLoading={isLoading} gridSize={4}>
         {defaultValues?.state}
        </GridViewField>
        <GridViewField heading={ADDRESS.COUNTRY} isLoading={isLoading} gridSize={4}>
         {defaultValues?.country}
        </GridViewField>
       </Grid>
      </Grid>
     </Grid>
    </Grid>
    <AuditBox value={defaultValues} pb={0} />
   </DialogContent>
   <DialogActions>
    <Grid item sm={12}>
     <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
      <GStyledCloseButton icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleDialog} gap={2}>
       {t('close.label').toUpperCase()}
      </GStyledCloseButton>
      <Button label={BUTTON.CONTACT_OVERVIEW} icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleContactOverview} />
     </Grid>
    </Grid>
   </DialogActions>
  </Dialog>
 )
}

ContactDialog.propTypes = {
 contact: PropTypes.object
}

export default memo(ContactDialog)
