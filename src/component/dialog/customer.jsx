import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { useSettingContext } from 'component/setting'
import { setCustomerDialog } from 'store/slice'
import { customerDefaultValues } from 'section/crm'
import { useIcon, ICON_NAME } from 'hook'
import { Grid, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import { GStyledTopBorderDivider, GStyledFlexEndBox, GStyledSpanBox } from 'theme/style'
import { GridViewField, GridViewTitle, Button, BadgeCardMedia } from 'component'
import { HowickResources } from 'section/common'
import { VIEW_FORM, TITLE, TYPOGRAPHY, KEY, BUTTON, FLEX } from 'constant'
import { PATH_CUSTOMER } from 'route/path'

const CustomerDialog = () => {
  const navigate = useNavigate()
  const { themeMode } = useSettingContext()
  const { customer, isLoading, customerDialog } = useSelector((state) => state.customer)
  const { CUSTOMER, SITE, ADDRESS } = VIEW_FORM

  const defaultValues = customerDefaultValues(customer, null)

  const handleCustomerDialog = () => dispatch(setCustomerDialog(false))

  const handleCustomerOverview = () => {
    dispatch(setCustomerDialog(false))
    navigate(PATH_CUSTOMER.customers.view(defaultValues?.id))
  }
  return (
    <Dialog disableEnforceFocus maxWidth="lg" open={customerDialog} onClose={handleCustomerDialog} aria-describedby="alert-dialog-slide-description">
      <GStyledTopBorderDivider mode={themeMode} />
      <DialogTitle>
        <GStyledSpanBox
          sx={{
            justifyContent: 'space-between'
          }}>
          <Typography variant={TYPOGRAPHY.H3}>{customer?.name?.toUpperCase()}</Typography> &nbsp;
          <BadgeCardMedia dimension={40} />
        </GStyledSpanBox>
      </DialogTitle>
      <Divider orientation={KEY.HORIZONTAL} flexItem />
      <DialogContent dividers sx={{ px: 3, py: 2 }}>
        <Grid item pb={2}>
          <Grid container spacing={1} p={2} pb={1}>
            <GridViewField heading={CUSTOMER.CUSTOMER_NAME} isLoading={isLoading} children={defaultValues?.name} />
            <GridViewField heading={CUSTOMER.CUSTOMER_CODE} isLoading={isLoading} children={defaultValues?.code} />
            <GridViewField heading={VIEW_FORM.STATUS} isLoading={isLoading} children={defaultValues?.status} />
            <GridViewField heading={VIEW_FORM.WEBSITE} isLoading={isLoading} link={defaultValues?.website} />
            <GridViewField heading={CUSTOMER.TRADING_NAME} isLoading={isLoading} alias={defaultValues?.tradingName} />
          </Grid>
          <Divider variant={KEY.FULL_WIDTH} style={{ width: '100%', marginX: '20px' }} />
          <GridViewTitle title={TITLE.SITE_INFO} />
          <Grid container spacing={1} p={2} pb={1}>
            <GridViewField heading={SITE.SITE_NAME} isLoading={isLoading} children={defaultValues?.name} />
            <GridViewField heading={ADDRESS.STREET} isLoading={isLoading} children={defaultValues?.street} />
            <GridViewField heading={ADDRESS.SUBURB} isLoading={isLoading} children={defaultValues?.suburb} />
            <GridViewField heading={ADDRESS.CITY} isLoading={isLoading} children={defaultValues?.city} />
            <GridViewField heading={ADDRESS.POST_CODE} isLoading={isLoading} children={defaultValues?.postCode} />
            <GridViewField heading={ADDRESS.REGION} isLoading={isLoading} children={defaultValues?.region} />
            <GridViewField heading={ADDRESS.STATE} isLoading={isLoading} children={defaultValues?.state} />
            <GridViewField heading={ADDRESS.COUNTRY} isLoading={isLoading} children={defaultValues?.country} />
          </Grid>
          <Divider variant={KEY.FULL_WIDTH} style={{ width: '100%', marginX: '20px' }} />
          <GridViewTitle title={TITLE.HOWICK_RESOURCES} />
          <Grid container spacing={1} pb={1}>
            <Grid item sm={12}>
              <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} isDialog />
            </Grid>
            <Grid item sm={12}>
              <Grid container justifyContent={FLEX.FLEX_END}>
                <Button label={BUTTON.CUSTOMER_OVERVIEW} icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleCustomerOverview} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default CustomerDialog
