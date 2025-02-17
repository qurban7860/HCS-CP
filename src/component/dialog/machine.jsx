import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { useSettingContext } from 'hook'
import { setMachineDialog } from 'store/slice'
import { ICON_NAME, Clock } from 'hook'
import { PATH_CUSTOMER, PATH_MACHINE } from 'route/path'
import { useMachineDefaultValues } from 'section/product'
import { Grid, Dialog, DialogContent, DialogActions, DialogTitle, Divider, Typography } from '@mui/material'
import { GridViewField, GridViewTitle, IconTooltip, Button, AuditBox } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledCloseButton, GStyledSpanBox, GBackdropPropsOption } from 'theme/style'
import { HowickResources } from 'section/common'
import { VIEW_FORM, TITLE, TYPOGRAPHY, FLEX, LABEL, KEY, DECOILER_TYPE_ARR, BUTTON, FLEX_DIR } from 'constant'
import { truncate } from 'util/truncate'

const MachineDialog = () => {
 const { machine, isLoading, machineDialog } = useSelector(state => state.machine)
 const { customer }                          = useSelector(state => state.customer)
 const { themeMode }                         = useSettingContext()
 const theme                                 = useTheme()
 const navigate                              = useNavigate()

 const { MACHINE } = VIEW_FORM

 const defaultValues = useMachineDefaultValues(machine, customer)
 const handleDialog  = () => dispatch(setMachineDialog(false))

 const handleMachineOverview = () => {
  dispatch(setMachineDialog(false))
  navigate(PATH_MACHINE.machines.view(defaultValues?.id))
 }

 return (
  <Dialog maxWidth={KEY.LG} open={machineDialog} onClose={handleDialog} BackdropProps={GBackdropPropsOption(themeMode)}>
   <GStyledTopBorderDivider mode={themeMode} />
   <DialogTitle>
    <GStyledSpanBox>
     <Grid container flexDirection={FLEX_DIR.ROW} justifyContent='space-between'>
      <Grid item sm={6}>
       <GStyledSpanBox>
        <Typography variant={TYPOGRAPHY.H3}>{defaultValues?.serialNo} &nbsp;</Typography>
        <Typography variant={TYPOGRAPHY.H3} color={theme.palette.howick.bronze}>
         {defaultValues?.machineModel}
        </Typography>
       </GStyledSpanBox>
      </Grid>
      <Grid item sm={6}>
       <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
        {defaultValues?.installationSiteCity && <Clock city={defaultValues?.installationSiteCity} country={defaultValues?.installationSiteCountry} region={defaultValues?.installationSiteRegion} />}
        {DECOILER_TYPE_ARR.some(type => defaultValues?.machineModel?.includes(type)) && (
         <IconTooltip title={LABEL.DECOILER(defaultValues?.machineModel)} icon={ICON_NAME.DECOILER_DEF} color={theme.palette.grey[500]} iconOnly />
        )}
        {defaultValues?.machineConnection?.length > 0 && <IconTooltip title={LABEL.PARENT_MACHINE} icon={ICON_NAME.PARENT} color={theme.palette.grey[500]} iconOnly />}
        {defaultValues?.isActive ? (
         <IconTooltip
          title={LABEL.ACTIVE}
          icon={ICON_NAME.ACTIVE}
          color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
          tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
          iconOnly
          isActiveIcon
         />
        ) : (
         <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} />
        )}
       </Grid>
      </Grid>
     </Grid>
    </GStyledSpanBox>
   </DialogTitle>
   <Divider orientation={KEY.HORIZONTAL} flexItem />
   <DialogContent dividers sx={{ px: 3, py: 2 }}>
    <Grid container spacing={2} flexDirection={FLEX_DIR.COLUMN}>
     <Grid item pb={1}>
      <Grid container spacing={1} p={2} pb={1}>
       <GridViewField heading={MACHINE.SERIAL_NO} isLoading={isLoading} gridSize={4}>
        {defaultValues?.serialNo}
       </GridViewField>
       <GridViewField heading={MACHINE.MODEL} isLoading={isLoading} gridSize={4}>
        {defaultValues?.machineModel}
       </GridViewField>
       <GridViewField
        heading={VIEW_FORM.ORGANIZATION}
        isLoading={isLoading}
        gridSize={4}
        country={defaultValues?.customerCountry}
        customerLink={PATH_CUSTOMER.customers.view(defaultValues?.customerId)}>
        {truncate(defaultValues?.customer, 21)}
       </GridViewField>
      </Grid>
      <Divider variant={KEY.FULL_WIDTH} style={{ width: '100%', marginX: '20px' }} />
      <GridViewTitle title={TITLE.MACHINE_INFO} />
      <Grid container spacing={1} p={2} pb={1}>
       <GridViewField heading={MACHINE.DEFAULT_PROFILE} isLoading={isLoading}>
        {Array.isArray(defaultValues?.profiles) && defaultValues?.profiles.length > 0 ? defaultValues?.profiles[0]?.flange + 'X' + defaultValues?.profiles[0]?.web : TITLE.NOT_PROVIDED}
       </GridViewField>
       <GridViewField heading={VIEW_FORM.STATUS} isLoading={isLoading}>
        {defaultValues?.status}
       </GridViewField>
       <GridViewField heading={MACHINE.WORK_ORDER} isLoading={isLoading}>
        {defaultValues?.workOrderRef}
       </GridViewField>
       <GridViewField heading={MACHINE.FINANCING_COMPANY} isLoading={isLoading}>
        {defaultValues?.financialCompany}
       </GridViewField>
       <GridViewField heading={MACHINE.SUPPLIER} isLoading={isLoading}>
        {defaultValues?.supplier}
       </GridViewField>
       <GridViewField heading={MACHINE.SUPPORT_EXPIRATION} isLoading={isLoading}>
        {defaultValues?.supportExpireDate}{' '}
       </GridViewField>
       <GridViewField heading={MACHINE.PURCHASE_DATE} isLoading={isLoading}>
        {defaultValues?.purchaseDate}
       </GridViewField>
       <GridViewField heading={MACHINE.MANUFACTURE_DATE} isLoading={isLoading}>
        {defaultValues?.manufactureDate}{' '}
       </GridViewField>
       <GridViewField heading={MACHINE.SHIPPING_DATE} isLoading={isLoading}>
        {defaultValues?.shippingDate}
       </GridViewField>
       <GridViewField heading={MACHINE.INSTALLATION_DATE} isLoading={isLoading}>
        {defaultValues?.installationDate}
       </GridViewField>
       <GridViewField heading={VIEW_FORM.DESCRIPTION} isLoading={isLoading} gridSize={12}>
        {defaultValues?.description}
       </GridViewField>
      </Grid>
      <Divider variant={KEY.FULL_WIDTH} style={{ width: '100%', marginX: '20px' }} />
      <GridViewTitle title={t('howick_resources.label')} />
      <Grid item sm={12} mb={2}>
       <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} isDialog />
      </Grid>
     </Grid>
    </Grid>
    <AuditBox value={defaultValues} pb={0} />
   </DialogContent>
   <DialogActions>
    <Grid item sm={12}>
     <Grid container justifyContent={FLEX.FLEX_END}>
      <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
       <GStyledCloseButton icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleDialog}>
        {t('close.label').toUpperCase()}
       </GStyledCloseButton>
       <Button label={BUTTON.MACHINE_OVERVIEW} icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleMachineOverview} />
      </Grid>
     </Grid>
    </Grid>
   </DialogActions>
  </Dialog>
 )
}

export default MachineDialog
