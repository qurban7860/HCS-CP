import { useState, useMemo, useEffect } from 'react'
import { dispatch, useSelector } from 'store'
import { useSettingContext } from 'component/setting'
import { PATH_CUSTOMER } from 'route/path'
import { setContactDialog } from 'store/slice'
import { ICON_NAME, Clock } from 'hook'
import { contactDefaultValues } from 'section/crm'
import { Grid, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSiteMapBox, GStyledSpanBox } from 'theme/style'
import { GridViewField, GridViewTitle, IconTooltip, NothingProvided, Button } from 'component'
import { VIEW_FORM, SNACK, TITLE, TYPOGRAPHY, FLEX, LABEL, KEY, DECOILER_TYPE_ARR, FLEX_DIR, VARIANT, BUTTON } from 'constant'
import { truncate } from 'util/truncate'

const ContactDialog = () => {
  const { contact, isLoading, contactDialog } = useSelector((state) => state.contact)
  const { customer } = useSelector((state) => state.customer)

  const theme = useTheme()
  const { themeMode } = useSettingContext()
  const defaultValues = contactDefaultValues(contact, customer)

  const { ADDRESS } = VIEW_FORM
  const handleDialog = () => dispatch(setContactDialog(false))

  return (
    <Dialog disableEnforceFocus maxWidth={KEY.LG} open={contactDialog} onClose={handleDialog} aria-describedby="alert-dialog-slide-description">
      <GStyledTopBorderDivider mode={themeMode} />
      <DialogTitle>
        <GStyledSpanBox>
          <Grid container flexDirection={FLEX_DIR.ROW} justifyContent="space-between">
            <Grid item sm={6}>
              <GStyledSpanBox>
                <Typography variant={TYPOGRAPHY.H3}>{defaultValues?.fullName} &nbsp;</Typography>
              </GStyledSpanBox>
            </Grid>
            <Grid item sm={6}>
              <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
                {defaultValues?.machineConnection?.length > 0 && (
                  <IconTooltip title={LABEL.PARENT_MACHINE} icon={ICON_NAME.PARENT} color={theme.palette.grey[500]} iconOnly />
                )}
                {defaultValues?.isActive ? (
                  <IconTooltip
                    title={LABEL.ACTIVE}
                    icon={ICON_NAME.ACTIVE}
                    color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
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
            <Grid container flexDirection="row">
              <GridViewTitle title={TITLE.KEY_DETAILS} />
              <Grid container spacing={1} pb={1}>
                <GridViewField heading={VIEW_FORM.EMAIL} isLoading={isLoading} children={defaultValues?.email} />
                <GridViewField heading={VIEW_FORM.PHONE} isLoading={isLoading} children={defaultValues?.phone} />
                <GridViewField
                  heading={VIEW_FORM.ORGANIZATION}
                  isLoading={isLoading}
                  gridSize={12}
                  country={defaultValues?.customerCountry}
                  children={defaultValues?.customerName}
                  customerLink={PATH_CUSTOMER.customers.view(defaultValues?.customerId)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Grid container flexDirection="row">
              <GridViewTitle title={TITLE.ADDRESS_INFO} />
              <Grid container spacing={1} pb={1}>
                <GridViewField heading={ADDRESS.STREET} isLoading={isLoading} children={defaultValues?.street} gridSize={8} />
                <GridViewField heading={ADDRESS.SUBURB} isLoading={isLoading} children={defaultValues?.suburb} gridSize={4} />
                <GridViewField heading={ADDRESS.CITY} isLoading={isLoading} children={defaultValues?.city} />
                <GridViewField heading={ADDRESS.REGION} isLoading={isLoading} children={defaultValues?.region} />
                <GridViewField heading={ADDRESS.POST_CODE} isLoading={isLoading} children={defaultValues?.postCode} gridSize={4} />
                <GridViewField heading={ADDRESS.STATE} isLoading={isLoading} children={defaultValues?.state} gridSize={4} />
                <GridViewField heading={ADDRESS.COUNTRY} isLoading={isLoading} children={defaultValues?.country} gridSize={4} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={12}>
            <Grid container justifyContent={FLEX.FLEX_END}>
              <Button label={BUTTON.CONTACT_OVERVIEW} icon={ICON_NAME.CHEVRON_RIGHT} />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ContactDialog
