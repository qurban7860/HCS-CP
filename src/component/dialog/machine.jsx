import { dispatch, useSelector } from 'store'
import { useSettingContext } from 'component/setting'
import { setMachineDialog } from 'store/slice'
import { ICON_NAME, Clock } from 'hook'
import { PATH_CUSTOMER } from 'route/path'
import { machineDefaultValues } from 'section/product'
import { setIsDecoiler } from 'store/slice'
import { Grid, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledFlexEndBox, GStyledSpanBox } from 'theme/style'
import { GridViewField, GridViewTitle, AuditBox, IconTooltip } from 'component'
import { HowickResources } from 'section/common'
import { VIEW_FORM, TITLE, TYPOGRAPHY, FLEX, LABEL, KEY, DECOILER_TYPE_ARR } from 'constant'
import { truncate } from 'util/truncate'

const MachineDialog = () => {
  const theme = useTheme()
  const { themeMode } = useSettingContext()
  const { connectedMachineDialog, isLoading, isParent, isDecoiler, machineDialog } = useSelector((state) => state.machine)
  const { customer } = useSelector((state) => state.customer)
  const { MACHINE } = VIEW_FORM

  const defaultValues = machineDefaultValues(connectedMachineDialog, customer)
  const handleDialog = () => dispatch(setMachineDialog(false))

  return (
    <Dialog disableEnforceFocus maxWidth={KEY.LG} open={machineDialog} onClose={handleDialog} aria-describedby="alert-dialog-slide-description">
      <GStyledTopBorderDivider mode={themeMode} />
      <DialogTitle>
        <GStyledSpanBox
          sx={{
            justifyContent: 'space-between'
          }}>
          <Typography variant={TYPOGRAPHY.H2}>{defaultValues?.serialNo}</Typography> &nbsp;
          <Grid container justifyContent={FLEX.FLEX_END}>
            {defaultValues?.installationSiteCity && (
              <Clock city={defaultValues?.installationSiteCity} country={defaultValues?.installationSiteCountry} />
            )}
            {DECOILER_TYPE_ARR.some((type) => defaultValues?.machineModel?.includes(type)) && (
              <IconTooltip
                title={LABEL.DECOILER(defaultValues?.machineModel)}
                icon={ICON_NAME.DECOILER_DEF}
                color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.lightGray}
              />
            )}
            {defaultValues?.machineConnection?.length > 0 && (
              <IconTooltip
                title={LABEL.PARENT_MACHINE}
                icon={ICON_NAME.PARENT}
                color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.lightGray}
              />
            )}
            {defaultValues?.isActive ? (
              <IconTooltip
                title={LABEL.ACTIVE}
                icon={ICON_NAME.ACTIVE}
                color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
              />
            ) : (
              <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} />
            )}
          </Grid>
        </GStyledSpanBox>
      </DialogTitle>
      <Divider orientation={KEY.HORIZONTAL} flexItem />
      <DialogContent dividers sx={{ px: 3, py: 2 }}>
        <Grid container spacing={2}>
          <Grid container spacing={1} p={2} pb={1}>
            <GridViewField heading={MACHINE.MODEL} isLoading={isLoading} children={defaultValues?.machineModel} gridSize={4} />
            <GridViewField
              heading={MACHINE.DEFAULT_PROFILE}
              isLoading={isLoading}
              children={
                Array.isArray(defaultValues?.profiles) && defaultValues?.profiles.length > 0
                  ? defaultValues?.profiles[0]?.flange + 'X' + defaultValues?.profiles[0]?.web
                  : TITLE.NOT_PROVIDED
              }
              gridSize={4}
            />
            <GridViewField
              heading={VIEW_FORM.ORGANIZATION}
              isLoading={isLoading}
              gridSize={4}
              country={defaultValues?.customerCountry}
              children={truncate(defaultValues?.customer, 21)}
              customerLink={PATH_CUSTOMER.customers.view(defaultValues?.customerId)}
            />
          </Grid>
          <Divider variant={KEY.FULL_WIDTH} style={{ width: '100%', marginX: '20px' }} />
          <GridViewTitle title={TITLE.MACHINE_INFO} />
          <Grid container spacing={1} p={2} pb={1}>
            <GridViewField heading={VIEW_FORM.NAME} isLoading={isLoading} children={defaultValues?.name} gridSize={12} />
            <GridViewField heading={VIEW_FORM.STATUS} isLoading={isLoading} children={defaultValues?.status} />
            <GridViewField heading={MACHINE.WORK_ORDER} isLoading={isLoading} children={defaultValues?.workOrderRef} />
            <GridViewField heading={MACHINE.FINANCING_COMPANY} isLoading={isLoading} children={defaultValues?.financialCompany} />
            <GridViewField heading={MACHINE.SUPPLIER} isLoading={isLoading} children={defaultValues?.supplier} />
            <GridViewField heading={MACHINE.SUPPORT_EXPIRATION} isLoading={isLoading} children={defaultValues?.supportExpireDate} />
            <GridViewField heading={MACHINE.PURCHASE_DATE} isLoading={isLoading} children={defaultValues?.purchaseDate} />
            <GridViewField heading={MACHINE.MANUFACTURE_DATE} isLoading={isLoading} children={defaultValues?.manufactureDate} />
            <GridViewField heading={MACHINE.SHIPPING_DATE} isLoading={isLoading} children={defaultValues?.shippingDate} />
            <GridViewField heading={MACHINE.INSTALLATION_DATE} isLoading={isLoading} children={defaultValues?.installationDate} />
            <GridViewField heading={VIEW_FORM.DESCRIPTION} isLoading={isLoading} children={defaultValues?.description} gridSize={12} />
          </Grid>
          <Divider variant={KEY.FULL_WIDTH} style={{ width: '100%', marginX: '20px' }} />
          <GridViewTitle title={TITLE.HOWICK_RESOURCES} />
          <Grid container spacing={1} pb={1}>
            <Grid item sm={12}>
              <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} isDialog />
              <GStyledFlexEndBox>
                <AuditBox value={defaultValues} />
              </GStyledFlexEndBox>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default MachineDialog
