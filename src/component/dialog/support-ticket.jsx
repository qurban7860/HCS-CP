import { t } from 'i18next'
import { dispatch, useSelector } from 'store'
import { useSettingContext, ICON_NAME } from 'hook'
import { setCustomerTicketDialog } from 'store/slice'
import { useTicketDefaultValues } from 'section/support'
import { useMediaQuery, Grid, Dialog, DialogContent, DialogActions, DialogTitle, Divider, Typography, Box } from '@mui/material'
import { GridViewField, GridViewTitle, AuditBox } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledSupportStatusFieldChip, GStyledCloseButton, GBackdropPropsOption } from 'theme/style'
import { TYPOGRAPHY, FLEX, SIZE, KEY, FLEX_DIR } from 'constant'
import { normalizer } from 'util/format'
import { parseArrDesc } from 'util/parse-arr-desc'
import { truncate } from 'util'

const SupportTicketDialog = () => {
 const { customerTicket, isLoading, customerTicketDialog } = useSelector(state => state.customerTicket)
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

 const defaultValues = useTicketDefaultValues(customerTicket)
 const handleDialog = () => dispatch(setCustomerTicketDialog(false))

 //  const handleCustomerTicketOverview = jiraKey => {
 //   dispatch(setCustomerTicketDialog(false))
 //   const url = GLOBAL.JIRA_URL + jiraKey
 //   window.open(url, KEY.BLANK)
 //  }

 return (
  <Dialog disableEnforceFocus maxWidth={KEY.LG} open={customerTicketDialog} onClose={handleDialog} BackdropProps={GBackdropPropsOption(themeMode)}>
   <GStyledTopBorderDivider mode={themeMode} />
   <DialogTitle
    sx={{
     ...(isDesktop && { minWidth: 500 }),
     width: '100%',
     boxSizing: 'border-box',
     padding: theme.spacing(2)
    }}>
    <GStyledSpanBox>
     <Grid container flexDirection={FLEX_DIR.ROW} justifyContent='space-between'>
      <Grid item sm={6}>
       <GStyledSpanBox>
        <Typography variant={isDesktop ? TYPOGRAPHY.H3 : TYPOGRAPHY.H5}>{defaultValues?.key} &nbsp;</Typography>
        <Typography variant={isDesktop ? TYPOGRAPHY.H3 : TYPOGRAPHY.H5} color={theme.palette.howick.bronze}>
         {truncate(defaultValues?.machineSerialNo, 10)}
        </Typography>
       </GStyledSpanBox>
      </Grid>
      <Grid item sm={6}>
       <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
        <GStyledSupportStatusFieldChip
         status={normalizer(defaultValues?.status)}
         mode={themeMode}
         label={<Typography variant={isDesktop ? TYPOGRAPHY.OVERLINE2 : TYPOGRAPHY.OVERLINE_MINI}>{defaultValues?.status}</Typography>}
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
       <Box m={2} width={'100%'}>
        <Typography variant={TYPOGRAPHY.OVERLINE1}>{t('description.label')}</Typography>
        <Grid container>
         <Grid item xs={12} md={12}>
          <Typography variant={isDesktop ? TYPOGRAPHY.BODY1 : TYPOGRAPHY.BODY2}>{parseArrDesc(defaultValues.descriptionContents)}</Typography>
         </Grid>
        </Grid>
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
       {/*  disabled for now; enable once Jira auth is refactored to take customer based token #1629  */}
       {/* <Button label={t('view_jira.label')} icon={ICON_NAME.JIRA} onClick={() => handleCustomerTicketOverview(defaultValues?.key)} /> */}
      </Grid>
     </Grid>
    </Grid>
   </DialogActions>
  </Dialog>
 )
}

export default SupportTicketDialog
