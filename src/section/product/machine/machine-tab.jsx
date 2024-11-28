import { Fragment, useEffect, memo } from 'react'
import { t } from 'i18next'
import { useSelector, dispatch } from 'store'
import { useParams } from 'react-router-dom'
import { useSettingContext, useResponsive } from 'hook'
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
import { TITLE, FLEX_DIR } from 'constant'
import { truncate } from 'util/truncate'

const MachineTab = () => {
 const { id } = useParams()
 const { machine, isLoading } = useSelector(state => state.machine)
 const { customer } = useSelector(state => state.customer)

 const { themeMode } = useSettingContext()
 const isDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'))
 const isMobile = useResponsive('down', 'sm')
 const theme = useTheme()

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

 const renderFields = config => {
  return (
   <Fragment>
    {config?.map(field => {
     const additionalProps = field.additionalProps ? field.additionalProps(defaultValues, handleCustomerDialog, themeMode) : {}
     let content = field.value(defaultValues)
     {
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
     }
     return (
      <GridViewField key={field.key} heading={t(field.heading)} isLoading={isLoading} gridSize={field.gridSize || 6} {...additionalProps}>
       {content}
      </GridViewField>
     )
    })}
   </Fragment>
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
       <GridViewTitle title={t('key_detail.key_details.label')} />
       <Grid item lg={12} sm={12}>
        <Grid container spacing={2} p={2} pb={5}>
         {renderFields(fieldsKeyConfig)}
        </Grid>
       </Grid>
      </Grid>
     </Card>
    </Box>

    <Box mb={2}>
     <Card {...GCardOption(themeMode)}>
      <GStyledTopBorderDivider mode={themeMode} />
      <Grid container spacing={2} px={1.5}>
       <GridViewTitle title={t('machine_information.label')} />
       <Grid item lg={12} sm={12}>
        <Grid container spacing={2} p={2} pb={5}>
         {renderFields(fieldsMachineInformationConfig)}
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
       <GridViewTitle title={t('howick_resources.label')} />
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
