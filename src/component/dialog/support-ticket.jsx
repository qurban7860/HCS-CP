import { t } from 'i18next'
import { dispatch, useSelector } from 'store'
import { useSettingContext, ICON_NAME } from 'hook'
import { setCustomerTicketDialog } from 'store/slice'
import { useTicketDefaultValues } from 'section/support'
import { Grid, Dialog, DialogContent, DialogTitle, Divider, Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledSupportStatusFieldChip, GStyledFlexEndBox } from 'theme/style'
import { GridViewField, GridViewTitle, AuditBox, Button } from 'component'
import { GLOBAL } from 'config/global'
import { VIEW_FORM, TYPOGRAPHY, FLEX, SIZE, KEY, VARIANT, BUTTON, FLEX_DIR } from 'constant'
import { normalizer } from 'util/format'
import { parseArrDesc } from 'util/parse-arr-desc'
import { truncate } from 'util'

const SupportTicketDialog = () => {
 const theme = useTheme()
 const { themeMode } = useSettingContext()
 const { customerTicket, isLoading, customerTicketDialog } = useSelector(state => state.customerTicket)

 const defaultValues = useTicketDefaultValues(customerTicket)
 const handleDialog = () => dispatch(setCustomerTicketDialog(false))

 const handleCustomerTicketOverview = jiraKey => {
  dispatch(setCustomerTicketDialog(false))
  const url = GLOBAL.JIRA_URL + jiraKey
  window.open(url, KEY.BLANK)
 }

 return (
  <Dialog disableEnforceFocus maxWidth={KEY.LG} open={customerTicketDialog} onClose={handleDialog} aria-describedby='alert-dialog-slide-description'>
   <GStyledTopBorderDivider mode={themeMode} />
   <DialogTitle>
    <GStyledSpanBox>
     <Grid container flexDirection={FLEX_DIR.ROW} justifyContent='space-between'>
      <Grid item sm={6}>
       <GStyledSpanBox>
        <Typography variant={TYPOGRAPHY.H3}>{defaultValues?.key} &nbsp;</Typography>
        <Typography variant={TYPOGRAPHY.H3} color={theme.palette.howick.bronze}>
         {truncate(defaultValues?.machineSerialNo, 10)}
        </Typography>
       </GStyledSpanBox>
      </Grid>
      <Grid item sm={6}>
       <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
        <GStyledSupportStatusFieldChip
         status={normalizer(defaultValues?.status)}
         mode={themeMode}
         label={<Typography variant={TYPOGRAPHY.OVERLINE2}>{defaultValues?.status}</Typography>}
         size={SIZE.SMALL}
        />
       </Grid>
      </Grid>
     </Grid>
    </GStyledSpanBox>
   </DialogTitle>
   <Divider orientation={KEY.HORIZONTAL} flexItem />
   <DialogContent dividers sx={{ px: 3, py: 2 }}>
    <Grid container spacing={2} flexDirection={FLEX_DIR.COLUMN}>
     <Grid item xs={12} sm={12} pb={1}>
      <Grid container spacing={2} p={2} pb={2}>
       <Box m={2}>
        <Typography variant={TYPOGRAPHY.OVERLINE1}>{t('description.label')}</Typography>
        <Typography>{parseArrDesc(defaultValues.descriptionContents)}</Typography>
       </Box>
       <GridViewField heading={t('assignee.label')} isLoading={isLoading}>
        {defaultValues?.assigneeName}
       </GridViewField>
       <GridViewField heading={t('reporter.label')} isLoading={isLoading}>
        {defaultValues?.reporterName}
       </GridViewField>
      </Grid>
      <Grid item lg={12}>
       <Divider variant={KEY.FULL_WIDTH} style={{ width: '100%', marginX: '20px' }} />
       <GridViewTitle title={t('quick_spec.quick_specs.label')} />
      </Grid>
      <Grid item lg={12} sm={12}>
       <Grid container spacing={2} p={2} pb={2}>
        <GridViewField heading={t('plc_version.label')} isLoading={isLoading}>
         {defaultValues?.plcVersion}
        </GridViewField>
        <GridViewField heading={t('hmi_version.label')} isLoading={isLoading}>
         {defaultValues?.hmiVersion}
        </GridViewField>
       </Grid>
      </Grid>
      <Grid item sm={12} p={2}>
       <GStyledFlexEndBox>
        <AuditBox value={defaultValues} />
       </GStyledFlexEndBox>
      </Grid>
      <Grid item sm={12}>
       <Grid container justifyContent={FLEX.FLEX_END}>
        <Grid container justifyContent={FLEX.FLEX_END}>
         <Button label={t('view_jira.label')} icon={ICON_NAME.JIRA} onClick={() => handleCustomerTicketOverview(defaultValues?.key)} />
        </Grid>
       </Grid>
      </Grid>
     </Grid>
    </Grid>
   </DialogContent>
  </Dialog>
 )
}

export default SupportTicketDialog
