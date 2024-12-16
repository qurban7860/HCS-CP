import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { useSettingContext } from 'hook'
import { setCustomerDialog } from 'store/slice'
import { ICON_NAME } from 'hook'
import { PATH_CUSTOMER } from 'route/path'
import { useCustomerDefaultValues } from 'section/crm'
import { HowickResources } from 'section/common'
import { Dialog, DialogContent, DialogTitle, DialogActions, Divider, Grid } from '@mui/material'
import { GridViewField, GridViewTitle, Button, BadgeCardMedia, TitleListItemText, AuditBox } from 'component'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledCloseButton, GBackdropPropsOption } from 'theme/style'
import { KEY, BUTTON, FLEX, SZ } from 'constant'

const CustomerDialog = () => {
 const navigate = useNavigate()
 const { themeMode } = useSettingContext()
 const { customer, isLoading, customerDialog } = useSelector(state => state.customer)
 const defaultValues = useCustomerDefaultValues(customer, null)

 const handleCustomerDialog = () => dispatch(setCustomerDialog(false))

 const handleCustomerOverview = () => {
  dispatch(setCustomerDialog(false))
  navigate(PATH_CUSTOMER.customers.view(defaultValues?.id))
 }

 return (
  <Dialog disableEnforceFocus maxWidth={SZ.LG} open={customerDialog} onClose={handleCustomerDialog} BackdropProps={GBackdropPropsOption(themeMode)}>
   <GStyledTopBorderDivider mode={themeMode} />
   <DialogTitle>
    <GStyledSpanBox
     sx={{
      justifyContent: FLEX.SPACE_BETWEEN
     }}>
     <TitleListItemText truncatedName={defaultValues?.name} tradingAliases={defaultValues?.tradingName} />
     <BadgeCardMedia customer={customer} dimension={40} />
    </GStyledSpanBox>
   </DialogTitle>
   <Divider orientation={KEY.HORIZONTAL} flexItem />
   <DialogContent dividers sx={{ px: 3 }}>
    <Grid item>
     <Grid container spacing={1} p={2} pb={1}>
      <GridViewField heading={t('organization.label')} isLoading={isLoading}>
       {defaultValues?.name}
      </GridViewField>
      <GridViewField heading={t('status.label')} isLoading={isLoading}>
       {defaultValues?.status}
      </GridViewField>
      <GridViewField heading={t('website.label')} isLoading={isLoading}>
       {defaultValues?.website}
      </GridViewField>
      <GridViewField heading={t('trading_name.label')} isLoading={isLoading} chip={defaultValues?.tradingName} />
     </Grid>
     <Divider variant={KEY.FULL_WIDTH} style={{ width: '100%', marginX: '20px' }} />
     <GridViewTitle title={t('site_information.label')} />
     <Grid container spacing={1} p={2} pb={1}>
      <GridViewField heading={t('site_name.label')} isLoading={isLoading}>
       {defaultValues?.name}
      </GridViewField>
      <GridViewField heading={t('address.street.label')} isLoading={isLoading}>
       {defaultValues?.street}
      </GridViewField>
      <GridViewField heading={t('address.suburb.label')} isLoading={isLoading}>
       {defaultValues?.suburb}
      </GridViewField>
      <GridViewField heading={t('address.city.label')} isLoading={isLoading}>
       {defaultValues?.city}
      </GridViewField>
      <GridViewField heading={t('address.post_code.label')} isLoading={isLoading}>
       {defaultValues?.postCode}
      </GridViewField>
      <GridViewField heading={t('address.region.label')} isLoading={isLoading}>
       {defaultValues?.region}
      </GridViewField>
      <GridViewField heading={t('address.state.label')} isLoading={isLoading}>
       {defaultValues?.state}
      </GridViewField>
      <GridViewField heading={t('address.country.label')} isLoading={isLoading}>
       {defaultValues?.country}
      </GridViewField>
     </Grid>
     <Divider variant={KEY.FULL_WIDTH} style={{ width: '100%', marginX: '20px' }} />
     <GridViewTitle title={t('howick_resources.label')} />
     <Grid container spacing={1}>
      <Grid item sm={12}>
       <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} isDialog />
      </Grid>
     </Grid>
    </Grid>
    <AuditBox value={defaultValues} pb={0} />
   </DialogContent>
   <DialogActions>
    <Grid item sm={12}>
     <Grid container justifyContent={FLEX.FLEX_END} display={FLEX.FLEX} gap={2}>
      <GStyledCloseButton icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleCustomerDialog} gap={2}>
       {t('close.label').toUpperCase()}
      </GStyledCloseButton>
      <Button label={BUTTON.CUSTOMER_OVERVIEW} icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleCustomerOverview} />
     </Grid>
    </Grid>
   </DialogActions>
  </Dialog>
 )
}

export default CustomerDialog
