import { useEffect, memo } from 'react'
import { t } from 'i18next'
import { useSelector, dispatch } from 'store'
import { useParams } from 'react-router-dom'
import { useSettingContext, useResponsive } from 'hook'
import { PATH_CUSTOMER } from 'route/path'
import {
 getCustomer,
 getMachine,
 setCustomerDialog,
 getConnectedMachineDialog,
 getMachineSiteDialogData,
 setMachineDialog,
 setMachineSiteDialog,
 resetCustomer,
 resetConnectedMachineDialog,
 resetMachineSiteDialogData
} from 'store/slice'
import { useMachineDefaultValues, fieldsKeyConfig, fieldsMachineInformationConfig } from 'section/product'
import { HowickResources } from 'section/common'
import { Box, Grid, Card, Divider, Link, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledFlexEndBox, GCardOption } from 'theme/style'
import { AuditBox, GridViewField, GridViewTitle } from 'component'
import { MachineConnectionWidget, MachineConnectionListCard } from 'section/product/machine'
import { MARGIN } from 'config'
import { KEY, TITLE, VIEW_FORM, VARIANT, FLEX_DIR } from 'constant'
import { truncate } from 'util/truncate'

const MachineTab = () => {
 const { id } = useParams()
 const { machine, isLoading } = useSelector(state => state.machine)
 const { customer } = useSelector(state => state.customer)

 const { themeMode } = useSettingContext()
 const isDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'))
 const isMobile = useResponsive('down', 'sm')
 const theme = useTheme()

 const { MACHINE } = VIEW_FORM

 useEffect(() => {
  if (id !== machine?._id) {
   dispatch(getMachine(id))
  }
 }, [id])

 useEffect(() => {
  if (machine?.customer && machine?.customer._id !== customer?._id) {
   dispatch(getCustomer(machine?.customer._id))
  }
 }, [machine?.customer, customer?._id])

 useEffect(() => {
  dispatch(setCustomerDialog(false))
  dispatch(setMachineDialog(false))
  dispatch(setMachineSiteDialog(false))
  dispatch(resetCustomer())
  dispatch(resetConnectedMachineDialog())
  dispatch(resetMachineSiteDialogData())
 }, [dispatch])

 const defaultValues = useMachineDefaultValues(machine, customer)

 const handleCustomerDialog = (event, customerId) => {
  event.preventDefault()
  dispatch(resetCustomer())
  dispatch(getCustomer(customerId))
  dispatch(setCustomerDialog(true))
 }

 const handleConnectedMachineDialog = (event, machineId) => {
  event.preventDefault()
  dispatch(resetConnectedMachineDialog())
  dispatch(getConnectedMachineDialog(machineId))
  dispatch(setMachineDialog(true))
 }

 const handleMachineSiteDialog = (event, machineId) => {
  event.preventDefault()
  dispatch(resetMachineSiteDialogData())
  dispatch(getMachineSiteDialogData(machineId))
  dispatch(setMachineSiteDialog(true))
 }

 const renderMachineInformation = () => {
  return (
   <>
    {fieldsMachineInformationConfig?.map(field => {
     const additionalProps = {}
     let content = field.value(defaultValues)

     if (field.type === 'link' && defaultValues[field.key]) {
      content = (
       <Link
        onClick={event => field.linkProps.onClick(event, defaultValues?.customerId, handleCustomerDialog)}
        href={field.linkProps.href}
        underline={field.linkProps.underline}
        color={field.linkProps.color(themeMode)}>
        {truncate(content, field.truncate)}
       </Link>
      )
     }

     return (
      <GridViewField key={field.key} heading={t(field.heading)} isLoading={isLoading} gridSize={field.gridSize || 6} {...additionalProps}>
       {content}
      </GridViewField>
     )
    })}
   </>
  )
 }

 return (
  <Grid container spacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
   {isDesktop && (
    <Grid item xs={12} md={12} lg={3}>
     <MachineConnectionWidget value={defaultValues} handleConnectedMachineDialog={handleConnectedMachineDialog} handleMachineSiteDialog={handleMachineSiteDialog} />
    </Grid>
   )}

   <Grid item xs={12} sm={12} lg={9}>
    <Box mb={2}>
     <Card {...GCardOption(themeMode)}>
      <GStyledTopBorderDivider mode={themeMode} />
      <Grid container spacing={2} px={1.5}>
       <GridViewTitle title={TITLE.MACHINE_KEY_DETAILS} />
       <Grid item lg={12} sm={12}>
        <Grid container spacing={2} p={2} pb={5}>
         <GridViewField heading={MACHINE.SERIAL_NO} isLoading={isLoading} gridSize={4}>
          {defaultValues?.serialNo}
         </GridViewField>
         <GridViewField heading={MACHINE.MODEL} isLoading={isLoading} gridSize={4}>
          {defaultValues?.machineModel}
         </GridViewField>
         <GridViewField heading={MACHINE.DEFAULT_PROFILE} isLoading={isLoading} gridSize={4}>
          {Array.isArray(defaultValues?.profiles) && defaultValues?.profiles.length > 0 ? defaultValues?.profiles[0]?.flange + 'X' + defaultValues?.profiles[0]?.web : t('not_provided.label')}
         </GridViewField>
        </Grid>
       </Grid>
      </Grid>
     </Card>
    </Box>

    <Box mb={2}>
     <Card {...GCardOption(themeMode)}>
      <GStyledTopBorderDivider mode={themeMode} />
      <Grid container spacing={2} px={1.5}>
       <GridViewTitle title={TITLE.MACHINE_INFO} />
       <Grid item lg={12} sm={12}>
        <Grid container spacing={2} p={2} pb={5}>
         <GridViewField heading={t('name.label')} isLoading={isLoading} gridSize={12}>
          {defaultValues?.name}
         </GridViewField>
         <GridViewField
          heading={VIEW_FORM.ORGANIZATION}
          isLoading={isLoading}
          country={defaultValues?.customerCountry}
          customerLink={PATH_CUSTOMER.customers.view(defaultValues?.customerId)}
          onClick={handleCustomerDialog}>
          {defaultValues.customer && (
           <Link
            onClick={event => handleCustomerDialog(event, defaultValues?.customerId)}
            href='#'
            underline='none'
            color={themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.orange}>
            {truncate(defaultValues?.customer, 21)}
           </Link>
          )}
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
          {defaultValues?.supportExpireDate}
         </GridViewField>
         <GridViewField heading={MACHINE.PURCHASE_DATE} isLoading={isLoading}>
          {defaultValues?.purchaseDate}
         </GridViewField>
         <GridViewField heading={MACHINE.MANUFACTURE_DATE} isLoading={isLoading}>
          {defaultValues?.manufactureDate}
         </GridViewField>
         <GridViewField heading={MACHINE.SHIPPING_DATE} isLoading={isLoading}>
          {defaultValues?.shippingDate}
         </GridViewField>
         <GridViewField heading={MACHINE.INSTALLATION_DATE} isLoading={isLoading}>
          {defaultValues?.installationDate}
         </GridViewField>
         <GridViewField heading={t('installation_site.label')} isLoading={isLoading}>
          {defaultValues?.installationSiteName}
         </GridViewField>
         <GridViewField heading={t('billing_site.label')} isLoading={isLoading}>
          {defaultValues?.billingSiteName}
         </GridViewField>
         <GridViewField heading={VIEW_FORM.DESCRIPTION} isLoading={isLoading} gridSize={12}>
          {defaultValues?.description}
         </GridViewField>
        </Grid>
       </Grid>
      </Grid>
     </Card>
    </Box>

    {!isDesktop && (
     <Box mb={2}>
      <MachineConnectionListCard value={defaultValues} isLoading={isLoading} handleConnectionDialog={handleConnectedMachineDialog} />
     </Box>
    )}

    <Box>
     <Card {...GCardOption(themeMode)}>
      <GStyledTopBorderDivider mode={themeMode} />
      <Grid container spacing={2} px={1.5}>
       <GridViewTitle title={TITLE.HOWICK_RESOURCES} />
       <Divider orientation='horizontal' variant='fullWidth' />
       <Grid item lg={12} sm={12}>
        <HowickResources value={defaultValues} isLoading={isLoading} />
       </Grid>
      </Grid>
     </Card>
    </Box>
    <Box my={2} mb={4}>
     <GStyledFlexEndBox>
      <AuditBox value={defaultValues} />
     </GStyledFlexEndBox>
    </Box>
   </Grid>
  </Grid>
 )
}

export default memo(MachineTab)
