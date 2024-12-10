import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { useSettingContext } from 'hook'
import { setCustomerDialog } from 'store/slice'
import { ICON_NAME } from 'hook'
import { PATH_CUSTOMER } from 'route/path'
import { useCustomerDefaultValues } from 'section/crm'
import { HowickResources } from 'section/common'
import { useMediaQuery, useTheme, Dialog, DialogContent, DialogTitle, Divider, Grid } from '@mui/material'
import { GridViewField, GridViewTitle, Button, BadgeCardMedia, TitleListItemText, AuditBox } from 'component'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledCloseButton, GBackdropPropsOption } from 'theme/style'
import { VIEW_FORM, TITLE, KEY, BUTTON, FLEX, SZ } from 'constant'

const CustomerDialog = () => {
 const navigate = useNavigate()
 const { themeMode } = useSettingContext()
 const { customer, isLoading, customerDialog } = useSelector(state => state.customer)
 const { CUSTOMER, SITE, ADDRESS } = VIEW_FORM
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

 const defaultValues = useCustomerDefaultValues(customer, null)

 console.log('defaultValues', customer)

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
     <BadgeCardMedia dimension={40} />
    </GStyledSpanBox>
   </DialogTitle>
   <Divider orientation={KEY.HORIZONTAL} flexItem />
   <DialogContent dividers sx={{ px: 3, py: 2 }}>
    <Grid item pb={2}>
     <Grid container spacing={1} p={2} pb={1}>
      <GridViewField heading={CUSTOMER.CUSTOMER_NAME} isLoading={isLoading}>
       {defaultValues?.name}
      </GridViewField>
      <GridViewField heading={CUSTOMER.CUSTOMER_CODE} isLoading={isLoading}>
       {defaultValues?.code}
      </GridViewField>
      <GridViewField heading={VIEW_FORM.STATUS} isLoading={isLoading}>
       {defaultValues?.status}
      </GridViewField>
      <GridViewField heading={VIEW_FORM.WEBSITE} isLoading={isLoading}>
       {defaultValues?.website}
      </GridViewField>
      <GridViewField heading={CUSTOMER.TRADING_NAME} isLoading={isLoading} chip={defaultValues?.tradingName} />
     </Grid>
     <Divider variant={KEY.FULL_WIDTH} style={{ width: '100%', marginX: '20px' }} />
     <GridViewTitle title={TITLE.SITE_INFO} />
     <Grid container spacing={1} p={2} pb={1}>
      <GridViewField heading={SITE.SITE_NAME} isLoading={isLoading}>
       {defaultValues?.name}
      </GridViewField>
      <GridViewField heading={ADDRESS.STREET} isLoading={isLoading}>
       {defaultValues?.street}
      </GridViewField>
      <GridViewField heading={ADDRESS.SUBURB} isLoading={isLoading}>
       {defaultValues?.suburb}
      </GridViewField>
      <GridViewField heading={ADDRESS.CITY} isLoading={isLoading}>
       {defaultValues?.city}
      </GridViewField>
      <GridViewField heading={ADDRESS.POST_CODE} isLoading={isLoading}>
       {defaultValues?.postCode}
      </GridViewField>
      <GridViewField heading={ADDRESS.REGION} isLoading={isLoading}>
       {defaultValues?.region}
      </GridViewField>
      <GridViewField heading={ADDRESS.STATE} isLoading={isLoading}>
       {defaultValues?.state}
      </GridViewField>
      <GridViewField heading={ADDRESS.COUNTRY} isLoading={isLoading}>
       {defaultValues?.country}
      </GridViewField>
     </Grid>
     <Divider variant={KEY.FULL_WIDTH} style={{ width: '100%', marginX: '20px' }} />
     <GridViewTitle title={TITLE.HOWICK_RESOURCES} />
     <Grid container spacing={1} pb={1}>
      <Grid item sm={12}>
       <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} isDialog />
      </Grid>
     </Grid>
    </Grid>
    <AuditBox value={defaultValues} />
    <Grid item sm={12} mt={2}>
     <Grid container justifyContent={FLEX.FLEX_END} display={FLEX.FLEX} gap={2}>
      <GStyledCloseButton icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleCustomerDialog} gap={2}>
       {t('close.label').toUpperCase()}
      </GStyledCloseButton>
      <Button label={BUTTON.CUSTOMER_OVERVIEW} icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleCustomerOverview} />
     </Grid>
    </Grid>
   </DialogContent>
  </Dialog>
 )
}

export default CustomerDialog
