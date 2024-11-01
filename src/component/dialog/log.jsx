import { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography, Stack, Accordion, AccordionSummary, AccordionDetails, Box, Grid, TextField, Skeleton } from '@mui/material'
import { SkeletonLoading, BadgeCardMedia, CodeRaw, Button } from 'component'
import { styled, useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { GStyledTopBorderDivider, GStyledSpanBox } from 'theme/style'
import { Iconify } from 'component/iconify'
import { camelCaseNormalizer } from 'util'
import { TYPOGRAPHY, FLEX, KEY } from 'constant'

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
 [theme.breakpoints.down('sm')]: {
  flexDirection: 'column'
 }
}))

const extraInfo = ['customer', 'machine', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt', 'isActive', 'isArchived', 'createdIP', 'updatedIP', 'archivedByMachine', 'batchId']

function LogDetailsDialog({ logDetails, logType, open, setOpenLogDetailsDialog, refreshLogsList, isLogsPage, componentTitle }) {
 const [logsToShow, setLogsToShow] = useState({})
 const { isLoading } = useSelector(state => state.log)
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const isArchivedStatus = logDetails?.isArchived

 useEffect(() => {
  if (logDetails) {
   const formattedLog = formatMachineLogToShow(logDetails)
   setLogsToShow(formattedLog)
  }
 }, [logDetails])

 const formatMachineLogToShow = log => {
  const { createdIP, updatedIP, __v, machine, customer, updatedBy, createdBy, archivedByMachine, createdAt, updatedAt, isActive, isArchived, type, version, batchId, ...rest } = log

  return { ...rest }
 }

 const handleCloseDialog = () => {
  setOpenLogDetailsDialog(false)
 }

 const renderDialogContent = () => {
  if (isLoading) {
   return <SkeletonLoading />
  }
  return <LogDetailsRaw logsToShow={logsToShow} logDetails={logDetails} />
 }

 return (
  <Fragment>
   <Dialog disableEnforceFocus maxWidth='lg' open={open} onClose={handleCloseDialog} aria-describedby='alert-dialog-slide-description'>
    <GStyledTopBorderDivider mode={themeMode} />

    <DialogTitle sx={{ pb: 1, pt: 2 }}>
     <GStyledSpanBox
      sx={{
       justifyContent: FLEX.FLEX_START
      }}>
      <Typography variant={TYPOGRAPHY.H3}>{componentTitle?.date} &nbsp;</Typography>
      <Typography variant={TYPOGRAPHY.H3} color={themeMode === KEY.LIGHT ? theme.palette.grey[100] : theme.palette.howick.bronze}>
       {componentTitle?.componentLabel}
      </Typography>
      {/* <BadgeCardMedia dimension={40} /> */}
     </GStyledSpanBox>
    </DialogTitle>
    <Divider orientation='horizontal' flexItem sx={{ mb: 2 }} />
    <DialogContent>{renderDialogContent()}</DialogContent>
    <DialogActions>
     <Grid container>
      <Grid item sm={12}>
       <Grid container justifyContent={FLEX.FLEX_END}>
        <Button label={'Close'} icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleCloseDialog} color={theme.palette.error.dark} />
       </Grid>
      </Grid>
     </Grid>
    </DialogActions>
   </Dialog>
  </Fragment>
 )
}
export default LogDetailsDialog

LogDetailsDialog.propTypes = {
 logDetails: PropTypes.object,
 open: PropTypes.bool,
 onClose: PropTypes.func,
 setOpenLogDetailsDialog: PropTypes.func,
 refreshLogsList: PropTypes.func,
 logType: PropTypes.string,
 isLogsPage: PropTypes.bool,
 componentTitle: PropTypes.object
}

const LogDetailsRaw = ({ logsToShow, logDetails }) => {
 const theme = useTheme()
 return (
  <Fragment>
   <ResponsiveGrid container spacing={2}>
    {extraInfo.map((info, index) => (
     <Grid item xs={12} sm={6} key={index}>
      <Box sx={{ mb: 2 }}>
       <Typography variant='body2' color={theme.palette.text.secondary} sx={{ fontWeight: 'bold' }}>
        {camelCaseNormalizer(info)}:
       </Typography>
       <Typography variant='body2' color={theme.palette.text.secondary}>
        {JSON.stringify(logDetails[info])?.replaceAll('"', '')}
       </Typography>
      </Box>
     </Grid>
    ))}
   </ResponsiveGrid>
   <Accordion>
    <AccordionSummary aria-controls='panel1-content' id='panel1-header' expandIcon={<Iconify icon='ep:arrow-down-bold' color={theme.palette.text.secondary} />}>
     <Typography variant={TYPOGRAPHY.H5}>Raw Details</Typography>
    </AccordionSummary>
    <AccordionDetails>
     <CodeRaw value={JSON.stringify(logsToShow, null, 2)} HandleChangeIniJson={() => {}} editable={false} disableTopBar autoHeight />
    </AccordionDetails>
   </Accordion>
  </Fragment>
 )
}

LogDetailsRaw.propTypes = {
 logsToShow: PropTypes.object,
 logDetails: PropTypes.object
}
